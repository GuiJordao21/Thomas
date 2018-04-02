/*
User-specific configuration
    ** IMPORTANT NOTE ********************
    * Please ensure you do not interchange your username and password.
    * Hint: Your username is the lengthy value ~ 36 digits including a hyphen
    * Hint: Your password is the smaller value ~ 12 characters
*/ 

exports.conversationWorkspaceId = '554a5b15-4234-4b15-aa49-27c220bb862c'; // replace with the workspace identifier of your conversation

// Create the credentials object for export
exports.credentials = {};

// Watson Conversation
// https://www.ibm.com/watson/developercloud/conversation.html
exports.credentials.conversation = {
	password: 'eTCTE34Y6TG5',
	username: '8b4bae75-b2f7-4aea-95c6-1df6de847f1c'
};

// Watson Speech to Text
// https://www.ibm.com/watson/developercloud/speech-to-text.html
exports.credentials.speech_to_text = {
	password: 'RXiHtaHAFYRI',
	username: '32e19e7e-3c2f-4e4b-b064-b7ebc7e2dfdf'
};

// Watson Text to Speech
// https://www.ibm.com/watson/developercloud/text-to-speech.html
exports.credentials.text_to_speech = {
	password: 'HJctMn0kjkwQ',
	username: 'f1e10a38-39bb-426f-a402-d278502792e6'
};
