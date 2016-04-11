/**
 * Created by jmjeong on 2016. 4. 11..
 */

var http = require('http');
var formidable = require('formidable');
var request = require('request');
var config = require('./config.json');

function sendAnonMsg(req, res, fields, cb) {
    var payload = {
        "text": fields.text,
        "username": "anonymous",
        "channel" : '#'+fields.channel_name,
        "as_user": false,
        "link_names": 1
    };
    if (fields.channel_name == 'privategroup') payload.channel = config.public_channel;
    request({
        url: config.incoming_slack_webhook,
        method: "POST",
        json: payload
    }, function(err, response, body) {
        cb(response.statusCode, payload.channel);
    })
}

function onRequest(req, res) {
    if (req.url == '/' && req.method.toLowerCase() == 'post') {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            if (fields.token != config.slack_token) {
                res.end('Config error');
            }
            else {
                sendAnonMsg(req, res, fields, function(code, channel) {
                    if (code == 200) res.end('Anonymously sent "'+fields.text+'" to '+channel);
                    else res.end('Posting failed');
                });
            }
        });
    }
}

http.createServer(onRequest).listen(config.port||5000);
console.log('Starting service in port '+(config.port||5000));