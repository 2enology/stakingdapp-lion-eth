import { useState } from "react";
import { motion } from "framer-motion";
import { ClassicSpinner } from "react-spinners-kit";

import NftCard from "../staking/nftcard";

export default function Unstaking() {
  const [preloadState, setPreloadState] = useState(true);

  setInterval(() => {
    setPreloadState(false);
  }, 1000);
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5, delay: 0.5 }}>
      <div className="2xl:px-32 flex justify-between lg:px-10 mb-10 md:px-20 mt-10 px-5 sm:px-10 w-full z-50">
        <div className="bg-custom-blur border-2 justify-between staking_content w-full">
          <div className="border-b-2 border-custom border-opacity-20 justify-between lg:flex w-full">
            <div className="flex lg:w-auto w-full">
              <div className="border-custom border-opacity-20 border-r-2 px-2 py-4 rounded-l-full sm:px-8 text-center w-1/3">
                <h1 className="lg:text-left text-center text-gray-500 text-sm">
                  Total Lions
                </h1>
                <h1 className="lg:text-left md:text-2xl text-center text-white text-xs">
                  15 Lions
                </h1>
              </div>
              <div className="border-custom border-opacity-20 border-r-2 px-2 py-4 sm:px-8 text-center w-1/3">
                <h1 className="lg:text-left text-center text-gray-500 text-sm">
                  Staked Lions
                </h1>
                <h1 className="lg:text-left md:text-2xl text-center text-white text-xs">
                  15 Lions
                </h1>
              </div>{" "}
              <div className="border-custom border-opacity-20 px-2 py-4 sm:border-r-2 sm:px-8 text-center w-1/3">
                <h1 className="lg:text-left text-center text-gray-500 text-sm">
                  Staked Lions
                </h1>
                <h1 className="lg:text-left md:text-2xl text-center text-white text-xs">
                  15 Lions
                </h1>
              </div>{" "}
            </div>
            <div className="border-custom border-t-2 flex lg:border-none">
              <div className="border-custom border-opacity-20 border-r-2 px-2 py-4 sm:border-l-2 text-center w-1/2">
                <h1 className="lg:text-left text-center text-gray-500 text-sm">
                  Avilable for Claim
                </h1>
                <h1 className="lg:text-left md:text-2xl text-center text-white text-xs">
                  8452
                </h1>
              </div>{" "}
              <div className="border-custom border-opacity-20 px-2 py-4 sm:border-r-2 sm:pr-20 text-center w-1/2">
                <h1 className="slgm:text-left text-center text-gray-500 text-sm">
                  Paid Out
                </h1>
                <h1 className="lg:text-left md:text-2xl text-center text-white text-xs">
                  95.65.5
                </h1>
              </div>{" "}
            </div>
          </div>
          {preloadState ? (
            <div className="staking-grid">
              <div className="flex justify-center mt-44 top-10 w-full">
                <ClassicSpinner size={40} />
              </div>
            </div>
          ) : (
            <div className="gap-3 grid grid-cols-1 lg:gap-7 lg:grid-cols-4 md:grid-cols-3 overflow-y-auto p-10 sm:grid-cols-3 staking-grid xl:gap-10 xl:grid-cols-5">
              <NftCard unstakeState="unstake" />
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
