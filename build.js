var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates');

Metalsmith(__dirname)
    .source('./src/')
    .destination('./output/')
    .use(markdown())
    .use(templates('handlebars'))
    .build(function(err, files) {
        console.log('Build function...');
        
        if (err) throw err;
        
        console.log('No error?');
        //console.log('Files: ' + JSON.stringify(files));
        console.log('Files:', Object.keys(files));
    });