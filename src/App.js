

import React, { useState } from 'react';
import './App.css';


const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const { id, text, completed } = task;

  return (
    <div className="task-cont">
      <div
        className="task-text"
        style={{ textDecoration: completed ? 'line-through' : 'none' }}
        onClick={() => onToggle(id)} 
      >
        {text}
      </div>
      <div className="task-buttons">
        <button className="glow-on-hover" onClick={() => onEdit(id)}>Редактировать</button>
        <button className="glow-on-hover-delete" onClick={() => onDelete(id)}>Удалить</button> 
      </div>
    </div>
  );
};






const TaskList = ({ tasks, onToggle, onDelete, onEdit, filterStatus }) => {
 
  const filteredTasks = filterStatus === "all" ? tasks : tasks.filter(task => (filterStatus === "completed" ? task.completed : !task.completed));

  return (
    <div>
      {filteredTasks.map((task) => (
        <div key={task.id} className="task-container">
          <TaskItem
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>
      ))}
    </div>
  );
};


const TaskForm = ({ onSubmit, taskToEdit }) => {
  const [text, setText] = useState(taskToEdit ? taskToEdit.text : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') {
      return;
    }

    onSubmit({ text });
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Введите задачу"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="glow-on-hover2"  type="submit">{taskToEdit ? 'Редактировать' : 'Добавить'}</button>
    </form>
  );
};

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all"); 

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1, completed: false }]);
  };

  

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const editTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setTaskToEdit(taskToEdit);
  };

  const updateTask = (editedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskToEdit.id ? { ...task, ...editedTask } : task
      )
    );
    setTaskToEdit(null);
  };
  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  return (
    <div>
      <h1></h1>
      <div>
        <button className="qwerty" onClick={() => setFilterStatus("all")}>Все</button>
        <button className="qwerty1" onClick={() => setFilterStatus("completed")}>Завершенные</button>
        <button className="qwerty1" onClick={() => setFilterStatus("uncompleted")}>Незавершенные</button>
      </div>
      <TaskForm onSubmit={taskToEdit ? updateTask : addTask} taskToEdit={taskToEdit} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} filterStatus={filterStatus} />

    </div>
  );
}

