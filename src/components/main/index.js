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
    this.BCHABC = []

    this.btcethDifference = 0
    this.btcltcDifference = 0
    this.ethltcDifference = 0
    this.btcbchDifference = 0

    this.binanceInterval = '5m'
    this.biteInterval = '5'
  }

  getBinanceData() {
    let pair = this.firstCurrency + this.secondCurrencyT
    return axios.get('https://api.binance.com/api/v1/klines?symbol=' + pair + '&interval=' + this.binanceInterval)
    .then(response => this.prepareBinanceData(response.data))
  }
  getBinanceDataBTC() {
    let pair = 'BTC' + this.secondCurrencyT
    return axios.get('https://api.binance.com/api/v1/klines?symbol=' + pair + '&interval=' + this.binanceInterval)
    .then(response => this.prepareBinanceData(response.data))
  }
  getBinanceDataETH() {
    let pair = 'ETH' + this.secondCurrencyT
    return axios.get('https://api.binance.com/api/v1/klines?symbol=' + pair + '&interval=' + this.binanceInterval)
    .then(response => this.prepareBinanceData(response.data))
  }
  getBinanceDataLTC() {
    let pair = 'LTC' + this.secondCurrencyT
    return axios.get('https://api.binance.com/api/v1/klines?symbol=' + pair + '&interval=' + this.binanceInterval)
    .then(response => this.prepareBinanceData(response.data))
  }
  getBinanceDataBCHABC() {
    let pair = 'BCHABC' + this.secondCurrencyT
    return axios.get('https://api.binance.com/api/v1/klines?symbol=' + pair + '&interval=' + this.binanceInterval)
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
    let pair = this.firstCurrency.toLowerCase() + '_' + this.secondCurrency.toLowerCase()
    return axios.get('https://bitebtc.com/api/v1/chart?market=' + pair + '&period=' + this.biteInterval)
    .then(response => this.prepareBitebtcData(response.data))
  }
  getBitebtcDataBTC() {
    let pair = 'btc_' + this.secondCurrency.toLowerCase()
    return axios.get('https://bitebtc.com/api/v1/chart?market=' + pair + '&period=' + this.biteInterval)
    .then(response => this.prepareBitebtcData(response.data))
  }
  getBitebtcDataETH() {
    let pair = 'eth_' + this.secondCurrency.toLowerCase()
    return axios.get('https://bitebtc.com/api/v1/chart?market=' + pair + '&period=' + this.biteInterval)
    .then(response => this.prepareBitebtcData(response.data))
  }
  getBitebtcDataLTC() {
    let pair = 'ltc_' + this.secondCurrency.toLowerCase()
    return axios.get('https://bitebtc.com/api/v1/chart?market=' + pair + '&period=' + this.biteInterval)
    .then(response => this.prepareBitebtcData(response.data))
  }
  getBitebtcDataBCHABC() {
    let pair = 'bchabc_' + this.secondCurrency.toLowerCase()
    return axios.get('https://bitebtc.com/api/v1/chart?market=' + pair + '&period=' + this.biteInterval)
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
    let pair = this.firstCurrency + this.secondCurrency
    return axios.get('https://api.bitfinex.com/v2/candles/trade:' + this.binanceInterval + ':t' + pair + '/hist?limit=' + this.limit + '&start=' + this.start + '&end=' + this.end + '&sort=-1')
    .then(response => this.prepareBitfinexData(response.data.reverse()))
  }
  // getBitfinexDataBTC() {
  //   let pair = 'BTC' + this.secondCurrency
  //   return axios.get('https://api.bitfinex.com/v2/candles/trade:' + this.binanceInterval + ':t' + pair + '/hist?limit=' + this.limit + '&start=' + this.start + '&end=' + this.end + '&sort=-1')
  //   .then(response => this.prepareBitfinexData(response.data.reverse()))
  // }
  // getBitfinexDataETH() {
  //   let pair = 'ETH' + this.secondCurrency
  //   return axios.get('https://api.bitfinex.com/v2/candles/trade:' + this.binanceInterval + ':t' + pair + '/hist?limit=' + this.limit + '&start=' + this.start + '&end=' + this.end + '&sort=-1')
  //   .then(response => this.prepareBitfinexData(response.data.reverse()))
  // }
  // getBitfinexDataLTC() {
  //   let pair = 'LTC' + this.secondCurrency
  //   return axios.get('https://api.bitfinex.com/v2/candles/trade:' + this.binanceInterval + ':t' + pair + '/hist?limit=' + this.limit + '&start=' + this.start + '&end=' + this.end + '&sort=-1')
  //   .then(response => this.prepareBitfinexData(response.data.reverse()))
  // }
  // getBitfinexDataBCHABC() {
  //   let pair = 'BCHABC' + this.secondCurrency
  //   return axios.get('https://api.bitfinex.com/v2/candles/trade:' + this.binanceInterval + ':t' + pair + '/hist?limit=' + this.limit + '&start=' + this.start + '&end=' + this.end + '&sort=-1')
  //   .then(response => this.prepareBitfinexData(response.data.reverse()))
  // }
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
    return this.getBinanceData()
    .then(() => {
      axios.all([
        this.getBinanceDataBTC(),
        this.getBitebtcDataBTC(),
        this.getBinanceDataETH(),
        this.getBitebtcDataETH(),
        this.getBinanceDataLTC(),
        this.getBitebtcDataLTC(),
        this.getBinanceDataBCHABC(),
        this.getBitebtcDataBCHABC()


      ])
      .then(axios.spread((binanceBTC, bitebtcBTC, binanceETH, bitebtcETH, binanceLTC, bitebtcLTC, binanceBCHABC, bitebtcBCHABC) => {
        console.log('length')

        if ((binanceBTC.length === bitebtcBTC.length) && (binanceETH.length === bitebtcETH.length) && (binanceLTC.length === bitebtcLTC.length) && (binanceBCHABC.length === bitebtcBCHABC.length)) {
          for (let i = 0; i < binanceBTC.length; i++) {
            let binanceBTCItem = binanceBTC[i]
            let binanceETHItem = binanceETH[i]
            let binanceLTCItem = binanceLTC[i]
            let binanceBCHABCItem = binanceBCHABC[i]
            let timestamp = binanceBTCItem.timestamp
  
            let bitebtcBTCItem = bitebtcBTC.find(item => item.timestamp === timestamp)
            let bitebtcETHItem = bitebtcETH.find(item => item.timestamp === timestamp)
            let bitebtcLTCItem = bitebtcLTC.find(item => item.timestamp === timestamp)
            let bitebtcBCHABCItem = bitebtcBCHABC.find(item => item.timestamp === timestamp)

            if (bitebtcBTCItem && bitebtcETHItem && bitebtcLTCItem && bitebtcBCHABCItem) {
              let time = new Date(timestamp).toLocaleString() 

              this.BTC.push({
                time: time,
                first_line: bitebtcBTCItem.open - binanceBTCItem.open,
                percent: ((bitebtcBTCItem.open - binanceBTCItem.open) * 100) / bitebtcBTCItem.open
                // second_line: bitebtcBTCItem.open,
                // thrid_line: binanceBTCItem.open
              })
              this.ETH.push({
                time: time,
                first_line: bitebtcETHItem.open - binanceETHItem.open,
                percent: ((bitebtcETHItem.open - binanceETHItem.open) * 100) / bitebtcETHItem.open
                // second_line: bitebtcETHItem.open,
                // thrid_line: binanceETHItem.open
              })
              this.LTC.push({
                time: time,
                first_line: bitebtcLTCItem.open - binanceLTCItem.open,
                percent: ((bitebtcLTCItem.open - binanceLTCItem.open) * 100) / bitebtcLTCItem.open
                // second_line: bitebtcLTCItem.open,
                // thrid_line: binanceLTCItem.open
              })
              this.BCHABC.push({
                time: time,
                first_line: bitebtcBCHABCItem.open - binanceBCHABCItem.open,
                percent: ((bitebtcBCHABCItem.open - binanceBCHABCItem.open) * 100) / bitebtcBCHABCItem.open
                // second_line: bitebtcBCHABCItem.open,
                // thrid_line: binanceBCHABCItem.open
              })

              this.btcethDifference = this.BTC[this.BTC.length - 1].percent - this.ETH[this.ETH.length - 1].percent
              this.btcltcDifference = this.BTC[this.BTC.length - 1].percent - this.LTC[this.LTC.length - 1].percent
              this.ethltcDifference = this.ETH[this.ETH.length - 1].percent - this.LTC[this.LTC.length - 1].percent
              this.btcbchDifference = this.BTC[this.BTC.length - 1].percent - this.BCHABC[this.BCHABC.length - 1].percent
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
  
  beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");  
    setInterval(() => {
      snd.play();
    }, 5000)
  }

  getTextColor(num) {
    if (num < 1)
      return 'black'
    else if (num >= 1 && num < 1.5)
      return 'green'
    else if (num >= 1.5 && num < 2)
      return 'orange'
    else 
      return 'red'
  }

  componentWillMount() {
    this.initApp()
  }

  initApp() {
    this.setState({ showChart: false })
    this.BTC.length = 0
    this.ETH.length = 0
    this.LTC.length = 0
    this.BCHABC.length = 0

    // this.getChartData()
    this.getAllCurencyChartData()
    .then(() => {
      if (Math.abs(this.btcethDifference) >= 1.5 || Math.abs(this.btcltcDifference) >= 1.5 || Math.abs(this.ethltcDifference) >= 1.5 || Math.abs(this.btcbchDifference) >= 1.5)
        this.beep()

      setTimeout(() => {
        this.initApp()
      }, 300000)
    })
  }

  render() {
    // let binanceChart = this.state.showChart ? <LineChart data={this.binanceDifference} ></LineChart> : ''
    // let bitfinexChart = this.state.showChart ? <LineChart data={this.bitfinexDifference} ></LineChart> : ''
    // let hitbtcChart = this.state.showChart ? <LineChart data={this.hitbtcDifference} ></LineChart> : ''
    // let bitebtcChart = this.state.showChart ? <LineChart data={this.bitebtcDifference} ></LineChart> : ''

    let BTC = this.state.showChart ? <LineChart data={this.BTC} ></LineChart> : ''
    let ETH = this.state.showChart ? <LineChart data={this.ETH} ></LineChart> : ''
    let LTC = this.state.showChart ? <LineChart data={this.LTC} ></LineChart> : ''
    let BCHABC = this.state.showChart ? <LineChart data={this.BCHABC} ></LineChart> : ''

    return (
      <div className="App">
        <h1>BiteBTC - Binance</h1>
        <h2>BTC - ETH = <span >{this.btcethDifference}</span> | BTC - LTC = {this.btcltcDifference} | BTC - BCHABC = {this.btcbchDifference} | ETH - LTC = {this.ethltcDifference}</h2>
        <h3>BTC</h3>
        {BTC}
        
        <h3>ETH</h3>
        {ETH}
        
        <h3>LTC</h3>
        {LTC}

        <h3>BCHABC</h3>
        {BCHABC}

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