import React from 'react';

import Dropzone from 'react-dropzone'

import './App.css';

class App extends React.Component {

  handleFileUpload = file => {
    // Only 1 file is allowed so the array only has 1 element
    let image = file[0]
    let fileReader = new FileReader()
    fileReader.readAsBinaryString(image)
    fileReader.addEventListener('load', ({currentTarget}) => { // Nasty destructuring but it looks nice
      const { result } = currentTarget
      // TODO: Throw that to the back end using axios or what ever
    })
  }

  render(){
    return (
      <div className="App">
        
        <Dropzone  multiple={false} onDrop={this.handleFileUpload}>
          { ({getRootProps, getInputProps}) => (
            <section >
              <div className="Dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                <p id="uploadDesciption">Drag'n drop some image to see the magic here</p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    );
  }
}

export default App;
