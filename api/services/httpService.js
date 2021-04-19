"use strict";

const cheerio = require("cheerio");
const fetch = require("node-fetch");

var getHttpDataInvesting = function (ticker, callbackSuccess, callbackError) {
  var parsedTicker = ticker.replace("_", "/").replace("!", "?");
  var url = `https://www.investing.com/${parsedTicker}`;
  const options = {
    method: "GET",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.66 Mobile Safari/537.36",
    },
  };

  fetch(url, options)
    .then((res) => {
      if (res.status == 200) {
        console.log(
          `Request for ${ticker} completed. StatusCode: ${res.status}`
        );

        res.text().then((body) => {
          console.log(`** OK ** - getHttpDataInvesting - Loaded for ${ticker} - URL: ${url}`);
          const $ = cheerio.load(body);
          var priceText = $('#last_last').text();

          if (priceText.length == 0) {
            console.log(`Cannot find price for ${ticker} with <#last_last> selector. Trying with <instrument-price-last>`);

            priceText = $('[data-test="instrument-price-last"]').text();

            if (priceText.length == 0) {
              console.log(`** ERROR *** - Cannot find price for ${ticker}`);
            }
          }
          callbackSuccess(ticker, priceText);
        });
      } else {
        const error = `Request for ${ticker} was not successful. URL: ${url}`;
        console.log(error);
        console.log("Request options:");
        console.log(options);
        callbackError(error, res.statusCode);
      }
    })
    .catch((err) => {
      console.log("HTTP request failed:");
      console.log(err);
      callbackError(err, 500);
    });
};

module.exports = {
  getHttpDataInvesting: getHttpDataInvesting,
};
