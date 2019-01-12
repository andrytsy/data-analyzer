import React, { Component } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import LineChart from '../chart'


const styles = theme => ({
  submit: {
    width: '300px',
    marginTop: theme.spacing.unit * 3,
  },
})

class Main extends Component {
  constructor(props) {
		super()

    this.props = props
    this.state = {
      chartData: []
    }
  }

  // getBinanceData() {
  //   fetch('https://api.binance.com/api/v1/klines?symbol=ETHUSDT&interval=1h&startTime=1547154000000&endTime=1547236800000')
  //   .then(response => {
  //     if (response.status !== 200) {
  //       console.log('Looks like there was a problem. Status Code: ' + response.status)
  //       return
  //     }

  //     response.json().then(data => {
  //       this.bData = data.map(this.getAverage)
  //       console.log('Binance 1h', this.bData) 
  //     })
  //   })
  // }

  // getCEXData() {
  //   return fetch('https://cex.io/api/ohlcv/hd/20190111/ETH/USD')
  //   .then(response => {
  //     if (response.status !== 200) {
  //       console.log('Looks like there was a problem. Status Code: ' + response.status)  
  //       return  
  //     }

  //     response.json().then(data => {  
  //       let data1h = JSON.parse(data.data1h)
  //       let result = data1h.splice(data1h.length - 24, data1h.length)
  //       this.cData = result.map(this.getAverage)
  //       console.log('CEX 1h', this.cData) 
  //     })
  //   })
  // }

  // getData() {
  //   this.getBinanceData()
  //   this.getCEXData()
  // }

  prepareBinanceData(data) {
    return data.map(this.getAverage)
  }

  prepareCexData(data) {
    let data1h = JSON.parse(data.data1h)
    let result = data1h.splice(data1h.length - 24, data1h.length)
    return result.map(this.getAverage)
  }
  
  getAverage(arr) {
    let data = arr.splice(2,2)
    let max = Number(data[0])
    let min= Number(data[1])
    return (max + min) / 2
  }

  componentWillMount() {
    axios.all([
      axios.get('https://api.binance.com/api/v1/klines?symbol=ETHUSDT&interval=1h&startTime=1547154000000&endTime=1547236800000'),
      axios.get('https://cex.io/api/ohlcv/hd/20190111/ETH/USD')
    ])
    .then(axios.spread((binance, cex) => {
      let data = []
      let bData = this.prepareBinanceData(binance.data)
      let cData = this.prepareCexData(cex.data)

      for(let i = 0; i < 24; i++) {
        let tick = {
          hour: i,
          bPrice: bData[i],
          cPrice: cData[i]
        }
        data.push(tick)
      }

      console.log('data', data)
      this.setState({ chartData: [...this.state.chartData, data] })
      this.setState({ showChart: true })
    }))
    .catch(error => console.log(error))
  }

  render() {
    let chart = this.state.showChart ? 
      <LineChart chartData={this.state.chartData} ></LineChart> :
      ''

    return (
      <div className="App">
        {chart}
      </div>
    )
  }
}

export default withStyles(styles)(Main)