import React from "react";
import "../App.css"

function Header() {
  return (
    <header className="jumbotron" style={{backgroundColor: "#032d5f"}}>
      <div className="container text-white">
        <h1 className="display-4 nintendoFont">Memory Match</h1>
        <p className="lead">How good is your memory?</p>
      </div>
    </header>
  );
}

export default Header;
