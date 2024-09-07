import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState } from 'react';
import Navigation from './components/Navigation';

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (

    <div className="app">
        <header>
          <h1>Excercise Tracker</h1>
          <p>This web apps allows you to track and store your exercises. They are stored indefinitely until you delete or edit them.</p>
        </header>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}></Route>
            <Route path="/add-exercise" element={ <AddExercisePage />}></Route>
            <Route path="/edit-exercise" element={ <EditExercisePage exerciseToEdit={exerciseToEdit}/>}></Route>
          </Routes>
        </Router>
        <footer>
          <p>© 2024 Tre Wenger</p>
        </footer>
    </div>
  );
}

export default App;