/**
 * @author github.com/christianalfoni
 * @source https://raw.githubusercontent.com/christianalfoni/react-webpack-cookbook/master/scripts/generate-wiki.js
 */
'use strict';

var path = require('path');

var fs = require('fs-extra');
var async = require('async');


main();

function main() {
    var input = './txt';
    var output = './wiki';

    fs.mkdir(output, function() {
        // if it dir exists already, just override content
        generateWiki(input, output, function(err) {
            if(err) {
                return console.error(err);
            }
	    fs.rename(path.join(output,'Home.md'),path.join(output, 'README.md'), function(){
		console.log("Renombrado Home")
	    });
	    fs.rename(path.join(output,'_Sidebar.md'),path.join(output, 'SUMMARY.md'), function(){
		console.log("Renombrado Sidebar")
	    });

            console.log('generated wiki');
        });
    });
}

function generateWiki(input, output, cb) {
    async.series([
        fs.copy.bind(null,
            input,
            output
        ),
        fs.copy.bind(null,
            path.join(input, 'README.md'),
            path.join(output, 'Home.md')
        ),
        generateSidebar.bind(null, {
            input: path.join(input, 'SUMMARY.md'),
            output: path.join(output, '_Sidebar.md')
        }),
        fs.remove.bind(null, path.join(output, 'README.md')),
        fs.remove.bind(null, path.join(output, 'SUMMARY.md')),
    ], cb);
}

function generateSidebar(config, cb) {
    var data = fs.readFileSync(config.input, {
        encoding: 'utf8'
    });

    data = data.replace(/.md/g, '');

    fs.writeFile(config.output, data, cb);
}

