
const STRINGS = {
    TO_STATE:{
        WELCOME: {
            PROMPT:(businessName) => `Welcome to ${businessName} we have Free Pickup and Delivery, <break time='0.25s'/> just say <break time='0.25s'/> on demand <break time='0.25s'/> and we come to your home, <break time='0.25s'/> or <break time='0.25s'/> say <break time='0.25s'/> on my way <break time='0.25s'/> to let us know you are on the way to a ${businessName} location to pickup your clean clothes, `,
            REPROMPT: `You can say <break time='0.25s'/> on demand <break time='0.25s'/> or <break time='0.25s'/> on my way`,
            EXISTING: {
                PROMPT:(businessName) => `Welcome back to ${businessName} <break time='0.25s'/> would you like to <break time='0.25s'/> place an on demand dry cleaning pickup ?<break time='0.25s'/> or <break time='0.25s'/> let the cleaner know you are on your way?`,
                REPROMPT: `Do you want to <break time='0.25s'/> have us pickup your clothes on monday or tuesday <break time='0.25s'/> if so say <break time='0.25s'/> on demand <break time='0.5s'/> if you want to inform us you are picking your clothes up soon <break time='0.25s'/> say on my way`
            }
        },
        NAME: {
            PROMPT:(businessName) => `Welcome to ${businessName}. What is your first name?`,
            PROMPT_GOOGLE:(businessName) =>`Welcome to ${businessName}. This app does not charge you nor conduct any transactions. What is your first name?`,
            REPROMPT: `What is your first name?`,
            PERMISSION_CARD_PROMPT:(businessName) => `Welcome to ${businessName}. Open the Alexa App to give permission to use some of your personal information to save time on your next order. In the meantime, What is your first name?`
        },
        ORDER_TYPE: {
            PROMPT: (name) => `Thanks ${name}. Would you like to place a Pickup or Delivery order? `,
            REPROMPT: `Would you like to place a Pick up or Delivery order?`
        },
        ADDRESS: {
            PERMISSION: {
                PROMPT: 'Can access your location?',
                REPROMPT: 'Please say yes or no.'
            },
            ENTRY: {
                PROMPT: 'Ok, then say your address now.',
                REPROMPT: 'What is your address.',
                INCORRECT: {
                    PROMPT: 'Please say your full address. For example, 42 Wallaby Way in Sydney.',
                    REPROMPT: 'Say your full address.'
                }
            }
        },
        PHONE : {
            PROMPT: 'What is your phone number so we can send you a verification of your order?',
            REPROMPT: 'Please Tell Us Your Phone Number.'
        },
        ORDER_CONFIRMATION: {
            PROMPT: (name,orderType,addressLine1,city,phone,specialNote) => `Here is your order for ${name}! We will ${orderType} your dry cleaning at ${addressLine1} in ${city}, and contact you at ${phone} , when it is ready. You would like the cleaner to know ${specialNote}. Did I get all of your information correct?`,
            PROMPT_NO_NOTE:(name,orderType,addressLine1,city,phone) => `Here is your order for ${name}! We will ${orderType} your dry cleaning at ${addressLine1} in ${city}, and contact you at ${phone} , when it is ready. Did I get all of your information correct?`,
            REPROMPT: 'Did i get your order details right?'
        },
        SPECIAL_NOTE: {
            ASK: {
                PROMPT: "Do you have any special notes you would like to add to your order?",
                PROMPT_REPEAT_CUSTOMER: "Welcome back! We have your previous order details saved. Is there anything you would like the driver to know?",
                REPROMPT: "Do you have any extra notes?"
            },
            ENTRY: {
                PROMPT: "Ok, what notes would you like the driver to know?",
                REPROMPT: "Please say your special notes."
            },
        },
        RE_ENTRY : {
            PROMPT: 'Ok, what did I get wrong. Was it your name, your phone number, type of order, address or note?',
            REPROMPT: 'Please say what I got wrong.'
        },
        END_CONVERSATION: {
            PROGRESSIVE_RESPONSE: "Ok great, I'm working on confirming your order now.",
            PROMPT:(businessName,tip) => `Ok your order is confirmed, thanks for ordering with ${businessName}! Here's a dry cleaning tip for you. ${tip}`
        }
    },
    UNHANDLED: {
        GENERIC: {
            PROMPT: "I'm sorry I didn't understand that.",
            REPROMPT: "I'm sorry I didn't understand that."
        },
        NAME: {
            PROMPT: "I'm sorry I didn't understand that. Please say your name again.",
            REPROMPT: "Say your name again"
        },
        ORDER_TYPE: {
            PROMPT: "I'm sorry I didn't understand that. Say pickup, or delivery",
            REPROMPT: "Say pickup, or delivery"
        },
        ADDRESS: {
            PERMISSION: {
                PROMPT: "I'm sorry I didn't understand that. Say yes to allow me to see your address, or no to not.",
                REPROMPT: " Say yes to allow me to see your address, or no to not."
            },
            ENTRY: {
                PROMPT: "I didn't understand that address. If you are saying a valid address, and I am still not understanding, try saying it like this. I live at 42 Wallaby Way in Sydney.",
                REPROMPT: "Please repeat your full address."
            }
        },
        PHONE: {
            INVALID_SPEECH: {
                PROMPT:(businessName) => `I'm sorry I didn't understand that. Please say your phone number so ${businessName}  can send you a text confirmation of your order.`,
                REPROMPT: "What is your phone number?"
            },
            INVALID_NUMBER: {
                PROMPT: "I'm sorry, the phone number I heard is invalid. Please try saying it again.",
                REPROMPT: "Please try saying your phone number again."
            }
        },
        SPECIAL_NOTE: {
            ASK: {
                PROMPT: "I didn't understand that, would you like to leave a special note for your order?",
                REPROMPT: "Would you like to leave a note on your order?"
            },
            ENTRY: {
                PROMPT: "I'm sorry, I didn't understand your note. I might have an easier time understanding you, if you start your note with, my note is.",
                REPROMPT: "Please repeat your note."
            }
        },
        ORDER_CONFIRMATION: {
            PROMPT: "Did I get your order right?",
            REPROMPT: "Say yes if I have the correct information."
        },
        REENTRY:{
            PROMPT: "I'm sorry I didn't understand that. Please re enter your information now.",
            REPROMPT: "Please re enter your information now."
        }
    },
    RE_ENTRY : {
        PRE_WELCOME: (businessName) =>`Welcome back to ${businessName}. <break time="0.5s"/> we need just a few more things to get your dry cleaning completed. <break time="0.5s"/> `,
        NAME: {
            PROMPT: 'Ok, say your name now.',
            REPROMPT: "Say your name now."
        },
        PHONE: {
            PROMPT: "Ok, say your phone number now.",
            REPROMPT: "'Say your phone number now."
        },
        ORDER_TYPE: {
            PROMPT: "Ok, say pick up, or delivery, now.",
            REPROMPT: "Say pick up, or delivery, now."
        },
        ADDRESS: {
            PROMPT: "Ok, say your address now.",
            REPROMPT: "Please say your address."
        },
        NOTE: {
            PROMPT: "Ok, say your note now.",
            REPROMPT: "Please say your note now"
        }
    },
    PERMISSIONS: {
        ADDRESS: {
            PROMPT: 'Please open your Alexa App to allow access to your address.',
            REPROMPT: 'Please open your Alexa App to allow access to your address.',
        },
        NAME: {
            NO_USER_PERMISSION: `Please grant access to your full name.`,
        }
    },
    UTILITY: {
        HELP_MESSAGE:(businessName) => `The ${businessName} skill enables you to place a dry cleaning order, or let ${businessName} know you are on the way. Would you like to start an on demand order? Or, would you prefer to let ${businessName} know you are on the way?`,
        CANCEL_MESSAGE: 'Ok, goodbye.',
        TEXT_ERROR: "I'm, sorry. I had some trouble confirming your order, please try again.",
        HELP_FIRST_NAME: "Please say your first name so we can finish your dry cleaning order.",
        HELP_ORDER_TYPE: "Please say pickup or delivery so we can finish your dry cleaning order.",
        HELP_ADDRESS: "You can give the driver the location they should go. Try saying it like this. I live at 42 Wallaby Way in Sydney..",
        HELP_PHONE: "In order to send you a confirmation of your order we need your 10-digit phone number. What is your phone number?",
        HELP_VERIFY: "If the information you heard was correct, say yes. Is all of your information correct?",
        HELP_SPECIAL_NOTE_BOOLEAN: "If you have a special note for the driver, say yes. Do you have a note to leave for the driver?",
        HELP_SPECIAL_NOTE_ENTRY: "You can start your note to the driver by saying, my note is. What note would you like to leave?",
    },
    TWILIO: {
        SID: 'AC63637242234d8751ba63f2edbf18c2d5',
        AUTH: 'c486e9aa265cdf033087be0b016be063',
        FROM_PHONE_NUMBER: '+17084067241'
    }
}

module.exports = {
    STRINGS,
}
