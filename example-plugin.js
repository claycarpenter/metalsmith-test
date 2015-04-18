var logger = function() {
    return function(files, metalsmith, done) {
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