import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
// import TaskOverview from './pages/TaskOverview';
// import PrivateRoute from './components/PrivateRoute';

import './App.css';
import "animate.css";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {/* <Route element={<PrivateRoute />}>
          <Route path='/task-overview' element={<TaskOverview />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
