import React, { Component } from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

const data = [
  { date: 'Mon', Visits: 2200, Orders: 3400 },
  { date: 'Tue', Visits: 1280, Orders: 2398 },
  { date: 'Wed', Visits: 5000, Orders: 4300 },
  { date: 'Thu', Visits: 4780, Orders: 2908 },
  { date: 'Fri', Visits: 5890, Orders: 4800 },
  { date: 'Sat', Visits: 4390, Orders: 3800 },
  { date: 'Sun', Visits: 4490, Orders: 4300 },
];

class SimpleLineChart extends Component {
  constructor(props) {
		super()

    // this.props = props;
    this.chartData = props.chartData[0]
    console.log('PROPS', this.chartData)
  }
    
  render() {
    return (
      <ResponsiveContainer width="99%" height={320}>
        <LineChart data={this.chartData}>
          <XAxis dataKey="time" />
          <YAxis />
          <CartesianGrid vertical={false} strokeDasharray="1 1" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="openDifference" stroke="#82ca9d" />
          <Line type="monotone" dataKey="oOpen" stroke="#8884d8" activeDot={{ r: 5 }} />
          <Line type="monotone" dataKey="bOpen" stroke="#3CB371" activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default SimpleLineChart;