import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TerrainIcon from '@material-ui/icons/Terrain';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowIcon from '@material-ui/icons/KeyboardArrowLeft';
import { Link } from 'react-router-dom';



const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#366453',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 1,
  },
  hamburger: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
})
class Header extends Component {
   constructor(props) {
    super(props);
     this.state = {
      mobileOpen: false,
    }; 
  } 
 openSideBar = () => {
    this.setState({ mobileOpen: true})
  }; 
  render() {
    const { classes, displayArrow, linkTo, title, position = 'fixed', className, action = () => {console.log('clicks')} } = this.props;
    
    function getNavbar() {
      if (displayArrow ) {
         /* if (backAction){
          return (
            <IconButton onClick = {backAction} className={classes.menuButton} color="inherit" aria-label="Menu">
              <ArrowIcon />
            </IconButton>
          )
        } else {  */
        return (
          <IconButton component={Link} to={linkTo || ''} className={classes.menuButton} color="inherit" aria-label="Menu">
            <ArrowIcon />
          </IconButton>
        )
        }
      //  } 
      return (
        <IconButton className={classes.menuButton + ' ' + classes.hamburger} color="inherit" aria-label="Menu" onClick = {action}>
          <MenuIcon />
        </IconButton>
      )
    }
    return (
        <div className={classes.root}>
          <AppBar position={position} className={classes.root + ' ' + className}>
            <Toolbar>
              {getNavbar()} 
              <Typography variant="h6" color="inherit" className={classes.grow}>
              {title}
              </Typography>
              <IconButton className={classes.starButton} color="inherit" aria-label="Terrain">
              <TerrainIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
    );
  }
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Header);