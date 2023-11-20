import React from 'react';
import { useState, useEffect } from 'react';
import Homeimage from './Homeimage';
import Navber from './HomeNavBar';
import './Home.css';
import Footer from '../Footer';

function Home() {
  const [availableHeight, setAvailableHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateAvailableHeight = () => {
      // Get the height of the navbar by its ref or class name
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      // Calculate the available height by subtracting the navbar height from the window inner height
      const newAvailableHeight = window.innerHeight - navbarHeight;
      setAvailableHeight(newAvailableHeight);
    };
  
    // Update the available height on mount and whenever the window is resized
    window.addEventListener("resize", updateAvailableHeight);
    updateAvailableHeight();
  
    // Cleanup the event listener when the component is unmounted
    return () => window.removeEventListener("resize", updateAvailableHeight);
  }, []);

  return (
    <div className="bg-dark" >
      <Navber />
      <div style={{
          display: "flex",
          flexDirection: "column",
          height: `${availableHeight}px`,
        }}>
      <Homeimage />
      
      <Footer />
      </div>
    </div>
  );
}

export default Home;