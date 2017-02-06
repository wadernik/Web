var http = require('http');
var request = require('request');
var cheerio = require('cheerio');
var cookieJar = request.jar();

var pool = new http.Agent({keepAlive : true});

var xjSolution = function(username, password, commentText) {
    var self = this;
    var commentFormData = 'subject=New+JumpCup+rule+%26+new+server+IPs&comment=' + commentText + '&helpb=&sizeselect=&e-token=e_TOKEN&commentsubmit=Submit+comment';
    var queryParams = { 'comment.news.17' : ''};

    self.loginFunction =  function() {
        var formatData = 'username=' + username + '&userpass=' + password + '&autologin=1&userlogin=Login';
        var authOptions = {
            url : 'http://xtreme-jumps.eu/news.php',
            agent : pool,
            body : formatData,
            jar: cookieJar,
            headers : {
                'Cache-Control' : 'max-age=0',
                'Content-Length' : formatData.length,
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Host' : 'xtreme-jumps.eu',
                'Origin' : 'http://xtreme-jumps.eu',
                'Referer' : 'http://xtreme-jumps.eu/news.php',
                'User-Agent' : 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
            }
        };
        request.post(authOptions, authCallback);
    };

    self.postComment = function () {
        getTargetPageLink(function (uri) {
            getCommentPage(uri, function (data) {
                var postCommentOptions = {
                    url : data,
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
                request.post(postCommentOptions, postCommentCallback);
            })
        })
    }
};

module.exports = xjSolution;

var getTargetPageOptions = {
    url : "http://xtreme-jumps.eu/",
    agent : pool,
    jar : cookieJar,
    headers : {
        'Host' : 'xtreme-jumps.eu',
        'Origin' : 'http://xtreme-jumps.eu',
        'Referer' : 'http://xtreme-jumps.eu/news.php',
        'User-Agent' : 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
    }
};

function authCallback(error, response, body) {
    if (!error) {
        console.log("Header: " + JSON.stringify(response.headers));
        console.log("Jar: " + JSON.stringify(cookieJar));
        //console.log("Body: " + body);
    }
}

function getTargetPageLink(callback) {
    request(getTargetPageOptions, function (error, response, body) {
        if (!error) {
            var $ = cheerio.load(body);
            var str = $('.nextprev a:last-child').text();
            var linkToTargetPage = 'http://xtreme-jumps.eu/news.php?default.0.'+(str * 7-21);
            console.log(linkToTargetPage);
            callback(linkToTargetPage);
        }
    });
}

function getCommentPage(uri, callback) {
    request({url: uri, agent: pool, jar : cookieJar}, function (error, response, body) {
        if (!error) {
            var $ = cheerio.load(body);
            var str = $('.news-comments.smalltext.right-content a').first().attr('href');
            var linkToCommentPage = 'http://xtreme-jumps.eu' + str;
            console.log(linkToCommentPage);
            callback(linkToCommentPage);
        }
    });
}

function postCommentCallback(error, response, body) {
    console.log("Error status: " + error);
}