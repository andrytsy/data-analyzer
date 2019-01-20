import React, { Component } from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

class SimpleLineChart extends Component {
  constructor(props) {
		super()

    this.chartData = props.data
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
          <Line type="monotone" dataKey="first_line" stroke="#FFA500" />
          <Line type="monotone" dataKey="second_line" stroke="#20B2AA" />
          <Line type="monotone" dataKey="thrid_line" stroke="#F0E68C" />
          <Line type="monotone" dataKey="fourth_line" stroke="#32CD32" />
          <Line type="monotone" dataKey="percent" stroke="red" />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}

export default SimpleLineChart;