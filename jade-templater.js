// Metalsmith Jade Templater.

var jade = require('jade'),
    path = require('path'),
    fs = require('fs')

function metalsmithJade () {
    return function (files, metalsmith, done) {
        Object.keys(files).forEach(function (filename) {
            var file = files[filename];
            
            console.log('File template value:', file.template, 'path:', path.resolve(file.template));
            
            var templateFilePath = path.resolve(file.template);
            var templateContents = fs.readFileSync(templateFilePath, 'utf8').toString();
            
            var templateFn = jade.compile(templateContents, {pretty: true, filename: filename});
            var locals = Object.create(null);
            locals.data = file;
            var htmlOutput = templateFn(locals);
            
            file.contents = new Buffer(htmlOutput);
        });
        
        done();
    };
}

module.exports = metalsmithJade;
