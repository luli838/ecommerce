import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { NavLink  } from "react-router-dom";

function Signup({ setUser }) {
  const [error, setError] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        setUser(userCredential.user.email);
        setError(null);
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.error(errorCode);
        setError("Invalid email or password");
      });
  };
  return (
    <>
      <h2>Signup Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" placeholder="janeDoe@mail.com" name="email" />
        </label>
        <label>
          Password:
          <input
            type="password"
            placeholder="keep your password secure"
            name="password"
          />
        </label>
        <p style={{ color: "tomato" }}>{error}</p>
        
        <button style={{ backgroundColor: '#c5c6c8', color: 'black', border: 'none', padding: '5px 10px', borderRadius: '5px', margin: "10px", }} type="submit">Signup</button>
          
      </form>
    </>
  );
}

export default Signup;
