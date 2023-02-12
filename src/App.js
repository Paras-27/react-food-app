// Should start with function keyword /arrow functions
//component name starts with capital
// you should have component body(jsx) + component logic
// export that component to use outside


import { createContext, useState } from "react";
import './App.css'
import Homepage from './pages/homepages';
import ThemeButton from "./components/theme-button";

export const ThemeContext=createContext(null)

function App() {

  const [theme,setTheme]=useState(false)
  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
    }}>
    <div className="App" style={theme ? {backgroundColor :"#feb300"}:{}}>
      <ThemeButton/>
      <Homepage/>
    </div>
    </ThemeContext.Provider> 
  )
}

export default App;