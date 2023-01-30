import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ClassicSpinner } from "react-spinners-kit";

import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";

import { useWeb3React } from "@web3-react/core";
import config from "../../config/config";
import NftCard from "../NftCard";

import NFTCONTRACT_ABI from "../../assets/abis/NFTCONTRACT_ABI.json";
import STAKINGCONTRACT_ABI from "../../assets/abis/STAKINGCONTRACT_ABI.json";
import REWARDTOKENCONTRACT_ABI from "../../assets/abis/REWARDTOKENCONTRACT_ABI.json";

const ethers = require("ethers");

export default function Unstaking() {
  const [preloadState, setPreloadState] = useState(true);
  const [mynftArray, setMyNftArray] = useState([]);
  const [stakedNftArray, setStakedNftArray] = useState(0);
  const [totalReward, setTotalReward] = useState(0);
  const [myBalanceOf, setMyBalanceOf] = useState(0);
  const [isApprovedAllState, setIsApprovedAllState] = useState(false);
  const [funcRunState, setFuncRunState] = useState(false);
  const [stakingState, setStakingState] = useState(false);
  const [funcRunTitle, setFuncRunTitle] = useState("");
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
  const RewardContract = new ethers.Contract(
    config.REWARDTOKEN_ADDRESS,
    REWARDTOKENCONTRACT_ABI,
    Signer
  );

  // Get My Nfts
  const getMyNftList = async () => {
    let nftArray = [];
    const nftArrayLength = await NFTContract.walletOfOwner(account);
    if (nftArrayLength.length > 0) {
      setStakingState(true);
    }
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

  const getApproveAllState = async () => {
    NFTContract.isApprovedForAll(account, config.STAKINGCONTRACT_ADDRESS).then(
      (isApproved) => {
        setIsApprovedAllState(isApproved);
      }
    );
  };

  const getMydata = async () => {
    await StakingContract.getStakedNFTList(account).then((data) => {
      setStakedNftArray(data.length);
    });
    await StakingContract.getTotalrewards(account).then((data) => {
      const unrounded = ethers.utils.formatEther(data.toString());
      const total = parseFloat(unrounded).toFixed(2);
      setTotalReward(total);
    });
    await RewardContract.balanceOf(account).then((balance) => {
      const unrounded = ethers.utils.formatEther(balance.toString());
      const myBalance = parseFloat(unrounded).toFixed(2);
      setMyBalanceOf(myBalance);
    });
  };

  useEffect(() => {
    if (account) {
      getMyNftList();
      getApproveAllState();
      getMydata();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  // StakeAll Fuction
  const stakeAllFunc = async () => {
    if (mynftArray.length === 0) {
      NotificationManager.error("Nothing to stake!");
    } else {
      setFuncRunTitle("Staking All");
      setFuncRunState(true);
      const nftIDArray = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < mynftArray.length; i++) {
        nftIDArray[i] = mynftArray[i].tokenId;
      }
      if (isApprovedAllState) {
        await StakingContract.stake(nftIDArray).then((tx) => {
          tx.wait()
            .then(() => {
              setFuncRunState(false);
              setStakingState(false);
              getMydata();
              getMyNftList();
              NotificationManager.success("Staked successfully!");
            })
            .catch(() => {
              console.log("canceled");
              setFuncRunState(false);
            });
        });
      } else {
        NFTContract.setApprovalForAll(config.STAKINGCONTRACT_ADDRESS, true)
          .then((tx) => {
            tx.wait()
              .then(() => {
                StakingContract.stake(nftIDArray, { gasLimit: 300000 }).then(
                  (tx) => {
                    tx.wait().then(() => {
                      setFuncRunState(false);
                      setStakingState(false);
                      getMyNftList();
                      NotificationManager.success("Staked successfully!");
                    });
                  }
                );
              })
              .catch(() => {
                setFuncRunState(false);
              });
          })
          .catch(() => {
            setFuncRunState(false);
          });
      }
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.3, delay: 0.3 }}>
      <div className="2xl:px-20 flex justify-between lg:px-10 mb-10 md:px-20 mt-10 px-5 sm:px-10 w-full z-50">
        <div className="bg-custom-blur border-2 border-custom justify-between staking_content w-full">
          <div className="border-b-2 border-custom border-custom border-opacity-20 justify-between lg:flex w-full">
            <div className="flex lg:1/3 lg:border-0 lg:w-auto w-full">
              <div className="border-custom border-opacity-20 border-r-2 px-2 py-4 rounded-l-full sm:px-8 text-center w-1/3">
                <h1 className="lg:text-left text-center text-gray-500 text-sm">
                  At home
                </h1>
                <h1 className="lg:text-left md:text-2xl text-center text-white text-xs">
                  {mynftArray.length} Lions
                </h1>
              </div>
              <div className="border-custom border-opacity-20 border-r-2 px-2 py-4 sm:px-8 text-center w-1/3">
                <h1 className="lg:text-left text-center text-gray-500 text-sm">
                  Hunting
                </h1>
                <h1 className="lg:text-left md:text-2xl text-center text-white text-xs">
                  {stakedNftArray} Lions
                </h1>
              </div>{" "}
              <div className="border-custom border-opacity-20 lg:border-r-2 px-2 py-4 sm:border-lg-2 sm:px-8 text-center w-1/3">
                <h1 className="lg:text-left text-center text-gray-500 text-sm">
                  Total Lions
                </h1>
                <h1 className="lg:text-left md:text-2xl text-center text-white text-xs">
                  {stakedNftArray + mynftArray.length} Lions
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
              <div className="border-custom border-opacity-20 px-2 py-4 sm:border-r-2 text-center w-1/3">
                <h1 className="lg:text-left text-center text-gray-500 text-sm">
                  My TSP Balance
                </h1>
                <h1 className="lg:text-left md:text-2xl text-center text-white text-xs">
                  {myBalanceOf} TSP
                </h1>
              </div>{" "}
              <div className="border-custom border-opacity-20 flex justify-center px-4 py-7 text-center w-1/3">
                <button
                  className="bg-white duration-200 hover:bg-green-700 hover:text-white 
                 lg:py-1 px-6 rounded-2xl text-sm md:py-3"
                  onClick={() => stakeAllFunc()}>
                  Send all to Hunt
                </button>
              </div>{" "}
            </div>
          </div>
          {account ? (
            <>
              {preloadState ? (
                <div className="staking-grid">
                  <div className="flex justify-center mt-44 top-10 w-full">
                    <ClassicSpinner size={40} />
                  </div>
                </div>
              ) : (
                <>
                  {!stakingState ? (
                    <div className="staking-grid">
                      <div className="flex justify-center mt-44 top-10 w-full">
                        <h1 className="text-2xl text-gray-500">
                          Nothing to show
                        </h1>
                      </div>
                    </div>
                  ) : (
                    <div className="gap-3 grid grid-cols-1 lg:gap-7 lg:grid-cols-4 md:grid-cols-2 overflow-y-auto p-10 sm:grid-cols-2 staking-grid xl:gap-5 xl:grid-cols-5">
                      {mynftArray.map((data, index) => (
                        <NftCard
                          getMyNftList={getMyNftList}
                          getMyUnstakedData={getMydata}
                          stakeState={false}
                          tokenId={data.tokenId}
                          imgUrl={data.imgUrl}
                          key={index}
                          isApprovedState={isApprovedAllState}
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
