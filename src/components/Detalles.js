import React, { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MyContext from "../context/Context";

export default function Detalles() {
  const { basePizzas, pizzaDetail, setPizzaDetail, ingredientes, setIgredients } = useContext(MyContext);
  const { id } = useParams();

  const backHome = useNavigate();

  const irAHome = () => {
    backHome("/")
   }

  useEffect(() => {

    const obtenerDatos = () => {
      const datosPizza = basePizzas.find((pizza) => pizza.id === id);
      setPizzaDetail(datosPizza || {});
      setIgredients(datosPizza.ingredients);
    };

    obtenerDatos();
  }, [basePizzas, id, setPizzaDetail, setIgredients]);

  return (
    <div>
      <div className="detailcont container">
        <div>
          <img className="pimg" src={pizzaDetail.img} alt={pizzaDetail.name} />
        </div>
        <div className="textcontent">
          <h1 className="pname">{pizzaDetail.name}</h1>
          <p className="pdesc">{pizzaDetail.desc}</p>
          {ingredientes.map((ingrediente, i) =>
            <ul className="pingr" key={i}>
              <li>{ingrediente}</li>
            </ul>
          )}
          <br></br>
          <p className="pprice">${" "}{pizzaDetail.price}</p>
          <div>
            <button onClick={irAHome} type="button" className="btn btn-outline-danger btn-sm">Volver</button>
            &nbsp;
            <button type="button" className="btn btn-outline-danger btn-sm">Comprar</button>
          </div>
        </div>

      </div>
    </div>
  )
}