import './App.css';
//import {ClassState} from './ClassState.js';
import { UseReducer } from './UseReducer';
//import { UseState } from './UseState.js';


function App() {
  
  return (
    <div className="App">
    {/*  <UseState name="UseState"/>
      <ClassState name="classState"/>*/}
      <UseReducer name="Use reducer"/>
    </div>
  );
}

export default App;
