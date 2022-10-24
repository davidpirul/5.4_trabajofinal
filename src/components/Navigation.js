import React, { useContext } from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import MyContext from "../context/Context";

export default function Navigation() {
  const {productsLength} = useContext(MyContext);

  let bag = "https://i.ibb.co/DMsTFz2/app-bits-156918.png"

  return (
    <div>

      <Navbar bg="dark" variant="dark" className="d-flex justify-content-evenly">
        <Link to="/">
        <Navbar.Brand>THE BLACK PIZZA</Navbar.Brand>
        </Link>
        <Link to="/carrito">
        <div className="bagicon"><img width="30" height="30" src={bag} alt="pizzabag" />{" "}{productsLength}</div>
        </Link>
      </Navbar>
      

    </div>
  )
}