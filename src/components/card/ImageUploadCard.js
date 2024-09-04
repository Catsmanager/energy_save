import React, { useState } from 'react';
import axios from 'axios';
import '../styles/ImageUploadCard.css';

const ImageUploadCard = () => {
    const [file, setFile] = useState(null);
    const [isTransportVerified, setIsTransportVerified] = useState(false); // 대중교통 확인 상태

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

            const ocrText = response.data; // 서버로부터 OCR 결과 받기

            // 검색할 단어 목록
            const transportKeywords = ["대 중 교 통", "지 하 철", "버 스"];

            // 단어가 OCR 결과에 포함되어 있는지 확인
            const isVerified = transportKeywords.some(keyword => ocrText.includes(keyword));

            setIsTransportVerified(isVerified);

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
            <div className="verification-result-container">
                {isTransportVerified && (
                    <div className="verification-success">
                        <p>대중교통을 사용했습니다</p>
                    </div>
                )}
                {!isTransportVerified && file && (
                    <div className="verification-failure">
                        <p>대중교통을 사용하지 않았습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUploadCard;






// import React, { useState } from 'react';
// import axios from 'axios';
// import '../styles/ImageUploadCard.css';

// const ImageUploadCard = () => {
//     const [file, setFile] = useState(null);
//     const [ocrResult, setOcrResult] = useState("");
//     const [isTransportVerified, setIsTransportVerified] = useState(false); // 대중교통 확인 상태

//     const handleFileChange = (event) => {
//         setFile(event.target.files[0]);
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const formData = new FormData();
//         formData.append('image', file);

//         try {
//             const response = await axios.post('http://localhost:8080/api/ocr', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });

//             const ocrText = response.data; // 서버로부터 OCR 결과 받기
//             setOcrResult(ocrText);

//             // 검색할 단어 목록
//             const transportKeywords = ["대 중 교 통", "지 하 철", "버 스"];

//             // 단어가 OCR 결과에 포함되어 있는지 확인
//             const isVerified = transportKeywords.some(keyword => ocrText.includes(keyword));

//             setIsTransportVerified(isVerified);

//         } catch (error) {
//             console.error('Error uploading file:', error);
//         }
//     };

//     return (
//         <div className="image-upload-container">
//             <form onSubmit={handleSubmit} className="image-upload-card">
//                 <h2>Upload Image for OCR</h2>
//                 <input type="file" onChange={handleFileChange} required />
//                 <button type="submit">Upload</button>
//             </form>
//             <div className="ocr-result-container">
//                 {ocrResult && (
//                     <div className="ocr-result">
//                         <h3>OCR Result:</h3>
//                         <p>{ocrResult}</p>
//                     </div>
//                 )}
//                 {isTransportVerified && (
//                     <div className="verification-success">
//                         <p>대중교통을 사용했습니다</p>
//                     </div>
//                 )}
//                 {!isTransportVerified && ocrResult && (
//                     <div className="verification-failure">
//                         <p>대중교통을 사용하지 않았습니다.</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ImageUploadCard;
