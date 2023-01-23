import { BrowserRouter as Router } from "react-router-dom";
import AppHeader from "./component/main";
import Footer from "./component/footer";

import { motion } from "framer-motion";

import "./App.css";
import { useState } from "react";
function App() {
  const [preloadState, setPreloadState] = useState(true);

  setInterval(() => {
    setPreloadState(false);
  }, 5000);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5, delay: 0.5 }}>
      <div className="metaverse_fn_main">
        {preloadState && (
          <div className="metaverse_fn_preloader">
            <div className="multi-spinner-container">
              <div className="multi-spinner">
                <div className="multi-spinner">
                  <div className="multi-spinner">
                    <div className="multi-spinner">
                      <div className="multi-spinner">
                        <div className="multi-spinner"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Router></Router>
      </div>
    </motion.section>
  );
}

export default App;
