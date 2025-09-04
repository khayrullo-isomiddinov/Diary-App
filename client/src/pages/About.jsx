import React from 'react';
import '../index.css';

export default function About() {
  return (
    <div className="page-background">
      <div className="page-container">
        <div className="about-container">
          <h2>About the Author</h2>

          <p><strong>Name:</strong> Khayrullo Isomiddinov</p>
          <p><strong>Neptun ID:</strong> BET9FI</p>
          <p>
            <strong>Email:</strong>{' '}
            <a href="mailto:harry@example.com">bet9fi@inf.elte.hu</a>
          </p>

          <p>
            Hi, I’m Harry. This diary app is my Advanced Web Programming project.
            I’m a Computer Science student, and I built this application to
            practice modern React, RESTful APIs, and CSS variables. Thank you
            for stopping by – I hope you enjoy using it!
          </p>
        </div>
      </div>
    </div>
  );
}
