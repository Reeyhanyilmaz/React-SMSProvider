import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from './Components/Login';
import TableList from './Components/TableList';
import Error404 from './Components/Error404';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />      
        <Route path="/tableList" element={<TableList />} />     
        <Route path="*" element={<Error404 />} /> 
      </Routes>
    </div>
  );
}

export default App;
