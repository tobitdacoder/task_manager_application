import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskService from '../services/TaskService';

function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    // Add other fields as per your model
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      TaskService.getTaskById(id)
        .then(response => {
          setFormData(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching task:', error);
          setError('Failed to load task data');
          setLoading(false);
        });
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    const savePromise = isEditing
      ? TaskService.updateTask(id, formData)
      : TaskService.createTask(formData);
      
    savePromise
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('Error saving task:', error);
        setError('Failed to save task');
        setLoading(false);
      });
  };

  if (loading && isEditing) return <div>Loading task data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1>{isEditing ? 'Edit Task' : 'Create New Task'}</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            className="form-control"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        {/* Add other form fields as needed */}
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Task'}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;