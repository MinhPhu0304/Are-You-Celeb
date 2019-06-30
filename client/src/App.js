import React from 'react';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dropzone from 'react-dropzone'

import './App.css';
import axios from 'axios'

class App extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      startAnalyzingPic: false
    }
  }

  handleFileUpload = file => {
    // Only 1 file is allowed so the array only has 1 element
    let image = file[0]
    let fileReader = new FileReader()
    fileReader.addEventListener('error', e => console.log(e))
    fileReader.addEventListener('loadend', e => {
      axios({
        url: '/api/checkCeleb',
        method: 'POST',
        data: {
          'imageBinary': fileReader.result
        }
      })
    })
    this.setState({ startAnalyzingPic: true })
    fileReader.readAsBinaryString(image)
  }

  render(){
    return (
      <div className="App">
        <Grid container alignContent="center" direction="column">
          <Paper style={{}}>
            <Typography variant="h5" component="h3" color="primary">
              Let's see if the image you upload is from a well known celebrity
            </Typography>
          </Paper>
        </Grid>
        <Grid container direction="column" justify="space-between" alignItems="stretch">
          <Box>
            <Grid>
              <Dropzone  multiple={false} onDrop={this.handleFileUpload} style={{margin: 4}}>
                { ({getRootProps, getInputProps}) => (
                  <Box boxShadow={3}>
                    <div className="Dropzone" {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p id="uploadDesciption">Drag'n drop some image to see the magic here</p>
                    </div>
                  </Box>
                )}
              </Dropzone>
            </Grid>
          </Box>
        </Grid>
        <Grid>
          { this.state.startAnalyzingPic ? (<CircularProgress style={{margin: '10px'}}/>) : ''}
        </Grid>
      </div>
    );
  }
}

export default App;
