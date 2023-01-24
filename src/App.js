import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppHeader from "./component/header";
import AppFooter from "./component/footer";
import Topbar from "./component/topbar";
import DashBoard from "./pages/dashboard";
import Staking from "./pages/staking";

import { motion } from "framer-motion";

import "./App.css";
function App() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5, delay: 0.1 }}>
      <div className="main-section">
        <Router>
          <AppHeader />
          <Topbar />
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/staking" element={<Staking />} />
          </Routes>
          <AppFooter />
        </Router>
      </div>
    </motion.section>
  );
}

export default App;
