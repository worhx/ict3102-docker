import React, { useState }from "react";
import './App.css';
import Cover from './components/Cover';
import BgImage from './background.jpg';
import Shape from './components/Shape';
import ImageUploader from 'react-images-upload';
import icon from '../src/drop_image.png'
import arrowIcon from '../src/arrow.jpg'


const App = () => {

  const [status, setStatus] = useState('Drop Here');
  const [preview, setPreview] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(null);
  const doNothing = event => event.preventDefault();
  const [percentage, setPercentage] = useState(0);
  const [enableDragDrop, setEnableDragDrop] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [showResultImage, setShowResultImage] = useState(false);

  const [stateXhr] = useState(null);

  const [listOfRect, setListOfRect] = useState([]);

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

const onChange = event => {
  setShowResult(!showResult);
  setShowArrow(!showArrow);
  setShowResultImage(!showResultImage);
  // Begin Reading File
  const files = event.target.files;

  let file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = e => setUploadPreview(e.target.result);
  reader.readAsDataURL(file);
  setShowResult(!showResult);
  setShowArrow(!showArrow);
  setShowResultImage(!showResultImage);

  // Create Form Data
  const payload = new FormData();
  payload.append('file', file);
  fetch('http://localhost:90/api/detect', {
          method: 'POST',
          body: payload
        })
        .then(response => {
          response.text().then(body => {
            console.log(body)
            const convert_to_proper_json_format = body.replace(/'/g, '"');
            const json_object = JSON.parse(convert_to_proper_json_format);

            setListOfRect(Array.from(json_object));

            setStatus('Results Below');
            setEnableDragDrop(true);
          });
        });
    setEnableDragDrop(false);
} 

  const onDrop = event => {
    setShowResult(!showResult);
    setShowArrow(!showArrow);
    setShowResultImage(!showResultImage);

    var sec = new Date().getSeconds()
    console.log("1st " + sec)
    const supportedFilesTypes = ['image/jpeg', 'image/png'];
    const { type } = event.dataTransfer.files[0];
    if (supportedFilesTypes.indexOf(type) > -1 && enableDragDrop) {
      // Begin Reading File
        const reader = new FileReader();
        reader.onload = e => setPreview(e.target.result);
        reader.readAsDataURL(event.dataTransfer.files[0]);
        setShowResult(!showResult);
        setShowArrow(!showArrow);
        setShowResultImage(!showResultImage);

        // Create Form Data
        const payload = new FormData();
        payload.append('file', event.dataTransfer.files[0]);
        fetch('http://localhost:90/api/detect', {
          			method: 'POST',
          			body: payload
              })
              .then(response => {
          			response.text().then(body => {
                  const convert_to_proper_json_format = body.replace(/'/g, '"');
                  const json_object = JSON.parse(convert_to_proper_json_format);
                  setListOfRect(Array.from(json_object));
                  setStatus('Results Below');
                  setEnableDragDrop(true);
          			});
          		});

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

  return (
  <div>
    <div>
      <Cover/>
      <div className="ImagePreview">
          <div style={{ backgroundImage: `url(${BgImage})` }} />
      </div>
    </div>
    <div className="imageHeader">
       <p className="instruction">Drop or upload your image below!</p>
       <p style={{fontSize: 'smaller',color:'grey'}}>Else...You would not be able to see the CNN object detection</p>
    </div>
    <div className="App" onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDragOver={doNothing} onDrop={onDragLeave}>
      <div className={`DropArea ${status === 'Drop' ? 'Over' : ''} ${status.indexOf('%') > -1 || status === 'Done' ? 'Uploading' : ''}`} onDragOver={onDragOver} onDragLeave={onDragEnter} onDrop={onDrop}>
        <div className={`ImageProgress ${preview ? 'Show' : ''}`}>
          <div className="ImageProgressImage" style={{ backgroundImage: `url(${preview})` }}></div>
          <div className="ImageProgressUploaded" style={{ backgroundImage: `url(${preview})`, clipPath: `inset(${100 - Number(percentage)}% 0 0 0)`}}></div>
        </div>
            <img className="dropImage" src={icon} />
            <div className={`Status ${status.indexOf('%') > -1 || status === 'Done' ? 'Uploading' : ''}`}>{status}</div>
            {status.indexOf('%') > -1 && <div className="Abort" onClick={onAbortClick}><span>&times;</span></div>}
      </div>

      <div className={`uploadArea ${status === 'Drop' ? 'Over' : ''} ${status.indexOf('%') > -1 || status === 'Done' ? 'Uploading' : ''}`} onChange={onChange}>
        <div className={`ImageProgress ${uploadPreview ? 'Show' : ''}`}>
          <div className="ImageProgressImage" style={{ backgroundImage: `url(${uploadPreview})` }}></div>
          <div className="ImageProgressUploaded" style={{ backgroundImage: `url(${uploadPreview})`, clipPath: `inset(${100 - Number(percentage)}% 0 0 0)`}}></div>
        </div>
        <ImageUploader
          buttonClassName='uploadButton'
          withIcon={true}
          buttonText='Choose images'
          singleImage={true}
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={5242880}
        />
      </div>
    </div>
    <div style={{textAlign:'center'}}>
        {showResult && <h2>Result</h2>}
        {showArrow && <img className="arrowImage bounce" src={arrowIcon}/>}
      </div>
    <div className="centerRectangle">
      {showResultImage && <img className="resultImage" src={preview || uploadPreview}/>}
          {listOfRect.map(shape => (
            <Shape label={shape.label} confidence={shape.confidence} cornerleft={shape.topleft.x} cornertop={shape.topleft.y} height={shape.bottomright.y-shape.topleft.y} width={shape.bottomright.x-shape.topleft.x} key={shape.label+shape.topleft.x}/>
          ))}
    </div>
  </div>
  );
};
export default App;