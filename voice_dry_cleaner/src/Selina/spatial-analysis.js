/*
SPATIAL ANALYSIS - SELINA

Description: AI Voice Assistant to Perform Store Lookup

Technology: 
* Amazon Alexa Realtime Location - Permission to Access DYNAMIC Realtime Location
* Amazon Alexa Device Address - Permission to Access STATIC Device Address
* GeoFire - Spatial Query Library
* Google Places API - Geocoding of Real-World Locations
* Firestore - Spatial Database
*/
// FIRESTORE IMPORT
const { db, admin } = require('../db.js');
// GEOFIRESTORE IMPORT
const { GeoCollectionReference, GeoFirestore, GeoQuery, GeoQuerySnapshot } = require('geofirestore');

// GOOGLE PLACES GEOCODE API KEY: AIzaSyCJJnGSaHOMom9LdWXH9T60IHPnqyk1GRQ
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCJJnGSaHOMom9LdWXH9T60IHPnqyk1GRQ',
    Promise: Promise
});

const geofirestore = new GeoFirestore(db);
const geocollection = geofirestore.collection('dry-cleaners');

// PUBLIC VARIABLES
module.exports = {
    admin: admin,
    db: db,
    query: query,
    queryFirebaseByCity: geocodeAndQuery,
    queryFirebaseByZip: geocodeAndQuery,
    queryFirebaseByStreet: queryFirebaseByStreet,
    queryFirebaseByBusinessType: queryFirebaseByBusinessType,
    saveLocationToGeoFire: saveLocationToGeoFire,
    CanYouFindAStoreNearMeIntent: CanYouFindAStoreNearMeIntent,
    FindMyRealtimeLocationIntent: FindMyRealtimeLocationIntent
}

/*
*   CanYouFindAStoreNearMeIntent - Find Store
*/
async function CanYouFindAStoreNearMeIntent(that) {
    const zip = that.$inputs.zip ? that.$inputs.zip.value : undefined;
    const city = that.$inputs.city ? that.$inputs.city.value : undefined;
    const street = that.$inputs.street ? that.$inputs.street.value : undefined;
    const business = that.$inputs.businessType ? that.$inputs.businessType.value : undefined;
    const profession = that.$inputs.profession ? that.$inputs.profession.value : undefined;
    if (zip) {
        await geocodeAndQuery(that, zip)
    } else if (street) {
        if (city) { // Successful street lookup
            await queryFirebaseByStreet(that, city, street)
        } else { // No city provided
            that.$speech.addText(that.t('street.lookup.no.city.prompt', {street: street}))
            that.$reprompt.addText(that.t('answer.reprompt'))
        }
    } else if (city) {
        await geocodeAndQuery(that, city)
    } else if (business || profession) {
        const businessType = business ? business : profession;
        await queryFirebaseByBusinessType(that, businessType)
    } else {
        that.$speech.addText(that.$cms.t('can.you.find.a.store.near.me.prompt'));
        that.$reprompt.addText(that.$cms.t('answer.reprompt'));
    }
    that.ask(that.$speech, that.$reprompt)    
}

/**
 * FindMyRealtimeLocationIntent - Find Stores by Realtime Location
 * 
 * @param {*} that - Jovo Speechbuilder Ref
 */
