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
    padding: 150,
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
       
        <Typography component="h6" variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

        Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage
        is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus 
        Bonorum et Malorum for use in a type specimen book. It usually begins with: “Lorem ipsum dolor sit amet, consectetur 

        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”The purpose of lorem ipsum is to 
        create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice
        not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on 
        design, not content.The passage experienced a surge in popularity during the 1960s when Letraset used it on their 
        dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen 
        all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the 
        authoritative history of lorem ipsum.
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
