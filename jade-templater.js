// Metalsmith Jade Templater.

var jade = require('jade'),
    path = require('path'),
    fs = require('fs'),
    Q = require('q');

function metalsmithJade () {
    var fs_readFile = Q.denodeify(fs.readFile);
    
    return function (files, metalsmith, done) {
        var jadeTemplatePromises = [];
        
        Object.keys(files).forEach(function (filename) {
            var file = files[filename];
            
            if (!file.template) {
                // No template file specified, do nothing.
                return;
            }
            
            console.log('File template value:', file.template, 'path:', path.resolve(file.template));
            
            // Resolve the relative template file path to an absolute path.
            var templateFilePath = path.resolve(file.template);
            
            var templateReadPromise = fs_readFile(templateFilePath, 'utf8');
            templateReadPromise
                .then(function (fileBuffer) {
                    var templateContents = fileBuffer.toString();
                    
                    var templateFn = jade.compile(templateContents, {pretty: true, filename: filename});
                    var locals = Object.create(null);
                    locals.data = file;
                    var htmlOutput = templateFn(locals);
                    
                    file.contents = new Buffer(htmlOutput);
                })
                .catch(function (error) {
                    console.error(error.toString());
                    
                    throw error; // ???
                });
            
            jadeTemplatePromises.push(templateReadPromise);
        });
        
        Q.all(jadeTemplatePromises)
            .then(function (result) {
                console.log('Jade templating finished.');
            })
            .then(function (result) {
                done();
            })
            .catch(function (error) {
                console.error(error.toString());
            })
    };
}

module.exports = metalsmithJade;