async function FindMyRealtimeLocationIntent(that) {
    if (that.$alexaSkill.hasGeoLocationInterface()) { 
        // Device has Geolocation Capabilities (Mobile Devices: Alexa Auto, etc)
        let geolocationPermissionGranted = that.isAlexaSkill() ? that.$alexaSkill.getGeoLocationPermissionStatus() : undefined ;
        if (geolocationPermissionGranted === 'GRANTED') {
            that.$user.$data.lat = that.$alexaSkill.getCoordinateLatitude()
            that.$user.$data.lon = that.$alexaSkill.getCoordinateLongitude()
            that.$user.$data.accuracyInMeters = that.$alexaSkill.getCoordinateAccuracy()
            const location = {
                lat: that.$user.$data.lat,
                lon: that.$user.$data.lon,
                accuracyInMeters: that.$user.$data.accuracyInMeters
            }
            await saveLocationToGeoFire(location)
            await query(that, location)
        } else {
            // Show Permission Card (Geolocation)
            if (that.isAlexaSkill()) {
                that.$alexaSkill.showAskForGeoLocationCard();
            }
            that.$speech.addText(that.t('find.my.realtime.location.prompt')) 
        }
    } else {
        // Device Address - Device DOES NOT have Geolocation Capabilities (Stationary Devices: Echo Dot, etc)
        let location;
        try {
            location = await that.$alexaSkill.$user.getDeviceAddress();
            that.$user.$data.deviceAddress = location;
            console.log(that.$user.$data.deviceAddress);
        } catch(error) {
            if (error.code === 'NO_USER_PERMISSION') {
                // Show Permission Card (Address)
                that.$alexaSkill.showAskForAddressCard()
                that.$speech.addText(that.t('address.permission.prompt'));
            } else {
                that.$speech.addText("Developer, please add Device Address Permission to project. For more information, read the Selina README.")
                console.log('ERROR: SKILL REQUIRED DEVICE ADDRESS PERMISSION. ADD DEVICE ADDRESS PERMISSION IN PROJECT.JS')
            }
        }
        if (location) {
            await geocodeAndQuery(that, that.$user.$data.deviceAddress ? that.$user.$data.deviceAddress.addressLine1 : "Columbus, OH")
        }
    }
    that.ask(that.$speech,that.$reprompt)
}

/**
 * query - Spatial Query with GeoFire API
 * @param {*} that - Jovo Speechbuilder Ref
 * @param {*} location - Geocoded Location to Lookup
 */
async function query (that, location) {
    // Save Location as User Input
    that.$user.$data.location = location;

    // Spatial Query with GeoFire
    const query = geocollection.near({ center: new admin.firestore.GeoPoint(location.lat, location.lon), radius: 50 });
    saveLocationToGeoFire(location)
    that.$alexaSkill.progressiveResponse(that.t('progressive.response.location.service.prompt', {location: that.$user.$data.locationSearch}))
        .then(() => that.$alexaSkill.progressiveResponse('Processing dry cleaners now...'));
    await query.get().then(async (value) => {
        console.log("GEOQUERY RESULTS:")
        console.log(value.docs); // All docs returned by GeoQuery
        that.$reprompt.addText(that.t('answer.reprompt'))
        if (value.size < 1) {
            // No Results
            console.log("MISSING! SAVE TO FIREBASE and NOTIFY SHAREHOLDERS")
            var d = new Date();
            await createMissingLocation(location.lat + "_" + location.lon, {
                created: d.getTime(),
                user: that.$user.getId()
            })
            that.$speech.addText(that.t('zip.no.results.prompt', {zip: that.$user.$data.locationSearch}))
        } else {
            // Results Exist
            let moreResults = [];
            value.forEach((locationMap, key) =>  {
                console.log("CURRENT VALUES")
                console.log(locationMap.data())
                console.log(key)
                if (key === 0) {
                    console.log(locationMap.data())
                    that.$speech.addText(that.t('city.lookup.prompt', {location: that.$user.$data.locationSearch, store: locationMap.id, address: locationMap.data().fullAddress, distance: (locationMap.distance* 0.621371).toFixed(1)}))
                    // Save First Result as User Data
                    that.$user.$data.store = locationMap.id;
                } else {
                    // Save Results as More Results
                    moreResults[key - 1] = locationMap.id;
                }
            }) 
            // Save More Results as User Data
            that.$user.$data.moreResults = moreResults; 
        } 
    });
}

/**
 * geocodeAndQuery - Geocode Location and Lookup Stores by Spatial Query in Firestore
 * @param {*} that - Jovo Speechbuilder Ref
 * @param {*} location - Location to Geocode & Lookup
 */
async function geocodeAndQuery(that, location) {
    that.$user.$data.locationSearch = location;
    return googleMapsClient.geocode({address: location})
        .asPromise()
        .then(async (response) => {
            const geocodedLocation = {
                lat: response.json.results[0].geometry.location.lat,
                lon: response.json.results[0].geometry.location.lng,
                accuracyInMeters: 1
            }
            console.log(response.json.results[0].geometry.location);
            await query(that, geocodedLocation)
        })
        .catch((err) => {
            console.log(err);
        });
}

