import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user.email;
        console.log(user);
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.error(errorCode);
        console.error(errorMessage);
      });
  };
  return (
    <>
      <h2>Register Form</h2>
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
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default Register;