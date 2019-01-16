import React, { Component } from 'react'
import axios from 'axios'
import LineChart from '../chart'

class Main extends Component {
  constructor(props) {
		super()

    this.props = props
    // this.firstCurrency = 'BTC'
    // this.firstCurrency = 'ETH'
    this.firstCurrency = 'LTC'
    // this.firstCurrency = 'BCHABC'
    this.secondCurrency = 'USD'
    this.secondCurrencyT = 'USDT'
    this.start = 0
    this.end = 0
    this.limit = 250
    
    this.state = {
      average: false
    }

    this.binanceDifference = []
    this.okexDifference = []
    this.bitfinexDifference = []
    this.hitbtcDifference = []
    this.bitebtcDifference = []

    this.BTC = []
    this.ETH = []
    this.LTC = []
  }

  getBinanceData() {
    let pair = this.firstCurrency + this.secondCurrencyT
    let interval = '1h'
    return axios.get('https://api.binance.com/api/v1/klines?symbol=' + pair + '&interval=' + interval)
    .then(response => this.prepareBinanceData(response.data))
  }
  getBinanceDataBTC() {
    let pair = 'BTC' + this.secondCurrencyT
    let interval = '1h'
    return axios.get('https://api.binance.com/api/v1/klines?symbol=' + pair + '&interval=' + interval)
    .then(response => this.prepareBinanceData(response.data))
  }
  getBinanceDataETH() {
    let pair = 'ETH' + this.secondCurrencyT
    let interval = '1h'
    return axios.get('https://api.binance.com/api/v1/klines?symbol=' + pair + '&interval=' + interval)
    .then(response => this.prepareBinanceData(response.data))
  }
  getBinanceDataLTC() {
    let pair = 'LTC' + this.secondCurrencyT
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

  getBitebtcData() {
    let interval = '60'
    let pair = this.firstCurrency.toLowerCase() + '_' + this.secondCurrency.toLowerCase()
    return axios.get('https://bitebtc.com/api/v1/chart?market=' + pair + '&period=' + interval)
    .then(response => this.prepareBitebtcData(response.data))
  }
  getBitebtcDataBTC() {
    let interval = '60'
    let pair = 'btc_' + this.secondCurrency.toLowerCase()
    return axios.get('https://bitebtc.com/api/v1/chart?market=' + pair + '&period=' + interval)
    .then(response => this.prepareBitebtcData(response.data))
  }
  getBitebtcDataETH() {
    let interval = '60'
    let pair = 'eth_' + this.secondCurrency.toLowerCase()
    return axios.get('https://bitebtc.com/api/v1/chart?market=' + pair + '&period=' + interval)
    .then(response => this.prepareBitebtcData(response.data))
  }
  getBitebtcDataLTC() {
    let interval = '60'
    let pair = 'ltc_' + this.secondCurrency.toLowerCase()
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

  getAllCurencyChartData() {
    this.getBinanceData()
    .then(() => {
      axios.all([
        this.getBinanceDataBTC(),
        this.getBitebtcDataBTC(),
        this.getBinanceDataETH(),
        this.getBitebtcDataETH(),
        this.getBinanceDataLTC(),
        this.getBitebtcDataLTC()
      ])
      .then(axios.spread((binanceBTC, bitebtcBTC, binanceETH, bitebtcETH, binanceLTC, bitebtcLTC) => {
        console.log('length')

        if ((binanceBTC.length === bitebtcBTC.length) && (binanceETH.length === bitebtcETH.length) && (binanceLTC.length === bitebtcLTC.length) ) {
          for (let i = 0; i < binanceBTC.length; i++) {
            let binanceBTCItem = binanceBTC[i]
            let binanceETHItem = binanceETH[i]
            let binanceLTCItem = binanceLTC[i]
            let timestamp = binanceBTCItem.timestamp
  
            let bitebtcBTCItem = bitebtcBTC.find(item => item.timestamp === timestamp)
            let bitebtcETHItem = bitebtcETH.find(item => item.timestamp === timestamp)
            let bitebtcLTCItem = bitebtcLTC.find(item => item.timestamp === timestamp)

            if (bitebtcBTCItem && bitebtcETHItem && bitebtcLTCItem) {
              let time = new Date(timestamp).toLocaleString() 

              this.BTC.push({
                time: time,
                first_line: bitebtcBTCItem.open - binanceBTCItem.open,
                // second_line: bitebtcBTCItem.open,
                // thrid_line: binanceBTCItem.open
              })
              this.ETH.push({
                time: time,
                first_line: bitebtcETHItem.open - binanceETHItem.open,
                // second_line: bitebtcETHItem.open,
                // thrid_line: binanceETHItem.open
              })
              this.LTC.push({
                time: time,
                first_line: bitebtcLTCItem.open - binanceLTCItem.open,
                // second_line: bitebtcLTCItem.open,
                // thrid_line: binanceLTCItem.open
              })
            } else {
              console.error("Error! Timestamps not equals.")
              continue;
            }
          }

          this.setState({ showChart: true })
        } else {
          console.error("Error! Length of array not correct.")
          return;
        }
      }))
    })
  }

  getChartData() {
    return this.getBinanceData()
    .then(() => {
      axios.all([
        this.getBinanceData(),
        this.getBitfinexData(),
        this.getHitbtcData(),
        this.getBitebtcData(),
        this.getZNData()
        // this.getRightbtcData()

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
            let bitebtcItem = bitebtc[i]
            let bitfinexItem = bitfinex[i]
            let hitbtcItem = hitbtc[i]
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
  
  componentWillMount() {
    // this.getChartData()
    this.getAllCurencyChartData()
  }

  render() {
    let binanceChart = this.state.showChart ? <LineChart data={this.binanceDifference} ></LineChart> : ''
    let bitfinexChart = this.state.showChart ? <LineChart data={this.bitfinexDifference} ></LineChart> : ''
    let hitbtcChart = this.state.showChart ? <LineChart data={this.hitbtcDifference} ></LineChart> : ''
    let bitebtcChart = this.state.showChart ? <LineChart data={this.bitebtcDifference} ></LineChart> : ''

    let BTC = this.state.showChart ? <LineChart data={this.BTC} ></LineChart> : ''
    let ETH = this.state.showChart ? <LineChart data={this.ETH} ></LineChart> : ''
    let LTC = this.state.showChart ? <LineChart data={this.LTC} ></LineChart> : ''

    return (
      <div className="App">
        <h1>BiteBTC - Binance</h1>
        <h3>BTC</h3>
        {BTC}
        
        <h3>ETH</h3>
        {ETH}
        
        <h3>LTC</h3>
        {LTC}

        {/* <h1>{this.firstCurrency} USD </h1> */}
        {/* <h3>Binance</h3>
        {binanceChart}
        
        <h3>Bitfinex</h3>
        {bitfinexChart}

        <h3>HitBTC</h3>
        {hitbtcChart}

        <h3>BiteBTC</h3>
        {bitebtcChart} */}
      </div>
    )
  }
}

export default Main