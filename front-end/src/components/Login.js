
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import { Link } from 'react-router-dom';
import {authenticateAction} from '../redux/actions'
import { connect } from "react-redux";

const styles = theme => ({
  root2: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    //marginTop: ,  
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    maxWidth: 300,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    paddingLeft: 20,
    paddingRight: 20,

  },
  buttons: {  
    float: 'right',
    margin: 5,
  },
  paperDiv: {
    display: 'flex',
    justifyContent: 'center',
  },
  infoButton: {
    color: '#5c3836',
  },

})
class Login extends Component {

  login = (e) => {
    e.preventDefault();
    let user = {
      username: e.target.username.value,
      password: e.target.password.value
    }
    this.props.authenticateAction(user).then(() => {
      this.props.history.push('/home')
    }).catch((e) => {
      console.warn(e)
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.root2}>
          <div className={classes.paperDiv}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h5">
                LOGIN
              </Typography>
              <form className={classes.form} onSubmit={this.login}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel style={{color:'#366453'}} htmlFor="username">User name</InputLabel>
                  <Input id="username" name="username" autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel style={{color:'#366453'}} htmlFor="password">Password</InputLabel>
                  <Input name="password" type="password" id="password" />
                </FormControl>
                <div className={classes.buttons}>
                  <Button
                    type="submit"
                    style= {{color:'#366453'}}
                    className={classes.submit}
                    component={Link} to="/"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    style= {{backgroundColor:'#366453',color:'#FFFFFF'}}
                    className={classes.submit}
                  >
                    Login
                  </Button>
                </div>
              </form>
            </Paper>
          </div>
        </div>
      </div>
    ); 
  } 
}
Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  authenticateAction: (user) => dispatch(authenticateAction(user)),
});

export default connect(null, mapDispatchToProps) (withStyles(styles)(Login));
