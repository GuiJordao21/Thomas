var natural = require('natural');
var getJson = require('./readJsonTest.js');

function comparar(str){

	/*
	 * here we iterate through the json object to check for keywords.
	 * */

	keyWords = {
	  "ai_primeiroPasso":"primeiro passo",
	  "bitcoin":"bitcoin",
	  "bom_dia_icc":"",
	  "bradesco":"bradesco",
	  "clima":"clima",
	  "ctr":"primeiro nome",
	  "data_criacao":"criada",
	  "Data_IBM_Brasil":"chegou",
	  "demo_trem":"inicie",
	  "dolar_hoje":"dolar",
	  "fundador_IBM":"fundou",
	  "homem_na_lua":"lua",
	  "IBM_primeira_maquina":"maquina",
	  "IBM_RJ":"janeiro",
	  "investimento":"investir",
	  "locais_comemoracao_100anos":"comemorados",
	  "missao":"missão",
	  "noticias":"notícias",
	  "presidente_IBM":"presidente",
	  "quem_participou":"quem participou",
	  "sicredi":"sicredi",
	  "smarter_planet":"iniciativa",
	  "think":"think",
	  "valentim_boucas":"valentim",
	  "watson_ai":"watson"
	}
	
	var keysFromJson = Object.keys(keyWords);
	var intent = "none";
	
	for(var i=0;i<keysFromJson.length;i++){
		if(str.includes(keyWords[keysFromJson[i]])){
			intent = keysFromJson[i];
			console.log(intent)
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
