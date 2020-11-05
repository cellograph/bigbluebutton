import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';


const VideoUploaderTag = styled.form`
    width: 100%;
    min-height: 1.5em;
    padding: 1em;

    .video-uploader-form {
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        #external-video {
            flex-basis: 70%;
        }

        .upload-progress {
            flex-basis: 70%;
        }

        .up-button {
            flex-basis: 30%;

            button {
                padding: 8px 14px;
                font-size: 14px;
                background: coral;
                color: #fff;
            }
        }
    }

    .video-pp {
        width: 100%;
        min-height: 80px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .up-button {
            flex-basis: 30%;

            button {
                padding: 8px 14px;
                font-size: 14px;
                background: coral;
                color: #fff;
            }
        }
    }
`;


function VideoUploader(props) {
  const [file, setFile] = useState(null);
  const [percent, setPercent] = useState(0);
  const [url, setUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState('');


  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('external-video', file);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;

        const percentValue = Math.floor((loaded * 100) / total);
        setFileName(file.name);

        if (percentValue < 100) {
          setPercent(percentValue);
          setIsUploading(true);
        }
      },
    };

    axios.post('http://bbb2.pressply.site/upload-video', formData, config).then((res) => {
      setPercent(100);
      setUrl(res.data.videoUrl);
      setIsUploading(false);
    }).catch((error) => { console.log(error); });
  };

  const onChangeHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const setExternalVideoWatch = (e, vidurl) => {
    e.preventDefault();

    props.shareExternal(`http://bbb2.pressply.site/${vidurl}`);
  };

  return (
    <VideoUploaderTag className="video-uploader">
      <form onSubmit={onFormSubmit} className="video-uploader-form">
        {isUploading && (
        <div className="upload-progress">
            {`Upload: ${percent}% Completed`}
        </div>
        ) }
        {percent === 0 && <input onChange={onChangeHandler} type="file" name="external-video" id="external-video" />}
        <div className="up-button">
          <button type="submit" disabled={percent > 0}>Upload</button>
        </div>
      </form>
      {percent === 100 && <button disabled={percent < 100} type="button" onClick={() => setPercent(0)}>Upload another</button>}

      {
              percent === 100 && fileName && (
              <div className="video-pp">
                <div>{fileName}</div>
                <div className="up-button">
                  <button type="button" onClick={e => setExternalVideoWatch(e, url)}>Share Video</button>
                </div>
              </div>
              )
          }
    </VideoUploaderTag>
  );
}

export default VideoUploader;
