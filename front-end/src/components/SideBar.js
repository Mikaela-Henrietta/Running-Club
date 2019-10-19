
import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
import Avatar from '@material-ui/core/Avatar';
import GroupIcon from '@material-ui/icons/Group';
import TrendingFlatIcon from '@material-ui/icons/TrendingFlat';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import {logoutUser} from '../api/usersApi'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
 
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    margintop: 22,
    backgroundColor: '#d1e2dd',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  sideMenuName: {
    marginLeft: 16,
    marginBottom: 16,
   
  },
  toolbarUpper: {
    backgroundColor: '#91aca4',
  },
  sideMenuMenu: {
    marginTop: 22,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  avatar: {
    marginLeft:16,
    marginBottom: 16,
  },
});

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.navigationLinks = [{
      text: 'Home',
      icon: HomeIcon,
      href: '/home'
    }, {
      text: 'Profile',
      icon: EditIcon,
      href: '/profile'
    }, {
      text: 'Training Plans',
      icon: DirectionsRunIcon,
      href: '/plans'
    }, {
      text: 'Members',
      icon: GroupIcon,
      href: '/members'
    }]
    this.state = {
      redirect: false,
      mobileOpen: false,
    };
  }

   handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !this.state.mobileOpen }));
  }; 

  filteredNavigationLinks(location) {
    return this.navigationLinks.filter(n => n.href !== location)
  }

  logout = async (e) => {
    e.preventDefault();
    await logoutUser()
    this.setState({ redirect: true });
  }

  logoutRender = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else {
      return (
        <Link to={""} onClick={this.logout}>
          <ListItem button>
            <ListItemIcon><TrendingFlatIcon/></ListItemIcon>
            <ListItemText  primary={"logout"} />
          </ListItem>
        </Link>
      )
    }
  }

  render() {
    const { classes, theme, children, location, currentUser} = this.props;

    const iconGenerator = (icon) => {
      if (!icon) {
        return ''
      }
      const MyIconComponent = icon;
      return <ListItemIcon><MyIconComponent/></ListItemIcon>
    }
 
    const drawer = (
      <div>
        <div className={classes.toolbar} />
          <div className={classes.avatar}>
            <Avatar className={classes.bigAvatar} src="/images/profile.jpg">
              E
            </Avatar>
          </div>
          <div className={classes.sideMenuName}>
            <Typography variant="h6">
              {currentUser.username}
              </Typography>
            <Typography variant="body2">
              Runners Club
              </Typography>
          </div>
          <Divider />
          <div className={classes.sideMenuMenu}>
            <List>
             {this.filteredNavigationLinks(location.pathname).map((link,index) => (
              <Link  to={link.href}  key={link.text}>
                <ListItem button>
                  {iconGenerator(link.icon)}
                  <ListItemText primary={link.text} />
                </ListItem>
              </Link>
              ))}
              {this.logoutRender()}
            </List> 
        </div>  
      </div>
    );

    return (
      <div className={classes.root}>
         <CssBaseline />
        {React.cloneElement(children, { action: this.handleDrawerToggle })} 

        <nav className={classes.drawer}>
         
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open>
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </div>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.object,
  theme: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({currentUser: state.currentUser})

export default connect(mapStateToProps, null) (withStyles(styles, { withTheme: true })(SideBar));