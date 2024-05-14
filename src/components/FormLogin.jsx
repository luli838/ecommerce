import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Register from "./Register";
import Signout from "./Signout";
import Signup from "./Signup";
import Cart from "./Cart";

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
    console.log("showLoginForm:", showLoginForm)
  };

  return (
    <>
      <header>
        <h1>Firebase Authentication</h1>
        {user ? (
          <p style={{ fontSize: "24px" }}>{user}</p>
        ) : (
          <p style={{ fontSize: "24px" }}>No user...</p>
        )}
      </header>
      {showLoginForm ? (
        console.log("Rendering LoginForm..."),
        <div> {/* Muestra el formulario de inicio de sesión si showLoginForm es true */}
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
       <Cart handleBuyClick={handleBuyClick} /> 
    </>
  );
}

export default FormLogin;
