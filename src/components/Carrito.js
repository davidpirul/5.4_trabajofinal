import React, { useContext, useEffect } from "react";
import MyContext from "../context/Context";
import { useNavigate } from "react-router-dom";

export default function Carrito() {
  const { cartItems, productsLength, addItemToCart, deleteItemsToCart } = useContext(MyContext);



  const total = cartItems.reduce((previous, current) => previous + current.amount * current.price, 0);

  const backHome = useNavigate();

  const irAHome = () => {
    backHome("/")
   }

  return (
    <div>
      <div className="container carrodetail">
        <div className="container listacompras">
          {cartItems.map((pizza, id) => (
            <>
              <div className="flexito" key={id}>
                <div className="detallenombre">
                  <img src={pizza.img} alt={pizza.name} />
                  &nbsp; &nbsp;
                  <p>{pizza.name}</p>
                </div>

                <div className="detallevalor">
                  <p>${" "}{pizza.amount * pizza.price}</p>
                  &nbsp; &nbsp;
                  <button onClick={() => addItemToCart(pizza)} type="button" className="btn btn-outline-danger btn-sm">+</button>
                  &nbsp; &nbsp;
                  <p>{pizza.amount}</p>
                  &nbsp; &nbsp;
                  <button onClick={() => deleteItemsToCart(pizza)} type="button" className="btn btn-outline-danger btn-sm">-</button>
                </div>
              </div>
            </>
          ))}

          <div className="container totalisimo">
            <p>Total ${total}</p>
            <button onClick={console.log} type="button" className="btn btn-danger btn-lg">Pagar</button>
            &nbsp;
            <button onClick={irAHome} type="button" className="btn btn-outline-danger btn-sm">Volver</button>
          </div>
        </div>

      </div>
    </div >
  );
}