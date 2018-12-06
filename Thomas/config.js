/*
User-specific configuration
    ** IMPORTANT NOTE ********************
    * Please ensure you do not interchange your username and password.
    * Hint: Your password is the smaller value ~ 12 characters
*/ 

exports.workspaceId = ''; // replace with the workspace identifier of your conversation

// Create the credentials object for export
exports.credentials = {};

// Watson Conversation
// https://www.ibm.com/watson/developercloud/conversation.html
exports.credentials.assistant = {
	password: '',
	username: ''
};

// Watson Speech to Text
// https://www.ibm.com/watson/developercloud/speech-to-text.html
exports.credentials.speech_to_text = {
	apikey: ''
};

// Watson Text to Speech
// https://www.ibm.com/watson/developercloud/text-to-speech.html
exports.credentials.text_to_speech = {
	apikey: '',
	url: 'https://stream.watsonplatform.net/text-to-speech/api'
};
