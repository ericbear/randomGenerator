var rand = require("randomstring");
var fs = require("fs");

if (process.argv.length !== 5) {
	console.log("missing some arguments.");
	console.log("> node generate.js [PREFIX] [VOLUME] [OUTPUT_LENGTH]");
	
	process.exit(1);
}

var prefix = process.argv[2];
var volume = parseInt(process.argv[3]);
var randLength = parseInt(process.argv[4]);

var outputFile = prefix+"_"+new Date().getTime()+".csv";

//setting
var randCharset = {
	length: randLength - prefix.length,
	charset: "2345678abcdefhjklmnprstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
}

var serials = {};

//generate the serial codes
for (var i=0; i<=volume;) {
	var randWord = prefix + rand.generate(randCharset);
	
	if (serials[randWord] === undefined) {
		serials[randWord] = 1;
		
		i++;
	}
	else {
		serials[randWord] += 1;
	}
}

//output the results
var output = "";
Object.keys(serials).forEach(function(element, key, _array) {
	output += "\n"+element;
});

fs.writeFileSync(outputFile, output.substr(1), "utf8");
console.log("save as "+outputFile);