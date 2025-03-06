import { Route, Routes } from 'react-router';
import Home from './Pages/Home';
import Chat from './Pages/Chat';
import Nav from './Components/Nav';
import Page404 from './Pages/page404';
import Body from './Components/Body';
import { DataProvider } from './Contexts/Data';

function App() {

  return (
    <DataProvider>
      <Body>
        <Nav />
        <Routes>
          <Route index element={<Home />} />
          <Route path="chat" element={<Chat />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Body>
    </DataProvider>
  )
}

export default App
