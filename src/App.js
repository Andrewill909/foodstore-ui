import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "upkit/dist/style.min.css";

//component
import Home from "./pages/Home";
import Register from "./pages/Register";
import RegisterSuccess from './pages/RegisterSuccess';
import Login from './pages/Login';
import UserAddressAdd from "./pages/UserAddressAdd";
import UserAddress from "./pages/UserAddress";
import Checkout from "./pages/Checkout";
import Invoice from "./pages/Invoice";
import UserAccount from './pages/UserAccount';
import UserOrders from "./pages/UserOrders";

//redux
import { Provider } from "react-redux";
import store from "./app/store";
import {getCart} from './api/cart';

//import listener funct
import {listen} from './app/listener';

function App() {

  React.useEffect(() => {
    listen();
    getCart();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register/berhasil" component={RegisterSuccess} />
          <Route path="/register" component={Register} />
          <Route path="/alamat-pengiriman/tambah" component={UserAddressAdd} />
          <Route path="/alamat-pengiriman/" component={UserAddress} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/invoice/:order_id" component={Invoice} />
          <Route path="/account" component={UserAccount} />
          <Route path="/pesanan" component={UserOrders} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
