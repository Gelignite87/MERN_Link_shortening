import 'materialize-css'
import { BrowserRouter } from 'react-router-dom';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './routes';

function App() {
  const { login, logout, token, userId, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  if (!ready) {
    return <Loader/>
  }
  return (
    <AuthContext.Provider value={{login, logout, token, userId, isAuthenticated}}>
      <BrowserRouter>
        {isAuthenticated && <Navbar/>}
        <div className="container">
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
