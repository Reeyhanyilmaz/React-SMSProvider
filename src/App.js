import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import TableList from './components/TableList';
import Error404 from './components/Error404';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Login />} />      
        <Route path="/tableList" element={<TableList />} />     
        <Route path="*" element={<Error404 />} /> 
      </Routes>
    </div>
  );
}

export default App;
