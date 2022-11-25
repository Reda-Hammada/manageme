import  {BrowserRouter as Router,Routes,Route, BrowserRouter}  from 'react-router-dom'
import Home from './pages/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register';

function App() {
  return (

    // define app routes
    <div className="App">

       <Routes>

           <Route  path='/'  element={<Home />} />
           <Route path='/login' element={<Login />} />
           <Route path='/signup' element={<Register />} />

       </Routes>
    </div>
  );
}

export default App;
