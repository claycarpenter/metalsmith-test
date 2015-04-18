var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates');

var logger = function() {
    return function(files, metalsmith, done) {
        // console.log('Files count: ' + JSON.stringify(files));
        
        setImmediate(done);
        
        for (var fileName in files) {
            if (files.hasOwnProperty(fileName)) {
                console.log('\nFound file: ' + fileName);    
                var contents = files[fileName].contents.toString();
                
                console.log('Contents:\n' + contents);
                
                contents = contents.replace(/My Blog/, 'My Other Blog');
                
                files[fileName].contents = new Buffer(contents);
            };
        }
    };
};

Metalsmith(__dirname)
    .source('./src/')
    .destination('./build/')
    .use(markdown())
    .use(templates('handlebars'))
    .use(logger())
    .build(function(err, files) {
        console.log('Build function...');
        
        if (err) throw err;
        
        console.log('No error?');
        //console.log('Files: ' + JSON.stringify(files));
        console.log('Files:', Object.keys(files));
    });