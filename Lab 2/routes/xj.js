var http = require('http');
var request = require('request');
var cookieJar = request.jar();
var pool = new http.Agent({keepAlive : true});
var commentText = 'gachi is life';

var formData = 'username=lageless&userpass=testpassword&autologin=1&userlogin=Login';
var contentLength = formData.length;

var authOptions = {
    url : 'http://xtreme-jumps.eu/news.php',
    agent : pool,
    body : formData,
    jar: cookieJar,
    headers : {
        'Cache-Control' : 'max-age=0',
        'Content-Length' : contentLength,
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Host' : 'xtreme-jumps.eu',
        'Origin' : 'http://xtreme-jumps.eu',
        'Referer' : 'http://xtreme-jumps.eu/news.php',
        'User-Agent' : 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
    }
};

var getPageOptions = {
    url : "http://xtreme-jumps.eu/news.php?default.0.2163",
    agent : pool,
    jar : cookieJar
}

var commentFormData = 'subject=New+JumpCup+rule+%26+new+server+IPs&comment=' + commentText + '&helpb=&sizeselect=&e-token=e_TOKEN&commentsubmit=Submit+comment';
var queryParams = { 'comment.news.17' : ''};
var postCommentOptions = {
    url : 'http://xtremejumps.eu/comment.php?comment.news.17',
    agent : pool,
    jar : cookieJar,
    body : commentFormData,
    qs : queryParams,
    headers : {
        'Cache-Control' : 'max-age=0',
        'Content-Length' : commentFormData.length,
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Host' : 'xtreme-jumps.eu',
        'Origin' : 'http://xtreme-jumps.eu',
        'Referer' : 'http://xtreme-jumps.eu/comment.php?comment.news.17',
        'User-Agent' : 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
    }
};

function authCallback(error, response, body) {
    if (!error) {
        //console.log("Status: " + response.statusCode);
        console.log("Header1: " + JSON.stringify(response.headers));
        //console.log("Body1: " + body);
        console.log("Jar1: " + JSON.stringify(cookieJar));
    }
}

function getPageCallback(error, response, body) {
    if (!error) {
        console.log("Status1: " + response.statusCode);
        console.log("Header: " + JSON.stringify(response.headers));
        console.log("Jar: " + JSON.stringify(cookieJar));
    }
}

function getPage() {
    request.post(postCommentOptions, getPageCallback);
}

request.post(authOptions, authCallback);
//request(getPageOptions, callback);
//setTimeout(getPage, 3000);