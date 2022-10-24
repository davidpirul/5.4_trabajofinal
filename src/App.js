import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyContext from "./context/Context.js"
import './App.css';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Detalles from './components/Detalles.js';
import Carrito from './components/Carrito.js';

function App() {
  const baseUrl = "/pizzas.json";
  const [basePizzas, setBasePizza] = useState([])
  const [pizzaDetail, setPizzaDetail] = useState([])
  const [ingredientes, setIgredients] = useState([])
  const [productsLength, setProductsLength] = useState(0)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const pizzasEnLocalStorage = localStorage.getItem("cartProducts");
      return pizzasEnLocalStorage ? JSON.parse(pizzasEnLocalStorage) : [];
    } catch (error) {
      return []
    }
  });

  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartItems))
  }, [cartItems]);

  useEffect(() => {
    setProductsLength(cartItems.reduce((previous, current) => previous + current.amount, 0))
  }, [cartItems]);

  const addItemToCart = (pizza) => {
    const inCart = cartItems.find((pizzaInCart) => pizzaInCart.id === pizza.id);

    if (inCart) {
      setCartItems(
        cartItems.map((pizzaInCart) => {
          if (pizzaInCart.id === pizza.id) {
            return { ...inCart, amount: inCart.amount + 1 }
          } else return pizzaInCart;
        })
      );
    } else {
      setCartItems([...cartItems, { ...pizza, amount: 1 }])
    }
  }

  const deleteItemsToCart = (pizza) => {
    const inCart = cartItems.find((pizzaInCart) => pizzaInCart.id === pizza.id);

    if (inCart.amount === 1) {
      setCartItems(
        cartItems.filter((pizzaInCart) => pizzaInCart.id !== pizza.id)
      );
    } else {
      setCartItems(
        cartItems.map((pizzaInCart) => {
          if (pizzaInCart.id === pizza.id) {
            return { ...inCart, amount: inCart.amount - 1 };
          } else return pizzaInCart;
        })
      );
    }
  };

  const estadoCompartido = { productsLength, setProductsLength, addItemToCart, deleteItemsToCart, cartItems, setCartItems, basePizzas, pizzaDetail, setPizzaDetail, ingredientes, setIgredients }

  useEffect(() => {
    const obtPizzas = async () => {
      const resp = await fetch(baseUrl);
      const data = await resp.json();
      console.log(data)
      setBasePizza(data)

    }
    obtPizzas()
  }, [])


  return (


    <div className="App">
      <header className="App-header">


        <Container>
          <BrowserRouter>
            <MyContext.Provider value={estadoCompartido}>
              <Navigation />
              <Routes>
                <Route path="/pizza/:id" element={<Detalles />} />
                <Route path="/" element={<Home />} />
                <Route path="/carrito" element={<Carrito />} />
              </Routes>
            </MyContext.Provider>
          </BrowserRouter>

        </Container>


      </header>
    </div>


  );
}

export default App;
