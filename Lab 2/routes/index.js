var http = require('http');
var request = require('request');
var querystring = require('querystring');
var cookieJar = request.jar();
var pool = new http.Agent({keepAlive : true});

var authForm = {
    'Login' : 'mylgor',
    'Password' : 'qwerty'
};

var postForm = {
    'book.BookID' : '1',
    'tempComment' : 'This is node js test message'
};

var authFormData = querystring.stringify(authForm);
var postFormData = querystring.stringify(postForm);

/* Options for request */

var authOptions = {
    url : 'http://lageless-001-site1.htempurl.com/Login/Authen/',
    agent : pool,
    body : authFormData,
    jar: cookieJar,
    headers : {
        'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding' : 'gzip, deflate',
        'Accept-Language' : 'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4',
        'Cache-Control' : 'max-age=0',
        'Content-Length' : authFormData.length,
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Host' : 'lageless-001-site1.htempurl.com',
        'Origin' : 'http://lageless-001-site1.htempurl.com',
        'Referer' : 'http://lageless-001-site1.htempurl.com/Login/Authen',
        'User-Agent' : 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
    }
};

var getFirstPageOptions = {
    url : 'http://lageless-001-site1.htempurl.com',
    jar : cookieJar,
    agent : pool,
    gzip : true
};

var postCommentOptions = {
    url : 'http://lageless-001-site1.htempurl.com/BDetail/PostComment',
    agent : pool,
    formData : postFormData,
    jar : cookieJar,
    headers : {
        'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding' : 'gzip, deflate',
        'Accept-Language' : 'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4',
        'Cache-Control' : 'max-age=0',
        'Content-Length' : postFormData.length,
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Host' : 'lageless-001-site1.htempurl.com',
        'Origin' : 'http://lageless-001-site1.htempurl.com',
        'Referer' : 'http://lageless-001-site1.htempurl.com/Login/Authen',
        'User-Agent' : 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
    }
};

/* Loggers */

function loginConsoleLog(error, response, body) {
    if (!error) {
        console.log("Header: " + JSON.stringify(response.headers));
        console.log("Body: " + body);
    }
}

function firstPageConsoleLog(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log("Body: " + body);
        console.log("Status: " + response.statusCode);
    }
}

function callback(error, response, body) {
    console.log("Header: " + JSON.stringify(response.headers));
    console.log("Response: " + response.statusCode);
}



/* Requests */

request.post(authOptions);
//request(getFirstPageOptions, firstPageConsoleLog);
request.post(postCommentOptions);