import React, { Component } from 'react'
import axios from 'axios'
import LineChart from '../chart'

class Main extends Component {
  constructor(props) {
		super()

    this.props = props
    this.firstCurrency = 'BTC'
    this.secondCurrency = 'USD'
    this.secondCurrencyT = 'USDT'
    this.start = 0
    this.end = 0
    this.limit = 96
    
    this.state = {
      average: false
    }

    this.binanceDifference = []
    this.okexDifference = []
    this.bitfinexDifference = []
    this.hitbtcDifference = []
    this.bitebtcDifference = []
  }

  getBinanceData() {
    let pair = this.firstCurrency + this.secondCurrencyT
    let interval = '1h'
    return axios.get('https://api.binance.com/api/v1/klines?symbol=' + pair + '&interval=' + interval)
    .then(response => this.prepareBinanceData(response.data))
  }
  prepareBinanceData(data) {
    let result = data.splice(data.length - this.limit, this.limit)
    this.start = result[0][0]
    this.end = result[result.length-1][0]
    return result.map(item => {
      return {
        timestamp: item[0],
        open: Number(item[1]),
        close: Number(item[4])
      }
    })
  }

  getBitfinexData() {
    let interval = '1h'
    let pair = this.firstCurrency + this.secondCurrency
    return axios.get('https://api.bitfinex.com/v2/candles/trade:' + interval + ':t' + pair + '/hist?limit=' + this.limit + '&start=' + this.start + '&end=' + this.end + '&sort=-1')
    .then(response => this.prepareBitfinexData(response.data.reverse()))
  }
  prepareBitfinexData(data) {
    return data
      .filter(item => new Date(item[0]).getMinutes() === 0)
      .map(item => {
        return {
          timestamp: item[0],
          open: Number(item[1]),
          close: Number(item[2])
        }
      })
  }

  getHitbtcData() {
    let interval = 'H1'
    let pair = this.firstCurrency + this.secondCurrency
    return axios.get('https://api.hitbtc.com/api/2/public/candles/' + pair + '?period=' + interval + '&limit=' + this.limit)
    .then(response => this.prepareHitbtcData(response.data))
  }
  prepareHitbtcData(data) {
    return data
      .map(item => {
        return {
            timestamp: new Date(item.timestamp).getTime(),
            open: Number(item.open),
            close: Number(item.close)
        }
      })
  }

  getBitebtcData() {
    let interval = '60'
    let pair = this.firstCurrency.toLowerCase() + '_' + this.secondCurrency.toLowerCase()
    return axios.get('https://bitebtc.com/api/v1/chart?market=' + pair + '&period=' + interval)
    .then(response => this.prepareBitebtcData(response.data))
  }
  prepareBitebtcData(data) {
    let result = data.result.splice(data.length - this.limit, this.limit)
    return result.reverse()
      .map(item => {
        return {
          timestamp: item.timestamp * 1000,
          open: Number(item.open),
          close: Number(item.close)
        }
      })
  }

  getRightbtcData() {
    let interval = 'hr1'
    let pair = this.firstCurrency + this.secondCurrency 
    return axios.get('https://www.rightbtc.com/api/public/candlestick/' + interval + '/' + pair + '/' + (this.limit - 1))
    .then(response => this.prepareRightbtcData(response.data))
  }
  prepareRightbtcData(data) {
    return data.result.reverse()
      .map(item => {
        return {
            timestamp: item[0],
            open: Number(item[2]) / 100000000,
            close: Number(item[5]) / 100000000
        }
      })
  }

