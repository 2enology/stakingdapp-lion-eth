import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ClassicSpinner } from "react-spinners-kit";
import { useWeb3React } from "@web3-react/core";
import config from "../../config/config";
import NftCard from "../staking/nftcard";

import NFTCONTRACT_ABI from "../../assets/abis/NFTCONTRACT_ABI.json";

const ethers = require("ethers");

export default function Unstaking() {
  const [preloadState, setPreloadState] = useState(true);
  const [mynftArray, setMyNftArray] = useState([]);
  const { account } = useWeb3React();

  const Provider = new ethers.providers.Web3Provider(window.ethereum);
  const Signer = Provider.getSigner();

  const NFTContract = new ethers.Contract(
    config.NFTCONTRACT_ADDRESS,
    NFTCONTRACT_ABI,
    Signer
  );

  const getMyNftList = async () => {
    let nftArray = [];
    const nftArrayLength = await NFTContract.walletOfOwner(account);
    for (let j = 0; j < nftArrayLength.length; j++) {
      nftArray.push({
        tokenId: Number(nftArrayLength[j].toString()),
        imgUrl:
          config.IMGIPFS_ADDRESS +
          "/" +
          Number(nftArrayLength[j].toString()) +
          ".png",
      });
    }
    setMyNftArray(nftArray);
    setPreloadState(false);
  };

  useEffect(() => {
    if (account) {
      getMyNftList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.3, delay: 0.3 }}>
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
              <div className="border-custom border-opacity-20 border-r-2 px-2 py-4 sm:border-l-2 text-center w-1/3">
                <h1 className="lg:text-left text-center text-gray-500 text-sm">
                  Avilable for Claim
                </h1>
                <h1 className="lg:text-left md:text-2xl text-center text-white text-xs">
                  8452
                </h1>
              </div>{" "}
              <div className="border-custom border-opacity-20 px-2 py-4 sm:border-r-2 text-center w-1/3">
                <h1 className="lg:text-left text-center text-gray-500 text-sm">
                  Paid Out
                </h1>
                <h1 className="lg:text-left md:text-2xl text-center text-white text-xs">
                  95.65.5
                </h1>
              </div>{" "}
              <div className="border-custom border-opacity-20 flex justify-center px-6 py-4 sm:border-r-2 text-center w-1/3">
                <button className="bg-white duration-200 hover:bg-green-700 hover:text-white lg:px-10 lg:py-1 px-10 py-1 rounded-full text-xs">
                  Stake All
                </button>
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
            <>
              {mynftArray.length === 0 ? (
                <div className="staking-grid">
                  <div className="flex justify-center mt-44 top-10 w-full">
                    <h1 className="text-2xl text-gray-500">Nothing to show</h1>
                  </div>
                </div>
              ) : (
                <div className="gap-3 grid grid-cols-1 lg:gap-7 lg:grid-cols-4 md:grid-cols-2 overflow-y-auto p-10 sm:grid-cols-2 staking-grid xl:gap-10 xl:grid-cols-5">
                  {mynftArray.map((data, index) => (
                    <NftCard
                      stakeState={false}
                      tokenId={data.tokenId}
                      imgUrl={data.imgUrl}
                      key={index}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </motion.section>
  );
}
