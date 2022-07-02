import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from './Components/Login';
import Table from './Components/Table';
import Error404 from './Components/Error404';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />      
        <Route path="/table" element={<Table />} />     
        <Route path="*" element={<Error404 />} /> 
      </Routes>
    </div>
  );
}

export default App;
