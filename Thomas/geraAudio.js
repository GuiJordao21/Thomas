var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');

/*
 * Here we have a simple audio generator
 * 
 * Is just an example for you if you are willing to know how this works.
 * You can also check the watson-developer-cloud module to see how things are done there
 * */

var text_to_speech = new TextToSpeechV1({
	username:'<username>',
	password:'<password>'
});

var params = {
		text: "some text",
		voice: 'pt-BR_IsabelaVoice',
		accept:'audio/wav'
	}

text_to_speech.synthesize(params, function(err, audio){
	if(err){
		console.log(err);
		return;
	}
	text_to_speech.repairWavHeader(audio);
	fs.writeFileSync('filename.wav', audio);
	console.log('audio.wav written with a corrected wav header');
});
