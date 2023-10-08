import './App.css';
import Landing from './landing/Landing'
import SingInPopUp from './landing/SignInPopUp'
import SingUpPopUp from './landing/SignUpPopUp'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"



function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Landing />} />
      {/* тут будут еще маршруты */}
      <Route path="/sign_in" element={<SingInPopUp />} /> 
      <Route path="/sign_up" element={<SingUpPopUp />} /> 
    </Routes>
  </Router>
  );
}

export default App;
