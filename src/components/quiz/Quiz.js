import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/Header'; // Header 컴포넌트 가져오기
import '../styles/Quiz.css';

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/quiz', {
                    headers: { 'Content-Type': 'application/json' }
                });
                setQuestions(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const handleAnswer = (userAnswer) => {
        const correct = questions[currentQuestionIndex]?.answer === userAnswer;
        setResult(correct ? 'Correct!' : 'Incorrect!');

        setTimeout(() => {
            setResult(null);
            if (currentQuestionIndex + 1 < questions.length) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                alert('Quiz Completed!');
            }
        }, 1000);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <Header /> {/* 헤더 컴포넌트를 상단에 렌더링 */}
            <div className="main-content">
                <div className="quiz-container">
                    {questions.length > 0 ? (
                        <>
                            <h2 className="question">{questions[currentQuestionIndex]?.qtext}</h2>
                            <div className="answer-buttons">
                                <div className="answer-box" onClick={() => handleAnswer(true)}>O</div>
                                <div className="answer-box" onClick={() => handleAnswer(false)}>X</div>
                            </div>
                            {result && <p className="result">{result}</p>}
                        </>
                    ) : (
                        <div>질문이 없습니다</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Quiz;
