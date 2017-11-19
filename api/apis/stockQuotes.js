'use strict';

var http = require('../services/httpService');
var utils = require('../services/utilsService');

var getStockQuotes = function(tickers, callbackSuccess, callbackError) {
	if (tickers.length === 0) {
		utils.sendError(res, 'Inform at least one ticker', 400)
	}

	if (tickers.endsWith(';')) {
		tickers = tickers.substring(0, tickers.length - 1);
	}

	//Split the tickers into a dictionay and create a dictionary from it
	var tickersArray = tickers.split(';');
	var tickersList = {};
	for (var i = 0; i < tickersArray.length; i++) {
		tickersList[tickersArray[i]] = null;
	}

	var stocksDone = 0;

	for (var ticker in tickersList) {
		console.log('Retrieving data for ticker ' + ticker);

		http.getHttpData(ticker,
			function(tickerRes, lastPriceRes) {
				console.log('Data returned for ticker ' + tickerRes + ' - Last price: ' + lastPriceRes);
				tickersList[tickerRes] = lastPriceRes;
				stocksDone++;

				if (stocksDone === Object.keys(tickersList).length) {
					callbackSuccess(tickersList);
				}
			},
			function(error, status) {
				callbackError(error, status);
			}
		)
	};
}

module.exports = function(app) {

	app.get('/api/status', function(req, res) {
		res.json('ok');
	})

    app.get('/api/stock/quotes/csv/:id', function(req, res) {
		getStockQuotes(req.params.id,
			function(result){
				res.set('Content-Type', 'application/octet-stream');
				res.setHeader('Content-disposition', 'attachment; filename=quotes.csv');
				res.send(Object.values(result).join(';'));
			},
			function(error, status) {
				utils.sendError(res, error, status);
			}
		 );
	})

    app.get('/api/stock/quotes/:id', function(req, res) {
		getStockQuotes(req.params.id,
			function(result){
				res.json(result);
			},
			function(error, status) {
				utils.sendError(res, error, status);
			}
		 );
    })
}
