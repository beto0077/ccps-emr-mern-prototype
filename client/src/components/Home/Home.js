import React from 'react';
import Homeimage from './Homeimage';
import Navber from './HomeNavBar';
import './Home.css';
import Footer from '../Footer';
import Mission from './Mission';

function Home() {
  return (
    <div className="bg-dark">
      <Navber />
      <div>
      <Homeimage />
      <Mission />
      <br />
      <br />
      <Footer />
      </div>
    </div>
  );
}

export default Home;