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