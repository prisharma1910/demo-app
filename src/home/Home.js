import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/block'>Moving Block</Link></li>
        <li><Link to='/list'>List</Link></li>
        <li><Link to='/grid'>Flexible Grid</Link></li>
      </ul>
    </nav>
  </header>
)

export default Home;
