import { useState } from "react";
import Header from "./Components/General/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart"
import CartProvider from "./Store/CartProvider";
function App() {
  const [cartShown, setCartShown] = useState(false)

  const showCardHandler = () => {
    setCartShown(true)
  }
  const hideCartHandler = () => {
    setCartShown(false)
  }

  return (
      <CartProvider>
      {cartShown && <Cart onHide={hideCartHandler} />}
      <Header onShow={showCardHandler} onHide={hideCartHandler} />
      <main>
        <Meals />
      </main>
      </CartProvider>
    
  );
}

export default App;
