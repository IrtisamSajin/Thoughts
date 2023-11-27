import { useState } from "react";
import ViewThoughts from "../Components/ViewThoughts";

import jwtDecode from "jwt-decode";
import Navbar from "../Components/Navbar";
import NewThought from "../Components/NewThought";

function isExpired(token) {
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return currentTime > decodedToken.exp;
}


export default function Thoughts() {
  var token = localStorage.getItem("token");
  //const [sessionActive,setsessionActive]=useState(true);
  var sessionActive=true;
  if (!token || isExpired(token))sessionActive=false ;//setsessionActive(false);

  ///------Here if session active fetch the thoughts from server
  ///-------If can't connect to the server set sessionActive to false
  var previousThoughts = JSON.parse(localStorage.getItem("thoughts"));
  if (!previousThoughts) previousThoughts = [];


  const [thoughts, setThoughts] = useState(previousThoughts);

  const URL = import.meta.env.VITE_SERVER_URL + "/thoughts";

  async function updateThoughts(updatedThoughts) {
    if (sessionActive) {
      try {
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedThoughts),
        });
        localStorage.setItem("thoughts", JSON.stringify(updatedThoughts));
        setThoughts(updatedThoughts);
      } catch (err) {
        return false;
      }
    }else{
      localStorage.setItem("thoughts", JSON.stringify(updatedThoughts));
      setThoughts(updatedThoughts);
    }
    return true;
  }

  return (
    <>
      <Navbar sessionActive={sessionActive} />
      <div className="container justify-content-center">
        <NewThought onUpdate={updateThoughts} thoughts={thoughts}/>
        <ViewThoughts onUpdate={updateThoughts} thoughts={thoughts} />
      </div>
    </>
  );
}
