import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components and Pages
import Navbar from "./components/common/Navebar";
import Footer from "./components/common/Footer";
import Home from "./components/pages/Home";
import Add from "./components/cruds/Add";
import Table from "./components/cruds/Table";
import Details from "./components/cruds/Details";
import Edit from "./components/cruds/Edit";
import Delete from "./components/cruds/Delete";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/api/" element={<Home />} />
          <Route exact path="/cruds" element={<Table />} />
          <Route exact path="/cruds/new" element={<Add />} />
          <Route exact path="/cruds/:id" element={<Details />} />
          <Route exact path="/cruds/:id/edit" element={<Edit />} />
          <Route exact path="/cruds/:id/delete" element={<Delete />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
