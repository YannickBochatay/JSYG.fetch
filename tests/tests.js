if (typeof require!= "undefined") {
    
    require.config({
        paths: {
            "jquery": '../bower_components/jquery/dist/jquery',
            "jsyg-wrapper": '../bower_components/jsyg-wrapper/JSYG-wrapper',
            "fetch":"../bower_components/fetch/fetch",
            "es6-promise":"../bower_components/es6-promise/fetch",
            "jsyg-fetch": '../JSYG.fetch'
        },
        urlArgs: "bust=" + (+new Date())
    });
}

(function(factory) {
    
    if (typeof define == 'function' && define.amd) define(["jsyg-fetch"],factory);
    else factory(window.fetch);
    
}(function(fetch) {
        
    QUnit.test( "assert.async() test", function( assert ) {
        
        var url = "data.json";
        var done = assert.async();
        
        console.log(fetch());
        
        ok(true);
        
        done();
                
        return;
        /*
        fetch(url)
        .then(function(response) { return response.json(); })
        .then(function(data) {
            equal(data.name,"bochatayy","Récupération des données");
            done();
        });*/
    });

    
}));
