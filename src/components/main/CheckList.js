import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checklist = ({ email }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);  // 초기값을 빈 배열로 설정
  const [newTask, setNewTask] = useState("");
  const [username, setUsername] = useState("");  // username을 저장할 상태 변수 추가

  useEffect(() => {
    if (!email) {
      navigate();  // email이 없으면 로그인 페이지로 리디렉트
      return;
    }

    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/checklist/user/${email}`, {
          headers: { 'Content-Type': 'application/json' }
        });

        // 응답이 배열인지 확인하고 배열이 아닌 경우 빈 배열로 처리
        const taskData = Array.isArray(response.data.tasks) ? response.data.tasks : [];
        setTasks(taskData);

        // 응답에서 username 추출 및 상태에 저장
        const fetchedUsername = response.data.username || "";
        setUsername(fetchedUsername);

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
      // 클라이언트에서 상태를 즉시 업데이트
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ));

      // 서버에 상태 업데이트 요청
      await axios.put(`http://localhost:8080/api/checklist/update/${id}`, { completed: !completed });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div>
      <h2>{`Today's Checklist`}</h2>
      
      {/* 새로운 작업 추가 입력 필드와 버튼 */}
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
