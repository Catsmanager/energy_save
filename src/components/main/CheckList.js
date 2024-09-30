import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // JWT 디코딩을 위한 라이브러리

const Checklist = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);  // 초기값을 빈 배열로 설정
  const [newTask, setNewTask] = useState("");
  const [email, setEmail] = useState(""); // 이메일 상태 추가

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // JWT 디코딩
        setEmail(decodedToken.sub); // sub에서 이메일 상태에 저장 <-- 이부분이 jwt사요하는부분!!
        //console.log(decodedToken.sub); // 디코딩된 이메일 출력
      } catch (error) {
        console.error('토큰 디코딩 실패:', error);
        navigate('/'); // 토큰이 유효하지 않으면 로그인 페이지로 리디렉트
        return;
      }
    } else {
      navigate('/'); // 토큰이 없으면 로그인 페이지로 리디렉트
      return;
    }

    // 이메일이 설정되면 체크리스트를 가져오는 함수 실행
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/checklist/list/${email}`, {
          headers: { 'Content-Type': 'application/json' }
        });

        const taskData = Array.isArray(response.data) ? response.data : [];
        setTasks(taskData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setTasks([]);  // 에러 발생 시에도 빈 배열로 설정
      }
    };

    fetchTasks();
  }, [email, navigate]);

  // 새로운 작업 추가
  const addTask = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/checklist/add', 
        { email, text: newTask }, 
        { headers: { 'Content-Type': 'application/json' } }
      );
      setTasks([response.data, ...tasks]);  // 새 작업이 맨 위에 추가되도록 설정
      setNewTask("");
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // 작업 삭제
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/checklist/delete/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // 작업 완료 상태 변경
  const toggleTaskCompletion = async (id, completed) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/checklist/update/${id}`, { completed: !completed });
      setTasks(tasks.map(task => 
        task.id === id ? response.data : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div>
      <h2>{`Today's Checklist`}</h2>
      
      <input 
        type="text" 
        value={newTask} 
        onChange={e => setNewTask(e.target.value)} 
        placeholder="New Task" 
      />
      <button onClick={addTask}>Add Task</button>
      
      <ul>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => toggleTaskCompletion(task.id, task.completed)} 
              />
              {task.text}
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>오늘 할 일이 없습니다.</li>
        )}
      </ul>
    </div>
  );
};

export default Checklist;




// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Checklist = ({ email }) => {
//   const navigate = useNavigate();
//   const [tasks, setTasks] = useState([]);  // 초기값을 빈 배열로 설정
//   const [newTask, setNewTask] = useState("");

//   useEffect(() => {
//     // if (!email) {
//     //   navigate('/');  // email이 없으면 로그인 페이지로 리디렉트
//     //   return;
//     // }

//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/api/checklist/list/${email}`, {
//           headers: { 'Content-Type': 'application/json' }
//         });

//         // 응답이 배열인지 확인하고 배열이 아닌 경우 빈 배열로 처리
//         const taskData = Array.isArray(response.data) ? response.data : [];
//         setTasks(taskData);

//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//         setTasks([]);  // 에러 발생 시에도 빈 배열로 설정
//       }
//     };

//     fetchTasks();
//   }, [email, navigate]);

//   // 새로운 작업 추가
//   const addTask = async () => {
//     try {
//       const response = await axios.post('http://localhost:8080/api/checklist/add', 
//         { email, text: newTask }, 
//         { headers: { 'Content-Type': 'application/json' } }
//       );
//       setTasks([response.data, ...tasks]);  // 새 작업이 맨 위에 추가되도록 설정
//       setNewTask("");
//     } catch (error) {
//       console.error('Error adding task:', error);
//     }
//   };

//   // 작업 삭제
//   const deleteTask = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/checklist/delete/${id}`);
//       setTasks(tasks.filter(task => task.id !== id));
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   };

//   // 작업 완료 상태 변경
// const toggleTaskCompletion = async (id, completed) => {
//   try {
//     // 서버에 상태 업데이트 요청
//     const response = await axios.put(`http://localhost:8080/api/checklist/update/${id}`, { completed: !completed });

//     // 서버 응답으로 상태를 업데이트
//     setTasks(tasks.map(task =>
//       task.id === id ? response.data : task
//     ));
//   } catch (error) {
//     console.error('Error updating task:', error);
//   }
// };

//   return (
//     <div>
//       <h2>{`Today's Checklist`}</h2>
      
//       {/* 새로운 작업 추가 입력 필드와 버튼 */}
//       <input 
//         type="text" 
//         value={newTask} 
//         onChange={e => setNewTask(e.target.value)} 
//         placeholder="New Task" 
//       />
//       <button onClick={addTask}>Add Task</button>
      
//       <ul>
//         {tasks.length > 0 ? (
//           tasks.map(task => (
//             <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
//               <input 
//                 type="checkbox" 
//                 checked={task.completed} 
//                 onChange={() => toggleTaskCompletion(task.id, task.completed)} 
//               />
//               {task.text}
//               <button onClick={() => deleteTask(task.id)}>Delete</button>
//             </li>
//           ))
//         ) : (
//           <li>오늘 할 일이 없습니다.</li>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Checklist;
