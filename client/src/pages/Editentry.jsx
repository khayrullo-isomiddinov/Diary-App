import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EditEntry() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState({ title: '', content: '', date: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/diary/${id}`)
      .then((res) => {
        const { title, content, date } = res.data;
        setEntry({
          title,
          content,
          date: new Date(date).toISOString().split('T')[0],
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://127.0.0.1:8000/api/diary/${id}`, {
        title: entry.title.trim(),
        content: entry.content.trim(),
        date: new Date(entry.date).toISOString(),
      });
      navigate('/diary');
    } catch {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-background">
        <div className="page-container">
          <div className="loading">Loading entry…</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-background">
      <div className="page-container">
        <div className="form-container">
          <h1 className="page-heading">Edit Entry</h1>
          <form onSubmit={handleSubmit} noValidate>
            <label>
              Title
              <input
                type="text"
                value={entry.title}
                onChange={(e) => setEntry({ ...entry, title: e.target.value })}
                required
                placeholder="At least 3 characters"
              />
            </label>

            <label>
              Date
              <input
                type="date"
                value={entry.date}
                onChange={(e) => setEntry({ ...entry, date: e.target.value })}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </label>

            <label>
              Content
              <textarea
                value={entry.content}
                onChange={(e) =>
                  setEntry({ ...entry, content: e.target.value })
                }
                required
                placeholder="At least 10 characters"
              />
            </label>

            <div className="form-actions">
              <button
                type="submit"
                className="button save"
                disabled={loading || entry.title.trim().length < 3 || entry.content.trim().length < 10}
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => navigate('/diary')}
                className="button cancel"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
