// require('dotenv').config();
import fetch from "node-fetch"
import express from 'express';
import { google } from 'googleapis';
 
const app = express();

const spreadsheetId='1p08cv53Jwx06lOgDHHKS4tIzUV-rcirx01v3AlFJhwM'

app.get("/", async (req, res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    })

    const client = await auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: client });

    const metadata = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId
    });

    await getBinancePrices(auth, googleSheets, spreadsheetId)

    // await googleSheets.spreadsheets.values.append({
    //     auth,
    //     spreadsheetId: SPREADSHEET_ID,
    //     range: "Binance",
    //     valueInputOption: "USER_ENTERED",
    //     resource: {
    //         values: [["hola", "esot", 'probando']]
    //     }
    // })


    res.send(metadata.data)
})

app.listen(2500, (req, res) => console.log('Funciono en 2500'));

// const writeData = async () => {
//     await googleSheets.spreadsheets
// }   


const getBinancePrices = async (auth, googleSheets, spreadsheetId) => {
    await fetch('https://api.binance.com/api/v3/ticker/price')
    .then((res) => {
        return res.json();
    })
    .then(async (data) => {
        const googleData = [];

        // console.log('binance: ', data);
        data.forEach((e) => {
            googleData.push([e.symbol, e.price]);
            console.log('e: ', e);
        })
        console.log('googleData: ', googleData);
        await googleSheets.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: "Binance",
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [googleData]
            }
        })
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

// getKucoinPrices()

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
