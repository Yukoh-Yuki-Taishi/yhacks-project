import './App.css';
import Voice from './Components/Voice/Voice';
// import Record from './Components/Record';
import StartPage from './Components/StartPage/StartPage';
import Suggestions from './Components/Suggestions/Suggestions';
import Final from './Components/Final/Final';

import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App" >
      <link href="https://fonts.googleapis.com/css2?family=Kalam:wght@700&family=Sriracha&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet"/>
      <Routes>
        <Route path="/" element={ <StartPage/> } /> 
        <Route path="/voice" element={ <Voice/>  } />
        <Route path="/suggestions" element={ <Suggestions/>  } />
        <Route path="/final" element={ <Final/>  } />
        {/* <Route path="/record" element={ <Record/>  } /> */}
        {/* <Record/> */}
      </Routes>
      {/* <Voice/>  */}
    </div>
  );
}

export default App;
