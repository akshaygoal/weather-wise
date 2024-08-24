

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./HomePage/WeatherHome";
import { StateProvider } from "./Context";

function App() {
  return (
    <div className="App">
      <StateProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </StateProvider>
    </div>
  );
}

export default App;
