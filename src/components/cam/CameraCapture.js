import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../styles/CameraCapture.css'; // CSS 파일 경로

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const constraints = {
      video: {
        facingMode: 'environment',
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    };

    console.log("Requesting camera access with constraints:", constraints);

    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        console.log("Camera stream received:", stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          console.log("Video element found, stream assigned.");
        } else {
          console.error("Video element not found.");
        }
      })
      .catch((err) => {
        console.error("Error accessing camera: ", err);
      });
  }, []);

  const capture = async () => {
    console.log("Capture button clicked.");

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const video = videoRef.current;

    if (!video || !context) {
      console.error("Video or Canvas context not found.");
      return;
    }

    console.log("Video dimensions:", {
      videoWidth: video.videoWidth,
      videoHeight: video.videoHeight
    });

    const x = (video.videoWidth * 0.25);
    const y = (video.videoHeight * 0.4);
    const width = video.videoWidth * 0.5;
    const height = video.videoHeight * 0.2;

    console.log("Crop area:", { x, y, width, height });

    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, x, y, width, height, 0, 0, width, height);
    const dataUrl = canvas.toDataURL('image/png');

    console.log("이미지 보냄");

    // 이미지 데이터를 서버로 전송
    try {
      const response = await axios.post('http://localhost:8080/api/upload', 
      {
        image: dataUrl
      }, 
      {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('Prediction result:', response.data);
    } catch (error) {
      console.error('Error sending image to server:', error);
      setError('이미지를 서버에 전송하는 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="camera-container">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="camera-frame">
        <video ref={videoRef} autoPlay className="camera-video" />
        <div className="guide-box"></div>
      </div>
      <canvas ref={canvasRef} className="camera-canvas" />
      <button onClick={capture} className="capture-button">Capture</button>
    </div>
  );
};

export default CameraCapture;
