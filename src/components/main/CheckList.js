import React, { useState, useEffect } from 'react';

// 주간 퀘스트 데이터를 제공하는 함수
function getWeeklyQuests() {
  return [
    { id: 1, text: "Reduce water usage by 10%", completed: false },
    { id: 2, text: "Use public transportation 3 times", completed: false },
    { id: 3, text: "Unplug unused electronics", completed: false },
  ];
}

function WeeklyQuest() {
  const [quests, setQuests] = useState([]);
  const [newQuest, setNewQuest] = useState(""); // 사용자가 입력하는 퀘스트 텍스트

  useEffect(() => {
    // localStorage에서 퀘스트 가져오기
    const savedQuests = JSON.parse(localStorage.getItem('quests')) || getWeeklyQuests();
    const lastReset = localStorage.getItem('lastReset');
    const now = new Date();

    // 하루가 지났으면 퀘스트 리셋
    if (!lastReset || new Date(lastReset).getDate() !== now.getDate()) {
      localStorage.setItem('lastReset', now.toISOString()); // 리셋 시간 기록
      setQuests(getWeeklyQuests()); // 퀘스트 리셋
    } else {
      setQuests(savedQuests);
    }
  }, []);

  useEffect(() => {
    // 퀘스트가 업데이트될 때마다 localStorage에 저장
    localStorage.setItem('quests', JSON.stringify(quests));
  }, [quests]);

  const completeQuest = (id) => {
    setQuests((prevQuests) =>
      prevQuests.map((quest) =>
        quest.id === id ? { ...quest, completed: true } : quest
      )
    );
  };

  const addQuest = () => {
    if (newQuest.trim() !== "") {
      setQuests((prevQuests) => [
        ...prevQuests,
        { id: Date.now(), text: newQuest, completed: false },
      ]);
      setNewQuest(""); // 입력 필드 리셋
    }
  };

  const deleteQuest = (id) => {
    setQuests((prevQuests) => prevQuests.filter((quest) => quest.id !== id));
  };

  return (
    <div className="weekly-quest">
      <h2>This Week's Quests</h2>
      <ul>
        {quests.map((quest) => (
          <li key={quest.id}>
            <label>
              <input
                type="checkbox"
                checked={quest.completed}
                disabled={quest.completed}
                onChange={() => completeQuest(quest.id)}
              />
              <span style={{ textDecoration: quest.completed ? 'line-through' : 'none' }}>
                {quest.text}
              </span>
            </label>
            <button onClick={() => deleteQuest(quest.id)}>삭제</button> {/* 삭제 버튼 */}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newQuest}
          onChange={(e) => setNewQuest(e.target.value)}
          placeholder="새 퀘스트 추가"
        />
        <button onClick={addQuest}>추가</button> {/* 퀘스트 추가 버튼 */}
      </div>
    </div>
  );
}

export default WeeklyQuest;


// import React, { useState, useEffect } from 'react';

// // 주간 퀘스트 데이터를 제공하는 함수
// function getWeeklyQuests(weekNumber) {
//   const allQuests = [
//     [
//       { id: 1, text: "Reduce water usage by 10%", completed: false },
//       { id: 2, text: "Use public transportation 3 times", completed: false },
//       { id: 3, text: "Unplug unused electronics", completed: false },
//     ],
//     [
//       { id: 1, text: "Use energy-efficient light bulbs", completed: false },
//       { id: 2, text: "Reduce shower time by 5 minutes", completed: false },
//       { id: 3, text: "Turn off electronics when not in use", completed: false },
//     ],
//     [
//       { id: 1, text: "Install a programmable thermostat", completed: false },
//       { id: 2, text: "Run your dishwasher only when full", completed: false },
//       { id: 3, text: "Switch to reusable shopping bags", completed: false },
//     ],
//     // 주간퀘스트 추가 가능..
//   ];

//   return allQuests[weekNumber % allQuests.length];
// }

// function WeeklyQuest() {
//   const [quests, setQuests] = useState([]);

//   useEffect(() => {
//     const now = new Date();
//     const startOfYear = new Date(now.getFullYear(), 0, 1);
//     const weekNumber = Math.floor((now - startOfYear) / (7 * 24 * 60 * 60 * 1000));
//     const weeklyQuests = getWeeklyQuests(weekNumber);
//     setQuests(weeklyQuests);
//   }, []);

//   const completeQuest = (id) => {
//     setQuests((prevQuests) =>
//       prevQuests.map((quest) =>
//         quest.id === id ? { ...quest, completed: true } : quest
//       )
//     );
//   };

//   return (
//     <div className="weekly-quest">
//       <h2>This Week's Quests</h2>
//       <ul>
//         {quests.map((quest) => (
//           <li key={quest.id}>
//             <label>
//               <input
//                 type="checkbox"
//                 checked={quest.completed}
//                 disabled={quest.completed}
//                 onChange={() => completeQuest(quest.id)}
//               />
//               <span style={{ textDecoration: quest.completed ? 'line-through' : 'none' }}>
//                 {quest.text}
//               </span>
//             </label>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default WeeklyQuest;
