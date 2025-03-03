import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const TaskService = {
  getAllTasks: () => {
    return axios.get(`${API_URL}/tasks/`);
  },
  
  getTaskById: (id) => {
    return axios.get(`${API_URL}/tasks/${id}/`);
  },
  
  createTask: (taskData) => {
    return axios.post(`${API_URL}/tasks/`, taskData);
  },
  
  updateTask: (id, taskData) => {
    return axios.put(`${API_URL}/tasks/${id}/`, taskData);
  },
  
  deleteTask: (id) => {
    return axios.delete(`${API_URL}/tasks/${id}/`);
  }
};

export default TaskService;