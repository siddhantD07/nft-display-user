import './App.css';
import {useSelector, useDispatch} from "react-redux";
import { bindActionCreators} from "redux";
import {actionCreators} from "./state/index";

import Header from './components/Header';
import Steps from './components/Steps';

function App() {

  return(
    <div>
    <Header/>
    <Steps/>
    </div>
  )

}

export default App;
