import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faCloudUploadAlt, faPlay, faStop, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Overview.css';

const Overview = () => {
  const [video, setVideo] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const fileInputRef = useRef(null); // Reference for the file input element
  const videoRef = useRef(null); // Reference for the video element

  const handleVideoUpload = (e) => {
    setVideo(URL.createObjectURL(e.target.files[0]));
  };

  const handleMouseEnter = () => {
    setMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setMenuVisible(false);
  };

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause(); // Pause the video
      videoRef.current.currentTime = 0; // Reset to the beginning
    }
  };

  const handleStart = () => {
    if (videoRef.current) {
      videoRef.current.play(); // Start the video playback
    }
  };

  const handleRemoveVideo = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Reset the input field value
    }
    setVideo(null); // Clear the current video state
  };

  return (
    <div className="overview-container">
      <div className="grid-container">
        <div className="subsection">
          <div
            className="action-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="action-icon">
              <FontAwesomeIcon icon={faEllipsisH} size="lg" />
            </div>
            {menuVisible && (
              <div className="menu">
                <button onClick={handleRemoveVideo}>
                  <FontAwesomeIcon icon={faTrash} /> Remove Video
                </button>
                <button onClick={handleStop}>
                  <FontAwesomeIcon icon={faStop} /> Stop
                </button>
                <button onClick={handleStart}>
                  <FontAwesomeIcon icon={faPlay} /> Start
                </button>
              </div>
            )}
          </div>

          {!video && (
            <label htmlFor="file-upload" className="upload-area">
              <input
                ref={fileInputRef} // Add ref to input for triggering file picker
                id="file-upload"
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="file-input"
              />
              <div className="upload-content">
                <FontAwesomeIcon icon={faCloudUploadAlt} size="3x" />
                <span>Choose Video</span>
              </div>
            </label>
          )}
          {video && (
            <div className="video-container">
              <video ref={videoRef} controls>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>

        <div className="subsection">
          <h2>Continuous Screening</h2>
          <p>Here you will see the continuous screening of the video...</p>
        </div>

        <div className="subsection">
          <h2>Predictive Graph</h2>
          <p>Graph showing predictions over time...</p>
        </div>

        <div className="subsection">
          <h2>Actual Graph</h2>
          <p>Graph showing the actual outcomes over time...</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
