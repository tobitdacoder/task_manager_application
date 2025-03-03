import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskService from '../services/TaskService';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    TaskService.getAllTasks()
      .then(response => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
        setError('Failed to load tasks');
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      TaskService.deleteTask(id)
        .then(() => {
          // Remove deleted task from state
          setTasks(tasks.filter(task => task.id !== id));
        })
        .catch(error => {
          console.error('Error deleting task:', error);
          alert('Failed to delete task');
        });
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1>Task List</h1>
      <Link to="/tasks/new" className="btn btn-primary mb-3">Add New Task</Link>
      
      {tasks.length === 0 ? (
        <p>No tasks available. Create a new one!</p>
      ) : (
        <div className="list-group">
          {tasks.map(task => (
            <div key={task.id} className="list-group-item list-group-item-action">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{task.title}</h5>
                <small>Status: {task.status}</small>
              </div>
              <p className="mb-1">{task.description}</p>
              <div className="btn-group">
                <Link to={`/tasks/${task.id}`} className="btn btn-info btn-sm">View</Link>
                <Link to={`/tasks/edit/${task.id}`} className="btn btn-warning btn-sm">Edit</Link>
                <button onClick={() => handleDelete(task.id)} className="btn btn-danger btn-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;