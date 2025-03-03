import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import TaskService from '../services/TaskService';

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    TaskService.getTaskById(id)
      .then(response => {
        setTask(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching task:', error);
        setError('Failed to load task details');
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      TaskService.deleteTask(id)
        .then(() => {
          navigate('/');
        })
        .catch(error => {
          console.error('Error deleting task:', error);
          alert('Failed to delete task');
        });
    }
  };

  if (loading) return <div>Loading task details...</div>;
  if (error) return <div>{error}</div>;
  if (!task) return <div>Task not found</div>;

  return (
    <div className="container">
      <h1>Task Details</h1>
      
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <h3>{task.title}</h3>
          <span className="badge bg-info">{task.status}</span>
        </div>
        <div className="card-body">
          <p className="card-text">{task.description}</p>
          {/* Display other task details as needed */}
        </div>
        <div className="card-footer">
          <Link to="/" className="btn btn-secondary me-2">Back to List</Link>
          <Link to={`/tasks/edit/${id}`} className="btn btn-warning me-2">Edit</Link>
          <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;