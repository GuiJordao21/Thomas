var natural = require('natural');
var getJson = require('./readJsonTest.js');

function comparar(str){

	/*
	 * here we iterate through the json object to check for keywords.
	 * 
	 * this section is very personal for each case, so, is very important for you and for your bot performance.
	 * you need to update this with YOUR OWN intents and keywords.
	 * */

	keyWords = {
	  "intent":"keyword",
	  "intent":"keyword",
	  "intent":"keyword",
	  "intent":"keyword",
	  "intent":"keyword",
	  "intent":"keyword",
	  "intent":"keyword",
	  "intent":"keyword",
	  "intent":"keyword",
	}
	
	var keysFromJson = Object.keys(keyWords);
	var intent = "none";

	/**
	 * if the keyword is inside this JSON you can use this to reduce latency
	 */
	
	for(var i=0;i<keysFromJson.length;i++){
		if(str.includes(keyWords[keysFromJson[i]])){
			intent = keysFromJson[i];
			console.log(intent);
		}
	}

	/*
	 * we have two return options:
	 * 
	 * 	first option - returns the sentences intention. This intention is going to be used
	 * on conversation.js to reduce latency and reprodece a .wav file directly.
	 * 
	 *  second option - returns a control(adi) number. This will inform the code that the function didn't 
	 * found anything similar to the sentence sent and will send it to conversation service. 
	 * */
	if (intent != "none"){
		return intent;
	}else{
		return 1;
	}
	
}

module.exports = {comparar: comparar}
