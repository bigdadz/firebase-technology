import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FileTable from './FileTable'
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Iframe from 'react-iframe'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';




@inject('authStore')
@observer
class Welcome extends Component {
  constructor (props) {
    super(props)
    this.state = { url: '', random: 0 }
    this.myIframe = React.createRef();
    console.log(this.props.authStore.selectUrl)
  }

  handleSelectedFile(event) {
    var file = event.target.files[0]
    var storageRef = firebase.storage().ref();
    var ref = storageRef.child(file.name);
    ref.put(file).then(function (snapshot) {
      console.log('Uploaded a blob or file!');
    });
  }

  getUrl = async function() {
    var db = firebase.firestore()
    var docRef = db.collection("infomation").doc("baccarat");
    var res = await docRef.get()
    console.log(res.data().host_url)
    return res.data().host_url
  }

  // render() {
  //   const { classes } = this.props;
  //   return (
  //     <Grid
  //       container
  //       direction="row"
  //       justify="center"
  //       alignItems="center"
  //     >
  //       <input
  //         accept="image/*"
  //         className={classes.input}
  //         id="contained-button-file"
  //         multiple
  //         type="file"
  //         onChange={this.handleSelectedFile}
  //       />
  //       <label htmlFor="contained-button-file">
  //         <Button 
  //           variant="contained" 
  //           component="span" 
  //           className={classes.button}
  //           >
  //           Upload
  //         </Button>
  //       </label>
  //       <FileTable />
  //     </Grid>
  //   );
  // }

  handleChange = (event) => {
    this.props.authStore.selectUrl = event.target.value
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <InputLabel htmlFor="age-simple">สูตร</InputLabel>
        <Select
          value={this.props.authStore.selectUrl}
          onChange={this.handleChange}
          inputProps={{
            name: 'age',
            id: 'age-simple',
          }}
        >
          <MenuItem value={"https://baccarat-cheat.web.app/"}>Second Last</MenuItem>
          <MenuItem value={"https://www.google.com/"}>Second Last 1324</MenuItem>
        </Select>
        <iframe 
          className={classes.resIframe}
          src={this.props.authStore.selectUrl}>
        </iframe>
      </div>
    )
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  resIframe: {
    position: "absolute",
    top: 100,
    left: 0,
    width: "100%",
    height: "100%",
    border: 0
  }
});

Welcome.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Welcome);