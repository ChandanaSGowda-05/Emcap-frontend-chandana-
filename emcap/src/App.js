import './App.css';
import Header from './Components/Header';
import Employee from './Components/Employee';
import Manager from './Components/Manager';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeDetails from './Components/EmployeeDetails';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" Component={Home}/>
          <Route path="/login" Component={Login}/>
          <Route path="/register" Component={Register}/>
          <Route path="/employee" Component={Employee} />
          <Route path="/manager" Component={Manager} />
          <Route path="/employeedetails/:id" Component={EmployeeDetails} />

          {/* <Route path="*" element={<NotFound/>}/> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
