import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios'
import './App.css';
import Binance from 'binance-api-node'

const client = Binance()
const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    width: '300px',
    marginTop: theme.spacing.unit * 3,
  },
});

class App extends Component {
  constructor(props) {
		super()

		this.props = props;
	}
  render() {
    return (
      <div className="App">
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={this.props.classes.submit}
          onClick={this.checkConnection.bind(this)}
        >
          Check
        </Button>
      </div>
    );
  }

  checkConnection() {
    client.time().then(time => console.log(time))
    // fetch('https://api.binance.com/api/v1/time', {
    //   method: 'get',
    //   mode: 'no-cors',
    // }).then((response, test) => {
    //     console.log(test, 'Works!');
    // });
    // axios.get('https://api.binance.com/api/v1/ping', {
    //   crossdomain: true
    // })
    //   .then(response => console.log(response, 'test'))
  }
}

export default withStyles(styles)(App);