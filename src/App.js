// import "./App.css";
// import LoginForm from "./Components/LoginForm/LoginForm";
// import RegisterForm from "./Components/LoginForm/RegisterForm";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./HomePage/WeatherHome";

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Routes>
//           <Route path="/" element={<RegisterForm />} />

//           <Route path="/login" element={<LoginForm />} />
//           <Route path="/home" element={<Home />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

import "./App.css";
import LoginForm from "./Components/LoginForm/LoginForm";
import RegisterForm from "./Components/LoginForm/RegisterForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./HomePage/WeatherHome";
import { StateProvider } from "./Context";

function App() {
  return (
    <div className="App">
      <StateProvider>
        <Router>
          <Routes>
            <Route path="/" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </StateProvider>
    </div>
  );
}

export default App;
