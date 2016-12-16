var http = require('http');
var request = require('request');
var querystring = require('querystring');
var cookieJar = request.jar();
var pool = new http.Agent({keepAlive : true});

var form = {
    'Login' : 'mylgor',
    'Password' : 'qwerty'
};

var formData = querystring.stringify(form);
var contentLength = formData.length;

var authOptions = {
    url : 'http://lageless-001-site1.htempurl.com/Login/Authen/',
    agent : pool,
    body : formData,
    jar: cookieJar,
    headers : {
        'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding' : 'gzip, deflate',
        'Accept-Language' : 'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4',
        'Cache-Control' : 'max-age=0',
        'Content-Length' : contentLength,
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Host' : 'lageless-001-site1.htempurl.com',
        'Origin' : 'http://lageless-001-site1.htempurl.com',
        'Referer' : 'http://lageless-001-site1.htempurl.com/Login/Authen',
        'User-Agent' : 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
    }
};



function callbck(error, response, body) {
    if (!error) {
        console.log("Header: " + JSON.stringify(response.headers));
        console.log("Body: " + JSON.stringify(response.body));
        console.log("Jar: " + JSON.stringify(cookieJar));
    }
}

var getFirstPageOpts = {
    url : 'http://lageless-001-site1.htempurl.com/book/1',
    jar : cookieJar
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log("Body: " + body);
        console.log("Cookie: " + JSON.stringify(cookieJar));
        console.log("Status: " + response.statusCode);
    }
}

request.post(authOptions, callbck);
request(getFirstPageOpts, callback);