'use strict';

var request = require('request');
var cheerio = require('cheerio');

var getHttpDataYahoo = function (ticker, callbackSuccess, callbackError) {
	var url = 'https://finance.yahoo.com/quote/' + ticker;

	request(url, function (error, response, html) {
		if (!error) {
			var $ = cheerio.load(html);

			console.log('	getHttpData - Loaded for ' + ticker);

			$('.Trsdu\\(0\\.3s\\).Fw\\(b\\).Fz\\(36px\\).Mb\\(-4px\\).D\\(ib\\)').filter(function () {
				var data = $(this);
				callbackSuccess(ticker, data.text());
			})
		} else {
			callbackError(error, 404);
		}
	})
}

var getHttpDataInvesting = function (ticker, callbackSuccess, callbackError) {
	var parsedTicker = ticker.replace('_', '/').replace('!','?');
	var url = 'https://m.br.investing.com/' + parsedTicker;

	request({
		url: url,
		headers: {
			'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
		}
	},
	function (error, response, html) {
		if (!error && response.statusCode == 200) {
			var $ = cheerio.load(html);

			console.log('	getHttpDataInvesting - Loaded for ' + ticker);
			
			$('.quotesBoxTop').filter(function () {
				var data = $(this).find('span').first();
				callbackSuccess(ticker, data.text().replace(/[\r\n|\s] /g,''));
			})
		} else {
			callbackError(error, response.statusCode);
		}
	})
}

module.exports = {
	getHttpDataYahoo: getHttpDataYahoo,
	getHttpDataInvesting: getHttpDataInvesting
}
