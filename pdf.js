var Prince = require("prince");
var jade = require('pug');
var fs = require('fs');

var title = process.argv[2];
var input = 'map.html';
var output = 'map.pdf';

// generate html
jade.renderFile('resources/index.pug', {}, function (error, html) {
    if (error) throw error;
    // save index.html
    fs.writeFile(input, html, function(error) {
        if (error) throw error;
        // generate pdf
        Prince()
            .inputs("map.html")
            .output("map.pdf")
            .execute()
            .then(function () {
                console.log("OK: done");
            }, function (error) {
                console.log("ERROR", error);
            })
    })
})