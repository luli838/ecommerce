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
  return <button style={{ backgroundColor: '#c5c6c8', color: 'black', border: 'none', padding: '5px 10px', borderRadius: '5px', margin: "10px", }} onClick={signout}>Signout</button>;
}

export default Signout;
