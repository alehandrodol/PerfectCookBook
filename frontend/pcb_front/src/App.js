import './App.css';
import Landing from './landing/Landing'
import Dishes from './dishes/Dishes'
import SingInPopUp from './landing/SignInPopUp'
import SingUpPopUp from './landing/SignUpPopUp'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"



function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* тут будут еще маршруты */}
      {/* тут будут еще маршруты */}
      {/* <Route path="/sign_in" element={<SingInPopUp />} /> 
      <Route path="/sign_up" element={<SingUpPopUp />} />  */}

      <Route path="/dishes" element={<Dishes />} /> 
    </Routes>
  </Router>
  );
}

export default App;
