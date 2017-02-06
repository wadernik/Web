var xj = require('./xj.js');
var login = 'lageless';
var password = 'testpassword';
var commentText = 'This is test message, over';

var log = new xj(login, password, commentText);
log.loginFunction();
log.postComment();

