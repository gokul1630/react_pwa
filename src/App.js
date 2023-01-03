import logo from './logo.svg';
import './App.css';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {Link, Route, BrowserRouter as Router, Routes, NavLink} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Users from './Users';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <NavLink className="nav-link" to="/">Home</NavLink>
              <NavLink className="nav-link" to="/about">About</NavLink>
              <NavLink className="nav-link" to="/users">Users</NavLink>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route element={<About />} path="/about"></Route>
          <Route element={<Users />} path="/users"></Route>
          <Route element={<Home />} path="/"></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