  getZNData() {
    let interval = '1hour'
    let pair = this.firstCurrency.toLowerCase() + '_' + this.secondCurrencyT.toLowerCase()
    return axios.get('http://api.zb.cn/data/v1/kline?market=' + pair + '&size=' + this.limit + '&type=' + interval)
    .then(response => this.prepareZNData(response.data))
  }
  prepareZNData(data) {
    return data.data
      .map(item => {
        return {
          timestamp: item[0],
          open: Number(item[1]),
          close: Number(item[4])
        }
      })
  }
  // 
  // getIdaxData() {
  //   let interval = '1hour'
  //   let pair = this.firstCurrency + '_' + this.secondCurrencyT
  //   return axios.get('https://openapi.idax.pro/api/v2/kline?pair=' + pair + '&period=' + interval + '&size=' + this.limit)
  //   .then(response => this.prepareIdaxData(response.data))
  // }
  // prepareIdaxData(data) {
  //   return data.kline
  //     .map(item => {
  //       return {
  //           timestamp: item[0],
  //           open: Number(item[1]),
  //           close: Number(item[4])
  //       }
  //     })
  // }
  // getUexData() {
  //   let interval = '60'
  //   let pair = this.firstCurrency.toLowerCase() + this.secondCurrencyT.toLowerCase()
  //   return axios.get('https://open-api.uex.com/open/api/get_records?symbol=' + pair + '&period=' + interval)
  //   .then(response => this.prepareUexData(response.data))
  // }
  // prepareUexData(data) {
  //   let result = data.data.splice(data.data.length - (this.limit - 1), (this.limit - 1))
  //   return result
  //     .map(item => {
  //       return {
  //         timestamp: item[0] * 1000,
  //         open: Number(item[1]),
  //         close: Number(item[4])
  //       }
  //     })
  // }
  // 
  // getBitmartData() {
  //   let interval = '60'
  //   // let pair = '53'
  //   let pair = '55'
  //   return axios.get('https://openapi.bitmart.com/market/kline?symbol=' + pair + '&step=' + interval + '&from=' + (this.start/1000) + '&to=' + (this.end/1000))
  //   .then(response => this.prepareBitmartData(response.data))
  // }
  // 
  // prepareBitmartData(data) {
  //   let result = []
  // 
  //   for(let i = 0; i < data.t.length; i++) {
  //     result.push({
  //       timestamp: data.t[i] * 1000,
  //       open: Number(data.o[i]),
  //       close: Number(data.c[i])
  //     })
  //   }
  // 
  //   return result
  // }
  // 
  // getOkexData() {
  //   let pair = this.firstCurrency.toLowerCase() + '-' + this.secondCurrencyT.toLowerCase()
  //   let interval = '3600'
  //   return axios.get('https://www.okex.com/api/spot/v3/instruments/' + pair + '/candles?granularity=' + interval)
  //   .then(response => this.prepareOkexData(response.data.reverse()))
  // }
  // 
  // prepareOkexData(data) {
  //   return data
  //   .filter(item => new Date(item.time).getTime() >= this.start)
  //   .map(item => {
  //     return {
  //       timestamp: new Date(item.time).getTime(),
  //       open: item.open,
  //       close: item.close
  //     }
  //   })
  // }
  // 
  // getKrakenData() {
  //   let interval = '60'
  //   let pair = this.firstCurrency + this.secondCurrency
  //   return axios.get('https://api.kraken.com/0/public/OHLC?pair=' + pair + '&interval=' + interval)
  //   .then(response => this.prepareKrakenData(response.data))
  // }
  // 
  // prepareKrakenData(data) {
  //   let test = data.result["XLTCZUSD"].splice(data.result["XLTCZUSD"].length - this.limit, this.limit)
  //   return test.map(item => {
  //     return {
  //       timestamp: item[0] * 1000,
  //       open: Number(item[1]),
  //       close: Number(item[4])
  //     }
  //   })
  // }
  // 
  // getPoloniexData() {
  //   let pair = 'USDT_' + this.firstCurrency
  //   let interval = '1800'
  //   let start = this.start / 1000
  //   return axios.get('https://poloniex.com/public?command=returnChartData&currencyPair=' + pair + '&period=' + interval + '&start=' + start + '&end=9999999999')
  //   .then(response => this.preparePoloniexData(response.data))
  // }
  // 
  // preparePoloniexData(data) {
  //   return data
  //     .filter(item => new Date(item.date * 1000).getMinutes() === 0)
  //     .map(item => {
  //       return {
  //         timestamp: item.date * 1000,
  //         open: item.open,
  //         close: item.close
  //       }
  //     })
  // }
  // 
  // getCexData() {
  //   // axios.post('https://cex.io/api/price_stats/XRP/USD', { lastHours: 24, maxRespArrSize: 24 }),
  //   return axios.get('https://cex.io/api/ohlcv/hd/20190115/XRP/USD')
  //   .then(response => this.prepareCexData(response.data))
  // }
  // 
  // prepareCexData(data) {
  //   let data1h = JSON.parse(data.data1h)
  //   // let result = data1h.splice(data1h.length - 24, data1h.length)
  //   return data1h.map(item => Number(item.splice(1,1)))
  // }

