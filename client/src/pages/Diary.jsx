import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Diary() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/diary')
      .then(res => setEntries(res.data))
      .catch(err => console.error('Error loading entries:', err));
  }, []);

  if (entries.length === 0) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="page-background p-4">
      <div className="list-container max-w-7xl mx-auto">
        <div className="header-block flex justify-between items-center mb-6">
          <h1 className="page-heading text-3xl font-bold">My Thoughts</h1>
          <Link
            to="/diary/add"
            className="button save custom-add-btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add thoughts
          </Link>
        </div>
        <div
          className="grid grid-cols-3 gap-6"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--spacing-lg)'
          }}
        >
          {entries.map(entry => (
            <div
              key={entry.id}
              className="entry-card bg-white shadow-md rounded-lg p-4"
            >
              <h3 className="entry-title text-xl font-semibold">
                {entry.title}
              </h3>
              <p className="entry-date text-sm text-gray-500 mb-2">
                {new Date(entry.date).toLocaleDateString()}
              </p>
              <p className="entry-content text-gray-700 mb-4">
                {entry.content}
              </p>
              <Link
                to={`/diary/edit/${entry.id}`}
                className="button cancel custom-edit-btn text-blue-600 hover:underline"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Diary;
