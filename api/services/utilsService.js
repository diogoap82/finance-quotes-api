'use strict';

var sendError = function(res, error, status) {
	if (status) {
		res.status(status).end('Error: ' + error);
	} else {
		res.status(500).end(error);
	};
}

module.exports = {
	sendError: sendError,
}
