import React, { Component } from 'react'
import axios from 'axios'
import LineChart from '../chart'

class Main extends Component {
  constructor(props) {
		super()

    this.props = props
    this.state = {
      chartData: []
    }
  }

  getBinanceData() {
    let pair = 'BTCUSDT'
    let interval = '1h'
    return axios.get('https://api.binance.com/api/v1/klines?symbol=' + pair + '&interval=' + interval)
    .then(response => this.prepareBinanceData(response.data))
  }

  prepareBinanceData(data) {
    let result = data.splice(data.length - 200, 200)
    return result.map(item => {
      return {
        timestamp: item[0],
        open: Number(item[1]),
        close: Number(item[4])
      }
    })
  }

  getOkexData() {
    let pair = 'btc-usdt'
    let interval = '3600'
    return axios.get('https://www.okex.com/api/spot/v3/instruments/' + pair + '/candles?granularity=' + interval)
    .then(response => this.prepareOkexData(response.data.reverse()))
  }

  prepareOkexData(data) {
    return data.map(item => {
      return {
        timestamp: new Date(item.time).getTime(),
        open: item.open,
        close: item.close
      }
    })
  }

  // getCexData() {
  //   // axios.post('https://cex.io/api/price_stats/XRP/USD', { lastHours: 24, maxRespArrSize: 24 }),
  //   return axios.get('https://cex.io/api/ohlcv/hd/20190114/XRP/USD')
  //   .then(response => this.prepareCexData(response.data))
  // }

  // prepareCexData(data) {
  //   let data1h = JSON.parse(data.data1h)
  //   // let result = data1h.splice(data1h.length - 24, data1h.length)
  //   return data1h.map(item => Number(item.splice(1,1)))
  // }

  componentWillMount() {
    axios.all([
      this.getBinanceData(),
      this.getOkexData(),
      // this.getCexData()
    ])
    .then(axios.spread((binance, okex, cex) => {
      let data = []

      if (binance.length === okex.length) {
        for (let i = 0; i < binance.length; i++) {
          let b = binance[i]
          let o = okex[i]
          if (b.timestamp === o.timestamp) {
            data.push({
              time: new Date(b.timestamp).toLocaleString(),
              bOpen: b.open,
              oOpen: o.open,
              bClose: b.close,
              oClose: o.close,
              openDifference: b.open - o.open,
              closeDifference: b.close - o.close
            })
          } else {
            console.error("Error! Timestamps not equals.")
            return;
          }
        }

        this.setState({ chartData: [...this.state.chartData, data] })
        this.setState({ showChart: true })
      } else {
        console.error("Error! Length of array not correct.")
        return;
      }
    }))
    .catch(error => console.log(error))
  }

  render() {
    let chart = this.state.showChart ? 
      <LineChart chartData={this.state.chartData} ></LineChart> : ''

    return (
      <div className="App">
        {chart}
      </div>
    )
  }
}

export default Main