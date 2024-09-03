import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ImageUploadCard.css';

const ImageUploadCard = () => {
    const [file, setFile] = useState(null);
    const [ocrResult, setOcrResult] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('http://localhost:8080/api/ocr', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setOcrResult(response.data); // OCR 결과 저장
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className="image-upload-container">
            <form onSubmit={handleSubmit} className="image-upload-card">
                <h2>Upload Image for OCR</h2>
                <input type="file" onChange={handleFileChange} required />
                <button type="submit">Upload</button>
            </form>
            <div className="ocr-result-container">
                {ocrResult && (
                    <div className="ocr-result">
                        <h3>OCR Result:</h3>
                        <p>{ocrResult}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUploadCard;
