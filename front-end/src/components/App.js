import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Login from './Login';
import SignUp from './SignUp';

const styles = (theme) => ({
  root0: {
    height: '100vh',
    backgroundImage: 'url(images/kuva.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  h1: {
    marginTop: 35,
    color: '#366453',
    fontSize: 40,
    [theme.breakpoints.up('sm')]: {
      fontSize: 50,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 70,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 100,
    },
    fontWeight: 300,
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
  infoButtonDiv: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 100,
    fontSize: 23,
  },
  infoButton: {
    textDecoration: 'none',
    color: '#20667a',
  }
})
class App  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'default'
    }
  } 

  selectDisplay (display) {
    this.props.history.push(display)
  }

  displaySwitcher() {
    if (this.props.match.path === '/login' ) {
      return (<Login history={this.props.history}></Login>)
    } else if (this.props.match.path === '/signup') {
      return (<SignUp history={this.props.history}></SignUp>)
    } else {
      return (
      <div className={this.props.classes.links}>
        <div className={this.props.classes.link}>
          <Button onClick={() =>this.selectDisplay('/signup')}>Signup</Button>
        </div>
        <br/>
        <div className={this.props.classes.link}>
          <Button variant="outlined" onClick={() => this.selectDisplay('/login')}>Login</Button>
        </div>
      </div>
      )
    }
  }

  render() {
    return (
      <div className={this.props.classes.root0}>
        <div className={this.props.classes.root}>
          <div className={this.props.classes.infoButtonDiv}>
            <Link  className={this.props.classes.infoButton} to={'/home'}>
              Explore!
            </Link>
          </div>
          <h1 className={this.props.classes.h1}>Running Club!</h1>
          {this.displaySwitcher()}
        </div>
      </div>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(App);