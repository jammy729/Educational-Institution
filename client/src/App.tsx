import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/index.tsx";
import Details from "./pages/details/:id.tsx";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
