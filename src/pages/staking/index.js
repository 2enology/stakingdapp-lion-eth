import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ClassicSpinner } from "react-spinners-kit";
import { NotificationManager } from "react-notifications";
import { useWeb3React } from "@web3-react/core";

import STAKINGCONTRACT_ABI from "../../assets/abis/STAKINGCONTRACT_ABI.json";
import NFTCONTRACT_ABI from "../../assets/abis/NFTCONTRACT_ABI.json";

import NftCard from "../NftCard";
import config from "../../config/config";

const ethers = require("ethers");

export default function Staking() {
  const [preloadState, setPreloadState] = useState(true);
  const [funcRunState, setFuncRunState] = useState(false);
  const [funcRunTitle, setFuncRunTitle] = useState("");
  const [stakedNftArray, setStakedNftArray] = useState(0);
  const [unStakedNftArray, setUnStakedNftArray] = useState(0);
  const [totalReward, setTotalReward] = useState(0);
  const [stakedNfts, setStakedNfts] = useState([]);
  const [stakedState, setStakedState] = useState(false);
  const { account } = useWeb3React();

  const Provider = new ethers.providers.Web3Provider(window.ethereum);
  const Signer = Provider.getSigner();

  const NFTContract = new ethers.Contract(
    config.NFTCONTRACT_ADDRESS,
    NFTCONTRACT_ABI,
    Signer
  );

  const StakingContract = new ethers.Contract(
    config.STAKINGCONTRACT_ADDRESS,
    STAKINGCONTRACT_ABI,
    Signer
  );

  const getStakedNfts = async () => {
    let stakedNFTArray = [];
    await StakingContract.getStakedNFTList(account).then(async (data) => {
      if (data.length > 0) {
        setStakedState(true);
      }
      for (let i = 0; i < data.length; i++) {
        await StakingContract.stakedNFTs(Number(data[i].toString())).then(
          async () => {
            await StakingContract.calculateRewardsNFT(Number(data[i])).then(
              (totalreward) => {
                const unrounded = ethers.utils.formatEther(
                  totalreward.toString()
                );
                const total = parseFloat(unrounded).toFixed(2);
                stakedNFTArray.push({
                  tokenId: Number(data[i]).toString(),
                  balance: total,
                  imgUrl: `${config.IMGIPFS_ADDRESS}/${data[i].toString()}.png`,
                });
              }
            );
          }
        );
      }
    });
    setStakedNfts(stakedNFTArray);
    setPreloadState(false);
  };

  const getMydata = async () => {
    await NFTContract.walletOfOwner(account).then((data) => {
      setUnStakedNftArray(data.length);
    });

    await StakingContract.getStakedNFTList(account).then((data) => {
      setStakedNftArray(data.length);
    });
    await StakingContract.getTotalrewards(account).then((data) => {
      const unrounded = ethers.utils.formatEther(data.toString());
      const total = parseFloat(unrounded).toFixed(2);
      setTotalReward(total);
    });
  };

  useEffect(() => {
    if (account) {
      getStakedNfts();
      getMydata();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  // UnstakeAll Fuction
  const unStakeAllFunc = async () => {
    if (stakedNfts.length === 0) {
      NotificationManager.error("Nothing to unstake!");
    } else {
      setFuncRunTitle("Unstaking All");
      setFuncRunState(true);
      const nftIDArray = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < stakedNfts.length; i++) {
        nftIDArray[i] = stakedNfts[i].tokenId;
      }
      await StakingContract.unStake(nftIDArray, { gasLimit: 300000 })
        .then((tx) => {
          tx.wait()
            .then(async () => {
              setFuncRunState(false);
              setStakedState(false);
              await getStakedNfts();
              getMydata();

              NotificationManager.success("Unstaked successfully!");
            })
            .catch(() => {
              setFuncRunState(false);
              setStakedState(false);
            });
        })
        .catch(() => {
          setFuncRunState(false);
        });
    }
  };

  // ClaimAll Fuction
  const claimAllFunc = async () => {
    if (stakedNfts.length === 0) {
      NotificationManager.error("Nothing to claim!");
    } else {
      setFuncRunTitle("Claiming All");
      setFuncRunState(true);
      const nftIDArray = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < stakedNfts.length; i++) {
        nftIDArray[i] = stakedNfts[i].tokenId;
      }
      await StakingContract.claimRewards(nftIDArray, { gasLimit: 300000 })
        .then((tx) => {
          tx.wait().then(() => {
            setFuncRunState(false);
            getStakedNfts();
            getMydata();
            NotificationManager.success("Claimed successfully!");
          });
        })
        .catch(() => {
          setFuncRunState(false);
        });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.3, delay: 0.3 }}>
      <div className="2xl:px-20 flex justify-between lg:px-10 mb-10 md:px-20 mt-10 px-5 sm:px-10 w-full xl:px-10 z-50">
        <div className="bg-custom-blur border-2 border-custom justify-between staking_content w-full">
          <div className="border-b-2 border-custom border-opacity-20 justify-between lg:flex w-full">
            <div className="flex lg:w-1/3 w-full">
              <div className="border-custom border-opacity-20 border-r-2 px-2 py-4 rounded-l-full sm:px-8 text-center w-1/3">
                <h1 className="lg:text-left text-center text-gray-500 text-sm">
                  Hunting
                </h1>
                <h1 className="lg:text-left md:text-2xl text-center text-white text-xs">
                  {stakedNftArray} Lions
                </h1>
              </div>
              <div className="border-custom border-opacity-20 border-r-2 px-2 py-4 sm:px-8 text-center w-1/3">
                <h1 className="lg:text-left text-center text-gray-500 text-sm">
                  At home
                </h1>
                <h1 className="lg:text-left md:text-2xl text-center text-white text-xs">
                  {unStakedNftArray} Lions
                </h1>
              </div>{" "}
              <div className="border-custom border-opacity-20 lg:border-r-2 px-2 py-4 sm:px-8 text-center w-1/3">
                <h1 className="lg:text-left text-center text-gray-500 text-sm">
                  Total Lions
                </h1>
                <h1 className="lg:text-left md:text-2xl text-center text-white text-xs">
                  {stakedNftArray + unStakedNftArray} Lions
                </h1>
              </div>{" "}
            </div>
            <div className="flex items-center justify-center lg:1/3 text-center text-white">
              <h1>
                Your Lions are hungry! Send your Lions out to Hunt in The
                Savanna. <br />
                This will feed the Pride and reward you with TSP tokens! See you
                in The Savanna!
              </h1>
            </div>
            <div className="border-custom border-t-2 flex lg:1/3 lg:border-none">
              <div className="border-custom border-opacity-20 border-r-2 px-2 py-4 sm:border-l-2 text-center w-1/3">
                <h1 className="lg:text-left text-center text-gray-500 text-sm">
                  Avilable for Claim
                </h1>
                <h1 className="lg:text-left md:text-2xl text-center text-white text-xs">
                  {totalReward} TSP
                </h1>
              </div>{" "}
              <div className="border-custom border-opacity-20 flex justify-center px-12 py-8 sm:border-r-2 text-center w-1/3">
                <button
                  className="bg-white duration-200 hover:bg-green-700 hover:text-white lg:px-10 lg:py-2 px-4 rounded-2xl text-sm"
                  onClick={() => unStakeAllFunc()}>
                  Return all Lions.
                </button>
              </div>{" "}
              <div className="border-custom border-opacity-20 flex justify-center px-3 py-8 text-center w-1/3">
                <button
                  className="bg-green-700 duration-200 hover:bg-white hover:text-black
                   lg:px-1 lg:py-2 md:py-3 px-4 rounded-2xl text-sm text-white"
                  onClick={() => claimAllFunc()}>
                  Claim Rewards
                </button>
              </div>{" "}
            </div>
          </div>
          {account ? (
            <>
              {" "}
              {preloadState ? (
                <div className="staking-grid">
                  <div className="flex justify-center mt-44 top-10 w-full">
                    <ClassicSpinner size={40} />
                  </div>
                </div>
              ) : (
                <>
                  {!stakedState ? (
                    <div className="staking-grid">
                      <div className="flex justify-center mt-44 top-10 w-full">
                        <h1 className="text-2xl text-gray-500">
                          Nothing to show
                        </h1>
                      </div>
                    </div>
                  ) : (
                    <div className="gap-3 grid grid-cols-1 lg:gap-7 lg:grid-cols-4 md:grid-cols-2 overflow-y-auto p-10 sm:grid-cols-2 staking-grid xl:gap-5 xl:grid-cols-5">
                      {stakedNfts &&
                        stakedNfts.map((data, index) => (
                          <NftCard
                            getMyStakedData={getMydata}
                            getStakedNfts={getStakedNfts}
                            stakeState={true}
                            balance={data.balance}
                            tokenId={data.tokenId}
                            imgUrl={data.imgUrl}
                            key={index}
                          />
                        ))}
                    </div>
                  )}
                </>
              )}
              {funcRunState && (
                <div className="metaverse_fn_preloader opacity-60 rounded-2xl">
                  <ClassicSpinner size={40} />
                  <h1 className="ml-5 mt-2 text-md text-white">
                    {funcRunTitle} ...
                  </h1>
                </div>
              )}
            </>
          ) : (
            <div className="staking-grid">
              <div className="flex justify-center mt-44 top-10 w-full">
                <h1 className="text-2xl text-gray-500">
                  Please Connect Wallet
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
