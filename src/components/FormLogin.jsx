import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Register from "./Register";
import Signout from "./Signout";
import Signup from "./Signup";
import { NavLink  } from "react-router-dom";

function FormLogin() {

 const [user, setUser] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false); // Estado para mostrar el formulario de inicio de sesión
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.email);
      }
    });
  }, []);

  const handleBuyClick = () => {
    setShowLoginForm(true); // Cuando se hace clic en "BUY", muestra el formulario de inicio de sesión
  };

  return (
    <>
      <header>
        <h1>User Authentication</h1>
        {user ? (
          <p style={{ fontSize: "24px" }}>{user}</p>
        ) : (
          <p style={{ fontSize: "24px" }}>No user...</p>
        )}
      </header>
      {showLoginForm ? (

        <div> 
          <LoginForm />
        </div>
      ) : !user ? (
        <>
          <Register />
          <br />
          <hr />
          <Signup setUser={setUser} />
        </>
      ) : (
        <>
          <h3>Welcome to our wonderful app!</h3>
          <Signout setUser={setUser} />
        </>
      )}
     <nav>
        <button style={{ backgroundColor: '#c5c6c8', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', margin: "10px", }}>
        <NavLink
          to={-1}
        >
          Back
        </NavLink>
        </button>
      </nav>

    </>
  );
 }

export default FormLogin;
