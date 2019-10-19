import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const styles = () => ({
  root0: {
    height: '100vh',
    backgroundImage: 'url(images/kuva.jpg)',
    backgroundSize: 'cover'
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  h1: {
    marginTop: 100,
    color: '#366453',
    fontSize: 60,
    fontWeight: 2,
  },
  links: {
    display: 'flex',
    justifyContent: '',
    flexDirection: 'row',
  },
  link: {
    padding: 20,
    fontSize: 20,
  },
})
class App  extends Component {
  constructor(props) {
    super(props);
  } 
  render() {
    return (
      <div className={this.props.classes.root0}>
        <div className={this.props.classes.root}>
          <h1 className={this.props.classes.h1}>Running Club!</h1>
          <div className={this.props.classes.links}>
            <div className={this.props.classes.link}>
              <Button  href='/signup'>Signup</Button>
            </div>
            <br/>
            <div className={this.props.classes.link}>
              <Button variant="outlined" href="/login">Login</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(App);