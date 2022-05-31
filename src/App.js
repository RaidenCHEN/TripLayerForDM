import React from 'react';
import './App.css';
import trip from './components/trip';
import empty from './components/empty';
import { Route, BrowserRouter} from 'react-router-dom';

function App() {
  return (
     <div className="App">
      <BrowserRouter>
      <div>
        <Route path="/trip" exact component={trip}></Route>
        <Route path="/" exact component={trip}></Route>
        <Route path="/empty" exact component={empty}></Route>
      </div>
    </BrowserRouter>
    </div>
  )
}

export default App;