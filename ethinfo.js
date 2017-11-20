const request = require('request');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/TyQelmM18AzWHSMN0GBP'));

var lastLine = "";

var blockNumber;

function getBN() {

	web3.eth.getBlockNumber()
		.then(function(bn) {

			blockNumber = bn;

		});
}
getBN();

setInterval(function() {
	getBN();

}, 3000);



// render...
setInterval(function() {


	line1 += 'ETH blockheight ' + blockNumber;

	var line2 = "";
	if (price_swt) {
		line2 += "SWT/EUR " + price_swt.price_eur + " ";
	}
	if (price_eth) {
		line2 += "ETH/EUR " + price_eth.price_eur + " ";
	}

	var newLine = line1 + line2;
	if (newLine != lastLine) {
		console.log(line1);
		console.log(line2); //.substring(0,15));
		lastLine = newLine;
	}

}, 250);



getPrice();

var price_swt;
var price_eth;

setInterval(function() {
	getPrice();
}, 60 * 1000);


function getPrice() {

	request('https://api.coinmarketcap.com/v1/ticker/swarm-city/?convert=EUR',
		(error, response, body) => {
			if (error || (response && response.statusCode !== 200)) {
				return
			}
			try {
				var parsedBody = JSON.parse(body);
				price_swt = {
					price_btc: parsedBody[0].price_btc,
					price_eur: Number(parsedBody[0].price_eur).toFixed(2),
					price_usd: Number(parsedBody[0].price_usd).toFixed(2),
					symbol: parsedBody[0].symbol,
				};
				console.log(price);
				//logger.info('updateFx result=', result);
				//return resolve(result);
			} catch (e) {
				//logger.error('updateFx err=', e);
				return;
			}
		});

	request('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=EUR',
		(error, response, body) => {
			if (error || (response && response.statusCode !== 200)) {
				return
			}
			try {
				var parsedBody = JSON.parse(body);
				price_eth = {
					price_btc: parsedBody[0].price_btc,
					price_eur: Number(parsedBody[0].price_eur).toFixed(2),
					price_usd: Number(parsedBody[0].price_usd).toFixed(2),
					symbol: parsedBody[0].symbol,
				};
				console.log(price);
				//logger.info('updateFx result=', result);
				//return resolve(result);
			} catch (e) {
				//logger.error('updateFx err=', e);
				return;
			}
		});

}
