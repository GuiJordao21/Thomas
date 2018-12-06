var config = require('./config');
var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');
var spawn = require('child_process').spawnSync;

audioGenerator();

/*
 * This is the function that is called from conversation and resolve all the others
 * */
function audioGenerator() {
	writeAll().then(result => {
		return checkFile().then(arrayJsons => {
			return controlarAudios(arrayJsons).then(done => {
				console.log(done);
			}).catch(err => {console.log(err)});
		}).catch(err => {console.log(err)});
	}).catch(err => {console.log(err)});
}

/*
 * Here we call a child process to use a python function.
 * 
 * The only reason we do this here is because is so much easier to write files with python.
 * 
 * if tou want to know more about this, just go to ../DynamicCaching and vi writeAll.py
 * */
function writeAll() {
	return new Promise((resolve, reject) => {
		spawn('python3', ["/home/pi/Thomas/Thomas/DynamicCaching/writeAll.py"]);
		resolve(true);
	});
}


/*
 * This is where we generate audios Dynamically in case
 * the person add some other answer to it's workspace on conversation
 * 
 * We compare the two answer files to if there is any kind of new answer, if there is,
 * we generate a .wav file just to that specific answer.
 * 
 * If this is the first time that the person is using this bot, the function will generate all audio files
 * and a sys_control file, just to know that the audios are already created and we don't need to generate
 * them again.
 * */
function controlarAudios(arrayJsons) {
	return new Promise((resolve, reject) => {
		answers = arrayJsons[0];
		newAnswers = arrayJsons[1];

		var keysFromJson = Object.keys(newAnswers);

		fs.stat('/home/pi/Thomas/sys_control', function (err, stat) {
			if (err == null) {
				keysFromJson.forEach(element => {
					var resp1 = answers[element];
					var resp2 = newAnswers[element];

					if (resp1 == resp2) {
						console.log("Both answers are the same.");
					} else {
						var textToSpeech = new TextToSpeechV1({
							iam_apikey: config.credentials.text_to_speech.apikey,
							url: config.credentials.text_to_speech.url
						});
						var params = {
							text: resp2,
							voice: 'pt-BR_IsabelaVoice',
							accept: 'audio/wav'
						}

						text_to_speech.synthesize(params, function (err, audio) {
							if (err) {
								console.log(err);
								return;
							}
							text_to_speech.repairWavHeader(audio);
							fs.writeFileSync('/home/pi/Thomas/audio/' + keysFromJson[i] + '.wav', audio);
							console.log('audio.wav written with a corrected wav header');
						});
					}
				});
					
				
				resolve(true);
			} else {
				keysFromJson.forEach(element => {
					var resp1 = answers[element];

					console.log(element)

					var textToSpeech = new TextToSpeechV1({
						iam_apikey: config.credentials.text_to_speech.apikey,
						url: config.credentials.text_to_speech.url
					});

					var params = {
						text: resp1,
						voice: 'pt-BR_IsabelaVoice',
						accept: 'audio/wav'
					}

					textToSpeech.synthesize(params, function (err, audio) {
						if (err) {
							console.log(err);
							return;
						}
						textToSpeech.repairWavHeader(audio);
						fs.writeFileSync('/home/pi/Thomas/audio/' + element + '.wav', audio);
						console.log('audio.wav written with a corrected wav header');
					});
				}); 
					
				
				var stream = fs.createWriteStream("/home/pi/Thomas/sys_control");
				stream.once('open', function (fd) {
					stream.write("IMPORTANT SYSTEM FILE, DO NOT REMOVE!");
					stream.end();
				});
				resolve("code = else");
			}
		});
	});
}

/*
 * this is a 'just in case' function
 * 
 * it checks if both files exists (answers.json and newAnswers.json)
 * if newAnswers.json doesn't exists, we create one, just to make everything ok.
 * 
 * After that, we read both json files to use them in controlarAudios()
 * 
 * this function return an array with two json Objects. 
 * */
function checkFile() {
	return new Promise((resolve, reject) => {
		var check = fs.existsSync('/home/pi/Thomas/Thomas/DynamicCaching/newAnswers.json');
		var answers = JSON.parse(fs.readFileSync('/home/pi/Thomas/Thomas/DynamicCaching/answers.json', 'utf8'));
		if (check == true) {
			var newAnswers = JSON.parse(fs.readFileSync('/home/pi/Thomas/Thomas/DynamicCaching/newAnswers.json', 'utf8'));
			console.log(newAnswers);
			arrayResp = [answers, newAnswers];
			resolve(arrayResp);
		} else {
			fs.writeFile('/home/pi/Thomas/Thomas/DynamicCaching/newAnswers.json', answers, 'utf8', function (err) {
				if (err) {
					return console.log(err);
				}
				console.log("file was saved!");
			});
			var newAnswers = JSON.parse(fs.readFileSync('/home/pi/Thomas/Thomas/DynamicCaching/newAnswers.json', 'utf8'));
			arrayResp = [answers, newAnswers];
			resolve(arrayResp);
		}
	});
}

module.exports = {
	audioGenerator: audioGenerator
}
