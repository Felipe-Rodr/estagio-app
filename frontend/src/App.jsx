import { createContext, useState } from 'react';
import LoginPage from './pages/login.jsx';
import MainPage from './pages/main.jsx';

export const SessionContext = createContext(null);

function App() {
  const [Session, setSession] = useState(null);
  return (
    <SessionContext.Provider value={{Session, setSession}}>
      {!Session ? <LoginPage/> : <MainPage/>}
    </SessionContext.Provider>
    
  )
}

export default App
