import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../context/Context.js"

export default function Home() {
  let brand = "https://i.ibb.co/Th1z4F4/289149995-551097260005282-677423716.png"
  const { basePizzas, addItemToCart } = useContext(MyContext)
  const navigate = useNavigate();

  const irADetalle = (id) => {
    navigate(`/pizza/${id}`)
  }

  return (
    <div>
      <div className="headofhead">
        <h1>BIENVENIDO A &nbsp;</h1>
        <img src={brand} alt="pizzabrand" />
      </div>

      <div className="container">
      <h1 className="contenedormaximo">ESCOGE TU PIZZA</h1>
        <div className="pizzahome">
          {basePizzas.map((pizza, i) => (
            <div className="prueba" key={i}>
              <img key={pizza.img} src={pizza.img} alt={pizza.name} />
              <div className="pizzainfo">
                <h6 key={pizza.name}>{pizza.name}</h6>
                <ol key={pizza.ingredients}>
                  <li>{pizza.ingredients[0]}</li>
                  <li>{pizza.ingredients[1]}</li>
                  <li>{pizza.ingredients[2]}</li>
                  <li>{pizza.ingredients[3]}</li>
                </ol>
                <p>${" "}{pizza.price}</p>
              </div>
              <div className="botonshome">
                <button onClick={() => irADetalle(pizza.id)} type="button" className="btn btn-outline-danger btn-sm">Detalles</button>
                &nbsp;
                <button onClick={() => addItemToCart(pizza)} type="button" className="btn btn-outline-danger btn-sm">Comprar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}