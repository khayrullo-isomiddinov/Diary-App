import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Diary from './pages/Diary';
import AddEntry from './pages/AddEntry';
import EditEntry from './pages/Editentry';
import Navbar from './components/navbar'; 

const DiaryContext = createContext();
export function useDiary() {
  return useContext(DiaryContext);
}

function App() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('diaryEntries');
    if (stored) setEntries(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (title, content, date) => {
    const newEntry = { id: Date.now().toString(), title, content, date };
    setEntries(prev => [newEntry, ...prev]);
  };

  const updateEntry = (id, updatedFields) => {
    setEntries(prev => prev.map(e => (e.id === id ? { ...e, ...updatedFields } : e)));
  };

  const deleteEntry = id => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setEntries(prev => prev.filter(e => e.id !== id));
    }
  };

  const contextValue = { entries, addEntry, updateEntry, deleteEntry };

  return (
    <DiaryContext.Provider value={contextValue}>
      <div className="app-wrapper">
        <div className="navbar-spacer" /> {}
        <Navbar /> {}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/diary/add" element={<AddEntry />} />
            <Route path="/diary/edit/:id" element={<EditEntry />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </DiaryContext.Provider>
  );
}

export default App;
