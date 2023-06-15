import React, { useRef, useState } from 'react';
import axios from 'axios';
import './Homepage.css'
const ImageUpload = () => {
  const audioRef = useRef(null);
  const handlePlay = () => {
    audioRef.current.play();
  }
  const handlePause = () => {
    audioRef.current.pause();
  }
  const [isLoading,setIsLoading]=useState(false)
  const [file, setFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false)
  const [filename, setFilename] = useState(null);
  const [music, setMusic] = useState(null)
  const [isAudio, setIsAudio] = useState(false)
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('http://localhost:8800/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload response:', response);
      if (response.data.status == "ok") {
        setIsUploaded(true)
        setFilename(response.data.data)

      }
    } catch (error) {
      console.error('Error uploading image:', error);

    }
  };

  const AudioPlayer = (src) => {

  }
  var BASE64_MARKER = ';base64,';

  function convertDataURIToBinary(dataURI) {
    var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    var base64 = dataURI.substring(base64Index);
    var raw = window.atob(base64);
    var rawLength = raw.length;
    var array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }

  const playaAudio = async () => {
    setIsLoading(true)
    await axios.get('http://localhost:8800/read-text/' + '1686311865477-r.png')
      .then(async response => {
        // Handle successful response
        console.log('Response:', response.data);
        if (response.data.status == "ok") {
          console.log(response.data)


          let binary = convertDataURIToBinary(response.data.data);
          console.log(binary)
          let blob = new Blob([binary], { type: 'audio/ogg' });
          let blobUrl = URL.createObjectURL(blob);
          console.log(blobUrl)


          setMusic(blobUrl)

          setIsAudio(true)
          setIsLoading(false)

          // audioRef.current.play();
          console.log(music);
        }


      })
      .catch(error => {
        // Handle error
        console.error('Error:', error);
      });

  }

  return isLoading?(<div className='loading-div'>
    <p>
      Please wait while your data is being processed ...
    </p>
  </div>):(

    <div className='homepage-container'>

      <div className='img-upload'>
        <div className='heading'>
          <h1>Upload Image</h1>
        </div>
        <div className='img-input'>
          <input className='file-input' type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <div className='upload-btn'>
          {
            isAudio ? (<div>

              <audio ref={audioRef} src={music} type="audio/ogg" controls></audio>
            </div>) : (<></>)
          }
          <button onClick={handleUpload} disabled={!file}>
            Upload
          </button>
        </div>
        {
          isUploaded ? (
            <div className='img-uploaded'>
              <p>Image successfully uploaded</p>


            </div>
          ) : (<><h></h></>)
        }

      </div>
      <div className='audio-upload'>
        <button className='play-btn' onClick={playaAudio}>Play audio</button>
        <button onClick={handlePlay} >Play</button>
        <button onClick={handlePause}>Pause</button>
      </div>

    </div>

  );
};

export default ImageUpload;
