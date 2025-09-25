import React from 'react'

export default function Header(){
  return (
    <header id="navbar">
      <div className="container">
        <h1>Erik</h1>
        <nav className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <button className="terminal-toggle">Terminal</button>
        </nav>
      </div>
    </header>
  )
}