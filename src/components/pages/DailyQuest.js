import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import ProgressBar from '../../components/main/ProgressBar'; // ProgressBar 가져오기
import '../styles/DailyQuest.css';
import '../mobile/DailyQuest.css';

const DailyQuest = () => {
  const navigate = useNavigate();
  // 진행 상태를 관리하기 위한 상태 변수 추가
  const [progress, setProgress] = useState(0); // 진행률 상태

  const handleTabClick = (page) => {
    navigate(page); // 페이지 이동
  };

  const quests = [
    { task: "대중 교통 후불 카드 인증", reward: 10, link: "/imageupload" },
    { task: "친환경 퀴즈 풀기", reward: 10, link: "/quiz"  },
    { task: "가까운 거리 자전거/도보 이용 인증", reward: 10 },
    { task: "에어컨 온도 인증", reward: 10 },
  ];

  // 예시로 진행률을 업데이트하는 로직
  useEffect(() => {
    const completedQuests = 2; // 완료된 퀘스트 수
    const totalQuests = quests.length;
    const progressValue = (completedQuests / totalQuests) * 100;
    setProgress(progressValue);
  }, [quests]);

  return (
    <div className="daily-quest-page">
      <Header />
      <div className="main-content">
        <div className="daily-quest">
          <div className="quest-list">
            <h3>🌱 돌보미의 오늘 할 일 🌱</h3>
            <p>주간 자정에 초기화됩니다</p>
            {quests.map((quest, index) => (
              <div
                key={index}
                className="quest-item"
                onClick={() => {
                  if (quest.link) {
                    navigate(quest.link);
                  }
                }}
                style={{ cursor: quest.link ? 'pointer' : 'default' }}
              >
                <span className="task">{quest.task}</span>
                <span className="reward">{quest.reward} 포인트</span>
              </div>
            ))}
            <h2>진행 상태</h2>
            <ProgressBar progress={progress} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyQuest;