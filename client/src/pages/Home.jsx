import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [stats, setStats] = useState({
    count: 0,
    earliest: null,
    latest: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/diary');
        const entries = res.data;

        if (!Array.isArray(entries) || entries.length === 0) {
          setStats({ count: 0, earliest: null, latest: null, loading: false, error: null });
          return;
        }

        const dates = entries.map((e) => new Date(e.date));
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));

        const pad = (n) => String(n).padStart(2, '0');
        const fmt = (d) =>
          `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;

        setStats({
          count: entries.length,
          earliest: fmt(minDate),
          latest: fmt(maxDate),
          loading: false,
          error: null,
        });
      } catch (err) {
        console.error(err);
        setStats((s) => ({
          ...s,
          loading: false,
          error: 'Could not load diary statistics.',
        }));
      }
    }

    fetchStats();
  }, []);

  return (
    <div className="page-background">
      <div className="page-container">
        <div className="content-box">
          <h1 className="page-heading">Hi, I am your Safe Space!</h1>
          <p className="home-intro">
            This is your personal space to jot down thoughts, experiences, and
            inspirations. Every entry is private, cozy, and styled like a
            classic journal.
          </p>
          <div className="flex-center" style={{ marginTop: 'var(--spacing-md)' }}>
            <img
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Open diary on wooden desk"
              style={{
                width: '100%',
                maxWidth: '500px',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-medium)',
              }}
            />
          </div>
        </div>

        <div className="content-box" style={{ marginTop: 'var(--spacing-lg)' }}>
          {stats.loading ? (
            <p className="stats">Loading diary statistics…</p>
          ) : stats.error ? (
            <p className="stats">{stats.error}</p>
          ) : stats.count === 0 ? (
            <p className="stats">No entries yet. <Link to="/diary" style={{ color: 'var(--color-accent)' }}>Create your first entry.</Link></p>
          ) : (
            <p className="stats">
              {stats.count} entr{stats.count === 1 ? 'y' : 'ies'} between{' '}
              <strong>{stats.earliest}</strong> and <strong>{stats.latest}</strong>.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
