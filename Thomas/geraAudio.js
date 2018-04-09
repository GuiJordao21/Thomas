var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');

/*
 * Here we have a simple audio generator
 * 
 * This creates individual audios for Thomas. There are two audio functions.
 * 'generateAudios' check every 7:30 minutes to see if there is any new answer on conversation dialog tree.
 * this just checks if the answer send this specific time exists.if it doesn't is generates the audio. 
 * */

function singleAudio(arrayDasRespostas){
	return new Promise((resolve, reject) => {
		
		var text_to_speech = new TextToSpeechV1({
			username:'<username>',
			password:'<password>'
		});

		var params = {
			text: arrayDasRespostas[1],
			voice: 'pt-BR_IsabelaVoice',
			accept:'audio/wav'
		}

		text_to_speech.synthesize(params, function(err, audio){
			if(err){
				console.log(err);
				return;
			}
			text_to_speech.repairWavHeader(audio);
			fs.writeFileSync('../audio/'+arrayDasRespostas[0]+'.wav', audio);
			resolve('audio.wav written with a corrected wav header');
		});
	});
}

module.exports = {singleAudio: singleAudio}
