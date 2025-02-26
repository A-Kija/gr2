import './app.scss';
import About from './Components/About';
import Contacts from './Components/Contacts';
import Home from './Components/Home';
import Main from './Components/Main';
import Nav from './Components/Nav';
import Products from './Components/Products';
import Product from './Components/Product';
import { Router } from './Contexts/Router';
import Login from './Components/Login';
import { Auth } from './Contexts/Auth';
import Logout from './Components/Logout';
import Page401 from './Components/Page401';

function App() {


  return (
    <Router>
      <Auth>
        <Nav />
        <Main>
          <Home />
          <About />
          <Contacts />
          <Products />
          <Product />
          <Login />
          <Logout />
          <Page401 />
        </Main>
      </Auth>
    </Router>
  )
}

export default App
