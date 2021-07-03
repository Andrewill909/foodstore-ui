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
import Logout from "./pages/Logout";
//guard component
import GuardRoute from './components/GuardRoute';
import GuestRouteOnly from "./components/GuestRouteOnly";

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
          <GuestRouteOnly path="/login" component={Login} />
          <GuestRouteOnly path="/register/berhasil" component={RegisterSuccess} />
          <GuestRouteOnly path="/register" component={Register} />
          <GuardRoute path="/alamat-pengiriman/tambah" component={UserAddressAdd} />
          <GuardRoute path="/alamat-pengiriman/" component={UserAddress} />
          <GuardRoute path="/checkout" component={Checkout} />
          <GuardRoute path="/invoice/:order_id" component={Invoice} />
          <GuardRoute path="/account" component={UserAccount} />
          <GuardRoute path="/pesanan" component={UserOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