/**
 * queryFirebaseByStreet - Lookup Stores by Zip in Firebase
 * @param {*} that - Jovo Speechbuilder Ref
 * @param {String} city - City to Lookup
 * @param {String} street - Street to Lookup
 */
async function queryFirebaseByStreet(that, city, street) {
    let location = street + ", " + city;
    await geocodeAndQuery(that, location)
}

/**
 * queryFirebaseByBusinessType - Lookup Stores by BusinessType in Firebase
 * @param {*} that - Jovo Speechbuilder Ref
 * @param {*} type - Business Type to Lookup
 */
async function queryFirebaseByBusinessType(that, type) {
    var ref =  db.collection('voice-companies').where('businessType', '==', type);
    await ref.get().then(function(querySnapshot) {
        if (querySnapshot.size >= 1) {
            querySnapshot.forEach(function(doc) {
                that.$speech.addText(that.t('business.type.lookup.prompt', {type: type, store: doc.id, description: doc.data().description, city: doc.data().city, resultCount: querySnapshot.size, street: doc.data().street, zip: doc.data().zip}))
            });
        } else {
            that.$speech.addText(that.t('business.type.no.results.prompt', {type: type}))
        }
        that.$reprompt.addText(that.t('answer.reprompt'))
        that.ask(that.$speech, that.$reprompt)
    });
}

/**
 * saveLocationToGeoFire - Saves GeoSpatial data to GeoFire
 * 
 * @param {*} location - Location Object
 */
async function saveLocationToGeoFire (location) {
    lat = Number(location.lat.toFixed(1));
    lon = Number(location.lon.toFixed(1));
    var geoCollectionRef =  db.collection('user-locations')
    const hash = lat + "-" + lon

    await geoCollectionRef.doc(hash).get().then((snapshot) => {
        let data = snapshot.data();
        if (!data) {
            // NEW LOCATION
            data = {
                count: 1,
                coordinates: new admin.firestore.GeoPoint(location.lat, location.lon)
            };
            console.log('Provided key is not in Firestore, adding document: ', JSON.stringify(data));
            createStoreGeoRef(hash, data);
        } else {
            // EXISTING LOCATION
            data.count++;
            console.log('Provided key is in Firestore, updating document: ', JSON.stringify(data));
            updateStoreGeoRef(hash, data);
        }
    }, (error) => {
        console.log('Error: ' + error);
    });
}

/**
 * createStoreGeoRef - Creates Spatial Reference in GeoFirestore
 * @param {*} key - ID of GeoFirestore Doc
 * @param {*} data - New GeoFire Object Data
 * 
 * data must include attribute - coordinates: new GeoSpatial.admin.firestore.GeoPoint(YOUR-LAT, YOUR-LON)
 */
async function createStoreGeoRef (key, data) {
    var geoCollectionRef =  db.collection('user-locations')
    return geoCollectionRef.doc(key).set(data).then(() => {
        console.log('Provided Geostore document has been added in Firestore');
    }, (error) => {
        console.log('Error: ' + error);
    });
}

/**
 * updateStoreGeoRef - Updates Spatial Reference in GeoFirestore
 * @param {*} key - ID of GeoFirestore Doc
 * @param {*} data - New GeoFire Object Data
 * 
 * data must include attribute - coordinates: new GeoSpatial.admin.firestore.GeoPoint(YOUR-LAT, YOUR-LON)
 */
async function updateStoreGeoRef (key, data) {
    var geoCollectionRef =  db.collection('user-locations')
    return geoCollectionRef.doc(key).update(data).then(() => {
        console.log('Provided Geostore document has been updated in Firestore');
    }, (error) => {
        console.log('Error: ' + error);
    });
}

/**
 * createMissingLocation - Creates Spatial Reference in GeoFirestore
 * @param {*} key - ID of GeoFirestore Doc
 * @param {*} data - New GeoFire Object Data
 * 
 * data must include attribute - coordinates: new GeoSpatial.admin.firestore.GeoPoint(YOUR-LAT, YOUR-LON)
 */
async function createMissingLocation (key, data) {
    var geoCollectionRef =  db.collection('missing')
    return geoCollectionRef.doc(key).set(data).then(() => {
        console.log('Provided missing location Geostore document has been added in Firestore');
    }, (error) => {
        console.log('Error: ' + error);
    });
}