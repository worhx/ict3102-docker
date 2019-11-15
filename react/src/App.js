import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import FileList from './components/FileList'
import DragAndDrop from './components/DragAndDrop'
import Cover from './components/Cover'
import BgImage from './scenebg.jpg';
import FileUpload from './components/FileUpload';
import Shape from './components/Shape';
import {
  Rectangle
} from 'draw-shape-reactjs';

const App = () => {
  const [status, setStatus] = useState('Drop Here');
  const [preview, setPreview] = useState(null);
  const doNothing = event => event.preventDefault();
  const [percentage, setPercentage] = useState(0);
  const [enableDragDrop, setEnableDragDrop] = useState(true);

  const [stateXhr, setStateXhr] = useState(null);

  const onDragEnter = event => {
    console.log(event);
    if (enableDragDrop) {
      setStatus('File Detected');
  }
    event.stopPropagation();
    event.preventDefault();
  }

  const onDragLeave = event => {
    if (enableDragDrop) {
      setStatus('Drop Here');
    }
    event.preventDefault();
    event.stopPropagation();
  }

  const onDragOver = event => {
    if (enableDragDrop) {
      setStatus('Drop');
    }
    event.preventDefault();
}

  const onDrop = event => {
    const supportedFilesTypes = ['image/jpeg', 'image/png'];
    const { type } = event.dataTransfer.files[0];
    if (supportedFilesTypes.indexOf(type) > -1 && enableDragDrop) {
      // Begin Reading File
        const reader = new FileReader();
        reader.onload = e => setPreview(e.target.result);
        reader.readAsDataURL(event.dataTransfer.files[0]);

        // Create Form Data
        const payload = new FormData();
        payload.append('file', event.dataTransfer.files[0]);
        // XHR - New XHR Request
        const xhr = new XMLHttpRequest();

                    // XHR - Upload Progress
                    xhr.upload.onprogress = (e) => {
                      const done = e.position || e.loaded
                      const total = e.totalSize || e.total;
                      const perc = (Math.floor(done/total*1000)/10);
                      if (perc >= 100) {
                          setStatus('Done');
                          setEnableDragDrop(true);

                                              // Delayed reset
                          setTimeout(() => {
                            setPreview(null);
                            setStatus('Drop Here');
                            setPercentage(0);
                            setEnableDragDrop(true);
                          }, 750); // To match the transition 500 / 250

                      } else {
                          setStatus(`${perc}%`);
                      }
                      setPercentage(perc); 
                  };

        // XHR - Make Request  
        xhr.open('POST', 'http://localhost:5000/upload');
        xhr.send(payload);

        setStateXhr(xhr);
        setEnableDragDrop(false);
    }
    
    event.preventDefault();
  }

  const onAbortClick = () => {
    stateXhr.abort();
    setPreview(null);
    setStatus('Drop Here');
    setPercentage(0);
    setEnableDragDrop(true);
};

  // const test = React.createElement(Rectangle, {corner: [430, 160], height: 500, width: 1000, color: '#ff8f00'})
  let SHAPES = [
    {label: "Clock", cornerleft: 402, cornertop: 131, height: 72, width:85},
    {label: "Car", cornerleft: 200, cornertop: 380, height: 500, width:1000},
    {label: "Another Car", cornerleft: 100, cornertop: 290, height: 500, width:200},

    // [[430, 160], 500, 1000], 
  ]

  const testData = 
    {"data": "[{'label': 'truck', 'confidence': 0.29664555, 'topleft': {'x': 40, 'y': 56}, 'bottomright': {'x': 72, 'y': 73}}, {'label': 'car', 'confidence': 0.1504619, 'topleft': {'x': 34, 'y': 62}, 'bottomright': {'x': 122, 'y': 160}}, {'label': 'truck', 'confidence': 0.17571694, 'topleft': {'x': 69, 'y': 54}, 'bottomright': {'x': 125, 'y': 84}}, {'label': 'truck', 'confidence': 0.16826874, 'topleft': {'x': 126, 'y': 61}, 'bottomright': {'x': 149, 'y': 74}}, {'label': 'truck', 'confidence': 0.46485534, 'topleft': {'x': 17, 'y': 40}, 'bottomright': {'x': 205, 'y': 164}}]"}

  return (
    <div>
    <div>
      {/* <Cover/> */}
    <div className="ImagePreview">
                <div style={{ backgroundImage: `url(${BgImage})` }} />
            </div>
    </div>
<div className="App" onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDragOver={doNothing} onDrop={onDragLeave}>
     <div className={`ImagePreview ${preview ? 'Show' : ''}`}>
          <div style={{ backgroundImage: `url(${preview})` }}></div>
     </div>
     <div className={`DropArea ${status === 'Drop' ? 'Over' : ''} ${status.indexOf('%') > -1 || status === 'Done' ? 'Uploading' : ''}`} onDragOver={onDragOver} onDragLeave={onDragEnter} onDrop={onDrop}>          <div className={`ImageProgress ${preview ? 'Show' : ''}`}>
              <div className="ImageProgressImage" style={{ backgroundImage: `url(${preview})` }}></div>
              <div className="ImageProgressUploaded" style={{ backgroundImage: `url(${preview})`, clipPath: `inset(${100 - Number(percentage)}% 0 0 0)`}}></div>
           </div>
           <div className={`Status ${status.indexOf('%') > -1 || status === 'Done' ? 'Uploading' : ''}`}>{status}</div>
           {status.indexOf('%') > -1 && <div className="Abort" onClick={onAbortClick}><span>&times;</span></div>}
      </div>
</div>
{/* <FileUpload/> */}


        
{/* <Shape/> */}
</div>
  );
};
export default App;


// {SHAPES.map(shape => (
//   <Shape label={shape.label} cornerleft={shape.cornerleft} cornertop={shape.cornertop} height={shape.height} width={shape.width} key={shape.label+shape.width}/>
// ))}