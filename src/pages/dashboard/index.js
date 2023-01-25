import Slider from "./Slider";
import { motion } from "framer-motion";
import { useWeb3React } from "@web3-react/core";
import config from "../../config/config";
import CountUp from "react-countup";

const ethers = require("ethers");

export default function DashBoard() {
  const { account } = useWeb3React();

  const Provider = new ethers.providers.Web3Provider(window.ethereum);
  const Signer = Provider.getSigner();

  // const NFTContract = new ethers.Contract(
  //   config.MARKETPLACEADDRESS,
  //   MARKETPLACEABI,
  //   Signer
  // );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5, delay: 0.5 }}>
      <div className="2xl:px-32 flex justify-between lg:px-10 mb-10 md:px-20 mt-10 px-5 sm:px-10 w-full z-50">
        <div className="bg-custom-blur border-2 justify-between staking_content w-full">
          <div className="lg:flex w-full">
            <div className="grid grid-cols-2 lg:w-2/3">
              <div className="border-b-2 border-custom border-r-2 w-full">
                <h1 className="ml-2 mt-3 sm:ml-14 sm:mt-14 sm:text-2xl text-indigo-500 text-left">
                  Staked Lions
                </h1>
                <h1 className="ml-2 sm:ml-14 sm:text-4xl text-left text-lg text-white">
                  <CountUp start={0} end={100} duration={3} /> Lions
                </h1>
              </div>
              <div className="border-b-2 border-custom w-full">
                <h1 className="ml-2 mt-3 sm:ml-14 sm:mt-14 sm:text-2xl text-indigo-500 text-left">
                  Unstaked Lions
                </h1>
                <h1 className="ml-2 sm:ml-14 sm:text-4xl text-left text-lg text-white">
                  <CountUp start={0} end={6} duration={3} /> Lions Lions
                </h1>
              </div>
              <div className="border-b-2 border-custom border-r-2 lg:border-b-0 w-full">
                <h1 className="ml-2 mt-3 sm:ml-14 sm:mt-14 sm:text-2xl text-indigo-500 text-left">
                  You have earned
                </h1>
                <h1 className="ml-2 sm:ml-14 sm:text-4xl text-left text-lg text-white">
                  <CountUp start={0} end={65224} duration={3} /> TCP
                </h1>
              </div>
              <div className="border-b-2 border-custom lg:border-b-0 w-full">
                <h1 className="ml-2 mt-3 sm:ml-14 sm:mt-14 sm:text-2xl text-indigo-500 text-left">
                  Available for claim
                </h1>
                <h1 className="ml-2 sm:ml-14 sm:text-4xl text-left text-lg text-white">
                  <CountUp start={0} end={3255} duration={3} /> TCP
                </h1>
              </div>
            </div>
            <div className="border-custom border-l-2 lg:mt-0 lg:w-1/3 mt-10">
              <Slider />
              <div className="mt-10 text-center w-full">
                <h1 className="sm:text-2xl text-white">Total Staked NFTs</h1>
                <h1 className="sm:text-5xl text-gray-500 text-lg">50 Lions</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
