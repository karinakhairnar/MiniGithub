import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div
      style={{
        border:"1pc solid black",
        padding: '1em',
        display:'flex',justifyContent:"space-around",color:"black"
      }}>
       
        <div>
          <Link to='/'>Home</Link>
        </div>
      </div>
  );
};

export default Navbar;
