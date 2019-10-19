
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Header from './Header.js';
import SideBar from './SideBar.js';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const drawerWidth = 240;
const styles = theme => ({
  root2: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop:150,
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },

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
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  card: {
    maxWidth: 270,
    minWidth: 270,
    margin:20,
  },
  media: {
    height: 140,
  },
})

class Plans extends Component {
  constructor(props) {
    super(props);
    this.classes = props.classes;
  }
 
  render() {
    const { classes } = this.props;
    const tileData = [
      {
        img: 'images/puistojuoksu.jpg',
        title: "10 km Training Plan",
      },
      {
        img: 'images/vuorella.jpg',
        title: "Half Marathon",
      },
      {
        img: 'images/puistojuoksu.jpg',
        title: "Marathon",
      },
      {
        img: 'images/vuorella.jpg',
        title: "Ultra",
      },
    ];
    return (
     
      <div>
        <div>
           <SideBar location={this.props.location}> 
            <Header  className={classes.appBar} title='Training Plans'/>
         </SideBar> 
        </div>
        <div className={classes.root2}>
        <Typography style={{marginLeft:90}} component='h6' variant='h5'>Choose your training plan</Typography>
          <div className={classes.paperDiv}>
           {tileData.map((tile, index) => ( 
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={tile.img}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2" >
                  {tile.title}
                </Typography>
                <Typography component="p">
                The purpose of lorem ipsum is to create a natural looking block 
                of text sentence, paragraph, page...
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" style={{color:'#366453'}}>
                Learn more
              </Button>
              <Button size="small" style={{color:'#366453'}}>
                My choice
              </Button>
            </CardActions>
          </Card>
           ))} 
          </div>
        </div>
      </div>
    );
  } 
}
Plans.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default  (withStyles(styles)(Plans));

