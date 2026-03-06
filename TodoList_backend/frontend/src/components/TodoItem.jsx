import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [loading, setLoading] = useState(false);

  const handleToggleComplete = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/todos/${todo.id}`, {
        completed: !todo.completed
      });
      onUpdate(response.data);
    } catch (error) {
      console.error('Error updating todo:', error);
      alert('Failed to update todo');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!editText.trim() || editText === todo.text) {
      setIsEditing(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/todos/${todo.id}`, {
        text: editText.trim()
      });
      onUpdate(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
      alert('Failed to update todo');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;
    
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/todos/${todo.id}`);
      onDelete(todo.id);
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('Failed to delete todo');
    } finally {
      setLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
          disabled={loading}
        />
        <button
          onClick={handleEdit}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
        >
          Save
        </button>
        <button
          onClick={() => setIsEditing(false)}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
        disabled={loading}
        className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500 cursor-pointer"
      />
      <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
        {todo.text}
      </span>
      <div className="text-xs text-gray-400">
        {new Date(todo.createdAt).toLocaleDateString()}
      </div>
      <button
        onClick={() => setIsEditing(true)}
        disabled={loading}
        className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:opacity-50"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        disabled={loading}
        className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;