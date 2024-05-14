import { auth } from "../firebase";

function Signout({ setUser }) {
  const signout = () => {
    auth
      .signOut()
      .then(() => setUser(null))
      .catch((err) => {
        console.error(err);
      });
  };
  return <button onClick={signout}>Signout</button>;
}

export default Signout;
