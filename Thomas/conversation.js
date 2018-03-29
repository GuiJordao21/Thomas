/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var TJBot = require('tjbot');
var config = require('./config');
var jaroWinkler = require('./jaroWinklerDistance');
var analise = require('./analiseDeIntencao');
var generate = require('./generateAudios');
var request = require('request');
var Promise = require('promise');
const { spawn } = require('child_process');

// obtain our credentials from config.js
var credentials = config.credentials;

// obtain user-specific config
var WORKSPACEID = config.conversationWorkspaceId;

// these are the hardware capabilities that TJ needs for this recipe
var hardware = ['microphone', 'speaker'];

// set up TJBot's configuration
var tjConfig = {
    robot:{
		name:'amanda',
		gender:'female'
	},
    log: {
        level: 'verbose'
    },
    listen:{
		language:'pt-BR'
	},
	speak:{
		language:'pt-BR'
	}
};

// instantiate our TJBot!
var tj = new TJBot(hardware, tjConfig, credentials);
var control = 0;
var intencao = '';

var conf = 0;
//we need this URL to send posts and update the website
var url = 'http://9.18.180.211:3001/';

var adi = 0;

console.log("Você pode me perguntar coisas sobre a IBM.");
console.log("tente, \"" + tj.configuration.robot.name + ", quem é a presidente da IBM\" ou \"" + tj.configuration.robot.name + ", quando a IBM chegou no Brasil?\"");
console.log("Você também pode dizer, \"" + tj.configuration.robot.name + ", como está o clima hoje?\"");
console.log(control)

//this runs the audioGenerator function each 7:30 minutes 
setInterval(()=>{
		generate.audioGenerator();
		console.log("working");
	},450000);
// listen for utterances with our attentionWord and send the result to
// the Conversation service
tj.listen(function(msg) {
	
	// when control is 0, we check to listen to bots name
    if (control == 0){
		// check if people are talking to the bot
		var dist = jaroWinkler.distancia(msg, tj.configuration.robot.name);


		if (dist > 0.8){
				//change first word that might be similar to robot name
				msg = msg.replace(/^\S+/g, tj.configuration.robot.name)
			}
		
		//if the message includes the bots name, we play a beep sound
		if (msg.includes(tj.configuration.robot.name)) {
				spawn('aplay',['/home/pi/tjbot_github/audio/bipe.wav']);
				control = 1;
			}
		}
	else{
	/*
	 * Here we have "control = 1" and listen to the next sentece the person says
	 * to analyse it.
	 * */
		analisa(msg).then(
			response => {
					/*
					 * see function "compara" for more information.
					 * */
					return comparar(msg).then(
						response => {
							/*
							 * see function postar for more information
							 * */
							postar().then(
								console.log("horay!!")
								/*
								 * All this process is done to reduce latency.
								 * 
								 * our goal here was to make the process as fast as possible, and we achieved
								 * that if the user has a decent internet connection.
								 * 
								 * if you intend to use this in a noisy environment, you can easily add a
								 * button in the algorithm. I recommend rpi-gpio-buttons
								 * 
								 * It's really simple to use, just npm install rpi-gpio-buttons
								 * */
							);
					});
			});
	}    
});

function postar(){
	return new Promise((resolve, reject) => {
		//this is the information that will be send to the server		
		var data = {"key":intencao};
		var options = {
			method: 'POST',
			body: data,
			json: true,
			url:url
			}
		request(options, function(err, res, body){
			if(err){
				console.error('error posting json: ', err);
			}
		});
		 
		/*
		 * control == 2 meeans that the bot doesn't have any acceptable answer to the question and will play an
		 * .wav file saying it needs to study about the subject, but will load a htlm page rendered with 
		 * watson disacovery content
		 * */
		if (control == 2){
			tj.play("/home/pi/tjbot_github/audio/estudar.wav");
		}else{
			/*
			 * if reaches this place of the code, it means that the bot found the conversation 
			 * answer acceptable and will load a .wav file with the intent name and play the answer
			 * */
			tj.play("/home/pi/tjbot_github/audio/"+intencao+".wav");
		}
		adi = 0;
		control = 0;
		
		resolve(True);
		
	});
};

function comparar(msg){
	return new Promise((resolve, reject) => {
		
		/*
		 * This function is used if you don't have a match in the "analisa" function.
		 * if we got a number 1 as a return it's a sign to grab the sentence and send it
		 * to watson's cconversation  
		 **/
		if (adi == 1) {
			msg = (tj.configuration.robot.name + msg);
			if (msg.includes(tj.configuration.robot.name)) {
				var turn = msg.toLowerCase().replace(tj.configuration.robot.name.toLowerCase(), "");
				tj.converse(WORKSPACEID, turn, function(response) {
					conf = response.object.intents[0].confidence;
					/*
					 * here we check the conversations confidence of the response given
					 * 
					 * we only accept it if is higher then 0.6
					 * 
					 * this is important because if is higher then 0.6, we grab the response intent and
					 * use it for 2 purposes. first, we use it to select a audio from the file system and
					 * play it. Second, we send the intent to the web server and render a new page.
					 *   
					 * */
					if (conf > 0.6){
						intencao = response.object.intents[0].intent;
						resolve(intencao);
					}else{
						/*
						 * if this is lower then 0.6, we use the hole sentence as information to send 
						 * to conversation service 
						 * */
						intencao = msg;
						//now we set the control variable to 2
						control = 2;
						resolve(intencao);
					}									
				});
			}			
		}else{
			resolve(intencao);
		}
	});
};

function analisa(msg){
		/*
		 * First promise. we send the sentencew to our comparative function
		 * and analyse it with "analise.comparar(String arg)".
		 * */
		return new Promise((resolve, reject) => {

			adi = analise.comparar(msg);
			intencao = adi;
			console.log(intencao);
			
			resolve(adi)
		});
	}
