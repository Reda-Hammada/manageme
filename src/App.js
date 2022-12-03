import  {BrowserRouter as Router,Routes,Route, }  from 'react-router-dom'
import Home from './pages/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    
    // define app routes
    <div className="App">

       <Routes>

           <Route  path='/'  element={<Home />} />
           <Route path='/login' element={<Login />} />
           <Route path='/signup' element={<Register />} />
           <Route path='/dashboard' element={<Dashboard />} />

       </Routes>

    </div>
  );
}

export default App;
