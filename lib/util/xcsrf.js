const request = require('request');

module.exports = async function() {
    
    var newPromise = new Promise(function(resolve, reject) {
        request('https://api.roblox.com/sign-out/v1', {method:"POST", followAllRedirects:true, jar: global.jar}, function(e, r, body) {
            if (e) reject(e);
        //console.log(global.jar);
        var xcsrf_token = r.headers['x-csrf-token'];
        if (!xcsrf_token) throw new Error("Failed to get XCSRF token");
        global.xcsrf = xcsrf_token;
        resolve(xcsrf_token);
    })
    })
    return newPromise
}