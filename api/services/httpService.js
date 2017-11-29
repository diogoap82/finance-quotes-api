'use strict';

var request = require('request');
var cheerio = require('cheerio');

var getHttpDataYahoo = function(ticker, callbackSuccess, callbackError) {
	var url = 'https://finance.yahoo.com/quote/' + ticker;

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);

			console.log('	getHttpData - Loaded for ' + ticker);

			$('.Trsdu\\(0\\.3s\\).Fw\\(b\\).Fz\\(36px\\).Mb\\(-4px\\).D\\(ib\\)').filter(function(){
				var data = $(this);
				callbackSuccess(ticker, data.text());
			})
		} else {
			callbackError(error, 404);
		}
	})
}

var getHttpDataInvesting = function(ticker, callbackSuccess, callbackError) {
	var parsedTicker = ticker.replace('.', '/');
	var url = 'https://m.br.investing.com/' + parsedTicker;

	console.log(url);

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);

			console.log('	getHttpDataInvesting - Loaded for ' + ticker);

			$('.quotesBoxTop').filter(function(){
				var data = $(this).find('span').first();
				callbackSuccess(ticker, data.text());
			})			
		} else {
			callbackError(error, 404);
		}
	})
}

module.exports = {
	getHttpDataYahoo: getHttpDataYahoo,
	getHttpDataInvesting: getHttpDataInvesting
}
