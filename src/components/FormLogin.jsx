import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Register from "./Register";
import Signout from "./Signout";
import Signup from "./Signup";


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log('Login successful');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
*/

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
    
    </>
  );
 }

export default FormLogin;
