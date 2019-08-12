var natural = require('natural');

function distancia(msg, nome){
	
	x = msg.replace(/ .*/,'');
	
	/*
	 * I recommend to uncomment this if statement and replacing letter 'a'
	 * with the first letter of your robot's name.
	 * 
	 * Because sometimes it separetes the first letter of the sentence.
	 * 
	 * So this function will join the first and second word. 
	 * */
	 
	 /*
	if (x == 'a'){
	  	x = msg.split(' ').slice(0,2).join('');
	}
	*/
	
	/*
	 * Here we compare if the word you said is similar to your robot's name
	 * 
	 * for more information about natural, you can access -> https://github.com/NaturalNode/natural
	 * */
	x = natural.JaroWinklerDistance(nome ,x);
	return x;
}

module.exports = {distancia: distancia}
