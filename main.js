var http = require('http');
var https = require('https');
http.createServer(function(req, res) {
        var path = require('path');
        var uuid = req.url.toString().substr("/MinecraftSkins".length + 1).substring(0$
        console.log(uuid);
        var options = {host: 'api.mojang.com',port: 443,path: '/users/profiles/minecra$
        console.log('api.mojang.com/users/profiles/minecraft/' + uuid);
        var request = https.request(options, function(resy) {
                var data = '';
                resy.on('data', function(chunk) {
                        data += chunk;
                });
                resy.on('end', function() {
                        try {
                                console.log(data);
                                var json = JSON.parse(data);
                                getImageFromUUID(json.id, res);
                        } catch (err) {
                                console.log(uuid +' is not a valid name');
                                console.log(err + ' <> ' + data);
                                res.end();
                        }
                });
        });
        request.on('error', function(e) {
                console.log(e.message);
        });
        request.end();
}).listen(8080);
function getImageFromUUID(uuid, res) {
        console.log('started uuid match with ' + uuid);
        var options = {host: 'crafatar.com',port: 443,path: '/skins/' +uuid + '.png'};
        var request1 = https.request(options,function(resyy) {
                var data = '';
                resyy.on('data', function(chunk) {
                res.write(chunk);
                });
                resyy.on('end', function() {
                        res.write(data);
                        res.end();
                });
        });
        request1.on('error', function(e) {
                console.log(e.message);
        });
        request1.end();
}
