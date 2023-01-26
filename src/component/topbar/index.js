import { motion } from "framer-motion";

import { Link, useLocation } from "react-router-dom";

export default function Topbar() {
  const location = useLocation();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5, delay: 0.5 }}>
      <div className="lg:flex lg:px-10 md:px-20 mt-20 px-5 sm:px-10 w-full xl:px-40 z-50">
        <h1 className="lg:text-left lg:w-2/5 mb-2 sm:text-4xl text-4xl text-center text-white uppercase">
          {location.pathname.split("/")[1] === ""
            ? "Savanna"
            : location.pathname.split("/")[1] === "staking"
            ? "Staking"
            : "Unstaking"}
        </h1>
        <div className="bg-custom-blur border-2 border-custom border-opacity-20 flex lg:w-3/5 rounded-full">
          <Link
            to={"/"}
            className={`border-custom border-opacity-20 border-r-2 cursor-pointer duration-150
           hover:bg-green-700 lg:py-4 px-5 py-2 rounded-l-full text-center w-full ${
             location.pathname.split("/")[1] === "" ? `bg-green-700` : ""
           }`}>
            <h1 className="sm:text-lg text-white text-xs">Savanna</h1>
          </Link>
          <Link
            to={"/staking"}
            className={`border-custom border-opacity-20 border-r-2 cursor-pointer
           duration-150 hover:bg-green-700 lg:py-4 px-7 py-2 text-center w-full ${
             location.pathname.split("/")[1] === "staking" ? `bg-green-700` : ""
           }`}>
            <h1 className="sm:text-lg text-white text-xs">Go Hunt</h1>
          </Link>{" "}
          <Link
            to={"/unstake"}
            className={`cursor-pointer duration-150 hover:bg-green-700
           lg:py-4 px-7 py-2 rounded-r-full text-center w-full ${
             location.pathname.split("/")[1] === "unstake" ? `bg-green-700` : ""
           }`}>
            <h1 className="sm:text-lg text-white text-xs w-full">
              Return Home
            </h1>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
