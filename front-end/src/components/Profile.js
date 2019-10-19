
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Header from './Header.js';
import SideBar from './SideBar.js';
import TextField from '@material-ui/core/TextField';
import WarningIcon from '@material-ui/icons/Warning';
import {getUser, payMonthlyFee, logoutUser} from '../api/usersApi'

import { connect } from "react-redux";

import { updateUserAction, deleteUserAction } from "../redux/actions";

const drawerWidth = 240;
const styles = theme => ({
  root: {
    //background: '#e2dad5',
  },
  root2: {
     display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 200, 
  },
  
  button: {  
    marginLeft: 'auto',
    marginLeft: 5,
    margin: 5,
    backgroundColor:'#366453',
    color: '#FFFFFF',
    maxWidth: 100,
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
    flexDirection: 'column',
    maxWidth:500,
    minWidth:500,
    alignItems: 'center',
    flexDirection: 'column',
  },
  textField: {
    marginLeft: 'auto',
    width: '100%',
    maxWidth: '350px'
  },
  dense: {
    marginTop: 16,
  },
  deleteAccount: {
    display: 'flex',
    marginTop: 100,
    marginLeft: 'auto',
    width: '100%',
    maxWidth: '350px'
  },
  buttons: {
    display: 'flex',
    marginLeft: 'auto',
  }
})

class Profile extends Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {
      username: '',
      password: '',
      creditCardNumber: '',
      mothlyFees: null
    };
  }
  componentWillReceiveProps(newProps) {
    if (newProps.currentUser) {
      this.setState({
        username: newProps.currentUser.username + '',
      });
      
      getUser(newProps.currentUser._id).then((res) => {
        this.setState({
          monthlyFees: res.data.monthlyFees
        });
      })
    }
  }
  handleChange = field => event => {
    this.setState({
      [field]: event.target.value,
    });
  };

  updateUser = () => {
    let {username, password} = this.state
    let user = {
      username,
      password,
      _id: this.props.currentUser._id
    }
    this.props.updateUserAction(user).then((res) => {
      console.log('updated', res)
    })
  }
  deleteUserAccount = () => {
    this.props.deleteUserAction(this.props.currentUser._id).then(() => {
      logoutUser().then(() => {
        this.props.history.push('/')
      })
    }) 
  }

  payFee = () => {
    if (this.state.creditCardNumber === '1234-1234') {
      payMonthlyFee(this.props.currentUser._id, this.state.creditCardNumber).then(res => {
        this.setState({
          monthlyFees: res.data.user.monthlyFees
        });
      })
    }
  }

  checkFees = () => {
    const { classes } = this.props;
    if (this.state.monthlyFees) {
      const thisMonth = new Date().getMonth() 
      let hasPayd = this.state.monthlyFees.find((fee) => {
        return fee.month === thisMonth
      })
      if (hasPayd) {
        return (
          <h2 >You have payed your monthly fee!</h2>
        )
      } else {
        return (
          <div className={classes.container} >
            <h4 style={{color: 'red'}}>Remember monthly fee!</h4>
            <TextField
                id="outlined-name"
                label="Credit card number (1234-1234)"
                className={classes.textField}
                value={this.state.creditCardNumber}
                onChange={this.handleChange('creditCardNumber')}
                margin="normal"
                variant="filled"
              />
            <Button type="button" variant="contained" style= {{backgroundColor:'#366453',color:'#FFFFFF', marginBottom: 50, marginLeft: 'auto'}} onClick={this.payFee}>pay</Button>
          </div>
        )
      }
    } 
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
           <SideBar location={this.props.location}> 
            <Header  className={classes.appBar} title='Profile'/>
         </SideBar> 
        </div>
        <div className={classes.root2}>
          {this.checkFees()}
          <form className={classes.container} noValidate autoComplete="off">
         
            <Typography component='h6' variant='subtitle1'> Edit your name or password</Typography>
            <TextField
              id="outlined-name"
              label="Name"
              className={classes.textField}
              value={this.state.username}
              onChange={this.handleChange('username')}
              margin="normal"
              variant="filled"
              helperText="Edit your name"
            />
            <TextField
              id="outlined-name"
              label=" New Password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange('password')}
              margin="normal"
              variant="filled"
              helperText="Your new password"
            />
            <div className={classes.buttons}>
              <Button type="button" style={{margin: 5,}}>Cancel</Button>
              <Button type="button" className={classes.button} variant="contained" onClick={this.updateUser}> Save</Button>
            </div>
            <div className={classes.deleteAccount}>
              <Typography component='h6' variant='subtitle1'>Removes your user account permanently </Typography>
              <WarningIcon style={{marginLeft: '10', color:'red'}}/>
            </div>
            <Button style={{marginTop: 20,backgroundColor: '#366453', color: '#FFFFFF', }} variant="contained" onClick={this.deleteUserAccount}>Delete your account </Button>
          </form>
          
        </div>
      </div>
    );
  } 
}
Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({currentUser: state.currentUser})

const mapDispatchToProps = (dispatch) => ({
  updateUserAction: (user) => dispatch(updateUserAction(user)),
  deleteUserAction: (id) => dispatch(deleteUserAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(Profile));