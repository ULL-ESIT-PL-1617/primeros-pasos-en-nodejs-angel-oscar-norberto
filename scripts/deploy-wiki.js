'use strict';

var fs = require('fs-extra');
var exec = require('child_process').exec;
var process = require('process');


var contenido = fs.readFileSync("./package.json");
  
var configuracion = JSON.parse(contenido);

var wiki = configuracion.repository.wiki;

process.chdir('wiki');

console.log(wiki);

exec("rm -rf .git", function(error, stdout, stderr) {
    exec("git init", function(error, stdout, stderr) {
        exec("git add .", function(error, stdout, stderr) {
            exec("git commit -m 'Deploy to Wiki'", function(error, stdout, stderr) {
                exec("git remote add origin " + wiki, function(error, stdout, stderr) {
                    exec("git push --force origin master:master", function(error, stdout, stderr) {
                        console.log("Desplegado wiki");
                    });
                });
            });
        });
    });
});