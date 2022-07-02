import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from './Components/Login';
import Table from './Components/Table';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />      
        <Route path="/table" element={<Table />} />      
      </Routes>
    </div>
  );
}

export default App;
