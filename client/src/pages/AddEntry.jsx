import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TextInput({ label, type = 'text', value, onChange, required = false, minLength = 0, error, ...rest }) {
  return (
    <div className="form-group">
      <label>
        {label}
        <input
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          minLength={minLength}
          aria-invalid={!!error}
          aria-describedby={error ? `${label.replace(/\s+/g, '')}-error` : undefined}
          className={`text-input ${error ? 'input-error' : ''}`}
          {...rest}
        />
      </label>
      {error && (
        <p id={`${label.replace(/\s+/g, '')}-error`} className="error-text">
          {error}
        </p>
      )}
    </div>
  );
}

function TextArea({ label, value, onChange, required = false, minLength = 0, error, ...rest }) {
  return (
    <div className="form-group">
      <label>
        {label}
        <textarea
          value={value}
          onChange={onChange}
          required={required}
          minLength={minLength}
          aria-invalid={!!error}
          aria-describedby={error ? `${label.replace(/\s+/g, '')}-error` : undefined}
          className={`text-area ${error ? 'input-error' : ''}`}
          {...rest}
        />
      </label>
      {error && (
        <p id={`${label.replace(/\s+/g, '')}-error`} className="error-text">
          {error}
        </p>
      )}
    </div>
  );
}

export default function AddEntry() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [dateFromInput, setDateFromInput] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({ title: '', content: '' });

  const navigate = useNavigate();

  const validateFields = () => {
    const errors = { title: '', content: '' };

    if (title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters.';
    }

    if (content.trim().length < 10) {
      errors.content = 'Content must be at least 10 characters.';
    }

    return errors;
  };

  useEffect(() => {
    setFieldErrors(validateFields());
  }, [title, content]);

  const isFormValid = () => {
    const errors = validateFields();
    return !errors.title && !errors.content;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const errors = validateFields();
    if (errors.title || errors.content) {
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const baseURL = 'http://127.0.0.1:8000';
      const payload = { title: title.trim(), content: content.trim(), date: dateFromInput };

      const response = await axios.post(`${baseURL}/api/diary`, payload, {
        headers: { Accept: 'application/json' },
        timeout: 5000, 
      });

      navigate('/diary');
    } catch (err) {
      if (err.response) {
        setErrorMessage(`Server error: ${err.response.status} – ${err.response.data?.message || 'Unknown.'}`);
      } else if (err.request) {
        setErrorMessage('No response from server. Please check your network or CORS settings.');
      } else {
        setErrorMessage(`Unexpected error: ${err.message}`);
      }
      console.error('AddEntry error:', err);
      setLoading(false);
    }
  };

  return (
    <div className="page-background">
      <div className="form-container">
        <h1 className="page-heading">Enter your note</h1>

        {errorMessage && (
          <div className="global-error" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="modern-form">
          <TextInput
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            minLength={3}
            error={fieldErrors.title}
          />

          <TextInput
            label="Date"
            type="date"
            value={dateFromInput}
            onChange={(e) => setDateFromInput(e.target.value)}
            required
          />

          <TextArea
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            minLength={10}
            error={fieldErrors.content}
            rows={6}
          />

          <div className="form-actions">
            <button
              type="submit"
              className="button save"
              disabled={loading || !isFormValid()}
            >
              {loading ? 'Saving…' : 'Save'}
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
  );
}
