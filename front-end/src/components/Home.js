import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Header from './Header.js';
import SideBar from './SideBar.js';

const drawerWidth = 240;
const styles = theme => ({
  root2: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding:20,
    margin: 100,
    textAlign: 'justify',
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  div: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    maxWidth: 300,
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  backgroundImage: {
    height: '100vh',
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
  },
})
class Info extends Component {
   constructor(props) {
    super(props);
    this.classes = props.classes;
    this.backgroundImage = {
      backgroundImage: 'url(images/mountainrunning.jpg)'
    }
  } 
  render() {
    const { classes } = this.props;
  
    return (
      <div className={this.classes.backgroundImage} style={this.backgroundImage}>
        <div>
          <SideBar location={this.props.location}>
            <Header className={classes.appBar} title='Runners Club'></Header>
          </SideBar>
        </div>
        <div className={classes.root2}>
          <Typography component='h6' variant='h5'>Lorem ipsum dolor</Typography>
          <Typography  variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Typography> 
        </div>
      </div>
    ); 
  } 
}
Info.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Info);
