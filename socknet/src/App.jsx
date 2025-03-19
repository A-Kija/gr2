import { Route, Routes } from 'react-router';
import Home from './Pages/Home';
import Chat from './Pages/Chat';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import Nav from './Components/Nav';
import Page404 from './Pages/page404';
import Body from './Components/Body';
import { DataProvider } from './Contexts/Data';
import { AuthProvider } from './Contexts/Auth';


function App() {
  console.log('--------APP---------');
  return (
    <AuthProvider>
      <DataProvider>
        <Body>
          <Nav />
          <Routes>
            <Route index element={<Home />} />
            <Route path="chat" element={<Chat />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Body>
      </DataProvider>
    </AuthProvider>
  )
}

export default App
