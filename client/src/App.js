import logo from './assets/logo.svg';
import './App.css';
import CreatePost from './pages/CreatePost';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faImages} from "@fortawesome/free-solid-svg-icons"
import Home from './pages/Home';
// import Card from './components/Card';
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div style={{backgroundColor:'aquamarine'}}>

      
      

      
      <header className="w-100 d-flex justify-content-between align-items-center px-4 py-4 border-bottom" style={{ borderBottomColor: "#e6ebf4",backgroundColor:'#EAE7AF'}}>
  <Link to="/">
    <div>
    <i class="fa-solid fa-Images fa-3x">
    
      <FontAwesomeIcon icon={faImages} style={{color: "#202020",}} />
      <a className='projheading display-4' style={{color:'#FD367E'}}>ImagiCraft</a>
      </i>
    </div>
    
  </Link>

  <Link to="/create" className="btn btn-primary">Create</Link>
</header>

<Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/create" element={<CreatePost/>}/>
        
      </Routes>


    </div>
  );
}

export default App;
