var fs = require('fs');

/*
 * simple reader funtion to read JSON files
 * */
function lerJson(pathToFile){
	var obj = JSON.parse(fs.readFileSync(pathToFile ,'utf8'));
	return obj;
}

module.exports = {lerJson: lerJson}
