import { NavLink } from "react-router-dom";
import React from "react";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        columnGap: "1em",
        margin: "1rem 0",
      }}
    >
      <button style={{ backgroundColor: '#c5c6c8', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px' }}>
      <NavLink
        to={"/"}
        style={({ isActive }) => (isActive ? { color: "tomato" } : null)}
      >
        Home
      </NavLink>
      </button>
      <button style={{ backgroundColor: '#c5c6c8', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px' }}>
      <NavLink
        to={"/products"}
        style={({ isActive }) => (isActive ? { color: "tomato" } : null)}
      >
        Products
      </NavLink>
      </button>
    </nav>
  );
}

export default Navbar;
