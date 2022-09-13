// require('dotenv').config();
import fetch from "node-fetch"

// const writeData = () => {

// }


const getBinancePrices = async () => {
    await fetch('https://api.binance.com/api/v3/ticker/price')
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log('binance: ', data);
    })
    
}

const getKucoinPrices = async () => {
    await fetch('https://api.kucoin.com/api/v1/prices')
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log('Kucoin: ', data);
    })
}

const getBybitPrices = async () => {
    await fetch('https://api.bybit.com/v2/public/tickers')
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        console.log('Bybit: ', data.result); 
    })
    
}

getKucoinPrices()

/*const getFTXPrices = async () => {
    
}

const getGateIoPrices = async () => {
    
}

const getBittrexPrices = async () => {
    
}

const getHitBTCPrices = async () => {
    
}

const getHoubiPrices = async () => {
    
}



const getCoinexPrices = async () => {
    
}

const getPoloniexPrices = async () => {
    
}

const getBitgetPrices = async () => {
    
}
const getCryptoDotComPrices = async () => {
    
}
const getUpbitPrices = async () => {
    
}
const getBitfinexPrices = async () => {
    
}
const getCoinbasePrices = async () => {
    
}
const getMexcPrices = async () => {
    
}
const getKrakenPrices = async () => {
    
}
const getGeminiPrices = async () => {
    
}
const getCexIoPrices = async () => {
    
}*/
