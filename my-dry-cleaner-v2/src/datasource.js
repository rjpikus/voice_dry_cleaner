module.exports = {
    datasource : function (business,phone,logo,text) {
        var dataSource = {
            "bodyTemplate3Data": {
                "type": "object",
                "objectId": "bt3Sample",
                "backgroundImage": {
                    "contentDescription": null,
                    "smallSourceUrl": null,
                    "largeSourceUrl": null,
                    "sources": [
                        {
                            "url": "https://us.123rf.com/450wm/amguy/amguy1801/amguy180100093/93022123-gray-background-black-background-illustrated-background-with-diagonal-black-and-gray-light-.jpg?ver=6",
                            "size": "small",
                            "widthPixels": 0,
                            "heightPixels": 0
                        },
                        {
                            "url": "https://us.123rf.com/450wm/amguy/amguy1801/amguy180100093/93022123-gray-background-black-background-illustrated-background-with-diagonal-black-and-gray-light-.jpg?ver=6",
                            "size": "large",
                            "widthPixels": 0,
                            "heightPixels": 0
                        }
                    ]
                },
                "title": business,
                "image": {
                    "contentDescription": null,
                    "smallSourceUrl": null,
                    "largeSourceUrl": null,
                    "sources": [
                        {
                            "url": logo,
                            "size": "small",
                            "widthPixels": 0,
                            "heightPixels": 0
                        },
                        {
                            "url": logo,
                            "size": "large",
                            "widthPixels": 0,
                            "heightPixels": 0
                        }
                    ]
                },
                "textContent": {
                    "title": {
                        "type": "PlainText",
                        "text": business
                    },
                    "subtitle": {
                        "type": "PlainText",
                        "text": ' Phone: ' + phone
                    },
                    "primaryText": {
                        "type": "PlainText",
                        "text": text
                    }
                },
                "logoUrl": 'https://s3.amazonaws.com/my-dry-cleaner/logos/voicedrycleaner.com_alexa_skill_512x512+(1).jpg',
                "hintText": "Try, \"Alexa, launch" + business + "\""
            }
        };
        return {
            type: 'Alexa.Presentation.APL.RenderDocument', 
            version: '1.0',
            document: require(`./document.json`),
            datasources: dataSource
        }
    }
}