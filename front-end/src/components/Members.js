
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Header from './Header.js';

import { connect } from "react-redux";

import { addUserAction, getUsersAction, deleteUserAction, updateUserAction } from "../redux/actions";

const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 100,
    marginLeft: 60,
  },
  root2: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginRight: 20,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    maxWidth: 250,
    minWidth: 250,
    marginRight: 50,
    marginBottom: 16,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    paddingLeft: 15,
    paddingRight: 15,

  },
  buttons: {  
    float: 'right',
    margin: 5,
  },
  infoButtonDiv: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 80,
  },
   paperDiv: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }, 
  infoButton: {
    color: '#421e1c',
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },

})

class Members extends Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
    this.state = {
      editableUser: null,
    }
  }

  componentDidMount() {
    this.props.getUsersAction()
  }

  onNewUser = (e) => {
    e.preventDefault();
    let user = {
      username: e.target.username.value + '',
      password: e.target.password.value + ''
    }
    e.target.username.value = ''
    e.target.password.value = ''
    this.props.addUserAction(user).then(() => {
      this.props.getUsersAction()
    })
  }

  handleChange = (field) =>  (e) => {
    this.setState({
      editableUser: {
        ...this.state.editableUser,
        [field]: e.target.value
      }
    })
  }

  updateUser = (user) => {
    this.props.updateUserAction(user)
    this.setState({editableUser: null})
  }

  userHasPayedMonthlyFee = (user) => {
    if (user && user.monthlyFees) {
      const thisMonth = new Date().getMonth() 
      let hasPayd = user.monthlyFees.find((fee) => {
        return fee.month === thisMonth
      })
      if (hasPayd) {
        return (<h5 style={{color: 'green', fontWeight: 150,}}>No pending fee! </h5>)
      } else {
        return (<h5 style={{color: 'red', fontWeight: 150}}>Has not paid monthly fee!</h5>)
      }
    } else {
      return (<h5 style={{color: 'red', fontWeight: 150}}>Has not paid monthly fee!</h5>)
    }
  }

  editUserView = (user) => {
    if (this.state.editableUser && this.state.editableUser._id === user._id) {
      return (
        <div>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">Name</InputLabel>
            <Input id="username" name="username"  value={this.state.editableUser.username} autoFocus onChange={this.handleChange('username')}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">New password</InputLabel>
            <Input id="password" name="password" autoFocus onChange={this.handleChange('password')}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <RadioGroup
              row
              aria-label="role"
              name="role"
              value={this.state.editableUser.role || 'user'}
              onChange={this.handleChange('role')}
            >
              <FormControlLabel value="user" control={<Radio />} label="user" />
              <FormControlLabel value="admin" control={<Radio />} label="admin" />
            </RadioGroup>
          </FormControl>
          <div >
            <Button
              type="button"
              style= {{color:'#366453'}}
              onClick={() => this.setState({editableUser: null})}
              >
              cancel
            </Button>
            <Button
              type="button"
              variant="contained"
              style= {{backgroundColor:'#366453',color:'#FFFFFF', marginLeft: 16}}
              onClick={() => this.updateUser(this.state.editableUser)}
              >
              save
            </Button>
          </div>
        </div>
      )
    } else {
      if (this.props.currentUser.role === 'admin') {
        return (
          <div>
            <h4 style={{fontWeight: 300}}>{user.username}</h4>
            {this.userHasPayedMonthlyFee(user)}
            <Button
              type="button"
              style= {{color:'#366453'}}
              onClick={() => this.props.deleteUserAction(user._id)}
              >
              Delete
            </Button>
            <Button
              type="button"
              variant="outlined"
              style= {{ color: '#366453',marginLeft: 16}}
              onClick={() => {
                this.setState({editableUser: user})}
              }
              >
              Edit
            </Button>
          </div>
        )
      } else {
        return (<h2>{user.username}</h2>)
      }
    }
  }

  renderAddNewUSerView = () => {
    let {classes} = this.props
    if (this.props.currentUser.role === 'admin') {
      return (
        <Paper className={classes.paper}>
          <Typography style={{color:'#366453'}} component="h1" variant="h5">
            New user
          </Typography>
          <form className={classes.form}
              onSubmit={this.onNewUser}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Name</InputLabel>
              <Input id="username" name="username"  autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password"/>
            </FormControl>
            <div className={classes.buttons}>
              <Button
                type="submit"
                variant="contained"
                style= {{backgroundColor:'#366453',color:'#FFFFFF'}}
                className={classes.submit}
                >
                Add
              </Button>
            </div>
          </form>
        </Paper>
      )
    }
  }
  
  render() {
    const { classes } = this.props;
    return (
     
      <div>
        <div>
          <Header  title='Members' displayArrow={true} linkTo="/home"/>
        </div>
        <div className={classes.root}>
          <div className={classes.root2}>
            <div className={classes.paperDiv}>
              <Paper className={classes.paper}>
                <Typography style={{color:'#366453'}} component='h5' variant='h5'>Members </Typography>
                {this.props.users.map((user) => (
                  <div key={user._id}>
                    {this.editUserView(user)}
                  </div>
                ))}
              </Paper>
              {this.renderAddNewUSerView()}
            </div>
          </div>
        </div>
      </div>
    );
  } 
}
Members.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => ({
  getUsersAction: () => dispatch(getUsersAction()),
  deleteUserAction: (id) => dispatch(deleteUserAction(id)),
  addUserAction: (user) => dispatch(addUserAction(user, false)),
  updateUserAction: (user) => dispatch(updateUserAction(user, false))
});

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles)(Members));
