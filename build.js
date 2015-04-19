var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    jade = require('jade'),
    path = require('path'),
    fs = require('fs');

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

Metalsmith(__dirname)
    .source('./src/')
    .destination('./output/')
    .use(markdown())
    .use(metalsmithJade())
    .build(function(err, files) {
        console.log('Build function...');
        
        if (err) throw err;
        
        console.log('No error?');
        //console.log('Files: ' + JSON.stringify(files));
        console.log('Files:', Object.keys(files));
    });
