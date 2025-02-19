import './app.scss';
import About from './Components/About';
import Contacts from './Components/Contacts';
import Home from './Components/Home';
import Main from './Components/Main';
import Nav from './Components/Nav';
import Products from './Components/Products';
import { Router } from './Contexts/Router';

function App() {


  return (
    <Router>
      <Nav />
      <Main>
        <Home />
        <About />
        <Contacts />
        <Products />
      </Main>
    </Router>
  )
}

export default App
