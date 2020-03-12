'use strict';

const https = require('https')
const cheerio = require('cheerio');

var getHttpDataInvesting = function (ticker, callbackSuccess, callbackError) {
	var parsedTicker = ticker.replace('_', '/').replace('!', '?');

	const options = {
		hostname: 'm.br.investing.com',
		port: 443,
		path: `/${parsedTicker}`,
		method: 'GET',
		headers: {
			'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
		}
	}

	const req = https.request(options, res => {
		console.log(`Request for ${ticker} completed. StatusCode: ${res.statusCode}`)

		res.on('data', html => {

			if (res.statusCode == 200)
			{
				var $ = cheerio.load(html);
	
				console.log(`** OK ** getHttpDataInvesting - Loaded for ${ticker}`);
	
				$('.quotesBoxTop').filter(function () {
					var data = $(this).find('span').first();
					callbackSuccess(ticker, data.text().replace(/[\r\n|\s] /g, ''));
				})
			} else {
				console.log(`Request result for ${ticker} was not successful. Resquest options:`)								
				console.log(options)
				callbackError('HTTP result request was not successful', res.statusCode);				
			}
		})
	})

	req.on('error', error => {
		console.log('HTTP request failed:');
		console.log(error);
		callbackError(error, 500)
	})

	req.end()
}

module.exports = {
	getHttpDataInvesting: getHttpDataInvesting
}
