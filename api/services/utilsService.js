'use strict';

var sendError = function(res, error, status) {
	if (status) {
		console.log('Error on the request. Message');
		console.log(error);	
		console.log('Details:');			
		console.log(res);
		res.status(status).end('Error: ' + error);
	} else {
		res.status(500).end(error);
	};
}

module.exports = {
	sendError: sendError,
}
