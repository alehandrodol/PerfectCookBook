import './App.css';
import Landing from './landing/Landing';
import Dishes from './dishes/Dishes';
import Recipes from './recipes/Recipes';
import Recipe from './recipe/Recipe';
import NewRecipe from './recipes/NewRecipe';
import SingInPopUp from './landing/SignInPopUp';
import SingUpPopUp from './landing/SignUpPopUp';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



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
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/create" element={<NewRecipe />} />
    </Routes>
  </Router>
  );
}

export default App;
