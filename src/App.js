import Editor from './Editor';
import Home from './Home';
import NavBar from './NavBar';
import About from './About';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/demo'>
            <NavBar></NavBar>
            <Home></Home>
          </Route>
          <Route exact path='/about'>
            <NavBar></NavBar>
            <About></About>
          </Route>
          <Route exact path='/'>
            <NavBar></NavBar>
            <About></About>
          </Route>

        </Switch>
      </Router>

    </div>
  );
}

export default App;