  componentWillMount() {
    this.getBinanceData()
    .then(() => {
      axios.all([
        this.getBinanceData(),
        this.getBitfinexData(),
        this.getHitbtcData(),
        this.getBitebtcData(),
        // this.getRightbtcData()

        this.getZNData()
        // this.getIdaxData(),
        // this.getUexData()
        // this.getOkexData(),
        // this.getBitmartData(),
        // this.getKrakenData(),
        // this.getPoloniexData(),
        // this.getCexData()
      ])
      .then(axios.spread((binance, bitfinex, hitbtc, bitebtc, uex) => {
        // binance.pop()
        // bitfinex.pop()
        // hitbtc.pop()
        // bitebtc.pop()
        let length = binance.length
        console.log('length')
  
        if ((length === bitfinex.length) && (length === hitbtc.length) && (length === bitebtc.length) && (length === uex.length)) {
          for (let i = 0; i < binance.length; i++) {
            let binanceItem = binance[i]
            let bitfinexItem = bitfinex[i]
            let hitbtcItem = hitbtc[i]
            let bitebtcItem = bitebtc[i]
            let uexItem = uex[i]
            let timestamp = binanceItem.timestamp
  
            if ((timestamp === bitfinexItem.timestamp) && (timestamp === hitbtcItem.timestamp) && (timestamp === bitebtcItem.timestamp)) {
              let time = new Date(binanceItem.timestamp).toLocaleString() 
              
              this.binanceDifference.push({
                time: time,
                first_line: binanceItem.open - bitfinexItem.open,
                second_line: binanceItem.open - hitbtcItem.open,
                thrid_line: binanceItem.open - bitebtcItem.open,
                fourth_line: binanceItem.open - uexItem.open
              })
  
              this.bitfinexDifference.push({
                time: time,
                first_line: bitfinexItem.open - binanceItem.open,
                second_line: bitfinexItem.open - hitbtcItem.open,
                thrid_line: bitfinexItem.open - bitebtcItem.open,
                fourth_line: bitfinexItem.open - uexItem.open
              })
  
              this.hitbtcDifference.push({
                time: time,
                first_line: hitbtcItem.open - binanceItem.open,
                second_line: hitbtcItem.open - bitfinexItem.open,
                thrid_line: hitbtcItem.open - bitebtcItem.open,
                fourth_line: hitbtcItem.open - uexItem.open
              })

              this.bitebtcDifference.push({
                time: time,
                first_line: bitebtcItem.open - binanceItem.open,
                second_line: bitebtcItem.open - bitfinexItem.open,
                thrid_line: bitebtcItem.open - hitbtcItem.open,
                fourth_line: bitebtcItem.open - uexItem.open
              })
  
            } else {
              console.error("Error! Timestamps not equals.")
              return;
            }
          }
  
          this.setState({ showChart: true })
        } else {
          console.error("Error! Length of array not correct.")
          return;
        }
      }))
      .catch(error => console.log(error))
    })
  }

  render() {
    let binanceChart = this.state.showChart ? <LineChart data={this.binanceDifference} ></LineChart> : ''
    let bitfinexChart = this.state.showChart ? <LineChart data={this.bitfinexDifference} ></LineChart> : ''
    let hitbtcChart = this.state.showChart ? <LineChart data={this.hitbtcDifference} ></LineChart> : ''
    let bitebtcChart = this.state.showChart ? <LineChart data={this.bitebtcDifference} ></LineChart> : ''

    return (
      <div className="App">
        <h1>{this.firstCurrency} USD </h1>
        <h3>Binance</h3>
        {binanceChart}

        <h3>Bitfinex</h3>
        {bitfinexChart}

        <h3>HitBTC</h3>
        {hitbtcChart}

        <h3>BiteBTC</h3>
        {bitebtcChart}
      </div>
    )
  }
}

export default Main