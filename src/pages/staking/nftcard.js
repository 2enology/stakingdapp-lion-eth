import { useState } from "react";

import { NotificationManager } from "react-notifications";

import NFTCONTRACT_ABI from "../../assets/abis/NFTCONTRACT_ABI.json";
import STAKINGCONTRACT_ABI from "../../assets/abis/STAKINGCONTRACT_ABI.json";

import { ClassicSpinner } from "react-spinners-kit";

import config from "../../config/config";
const ethers = require("ethers");

const NftCard = ({
  stakeState,
  tokenId,
  imgUrl,
  balance,
  getMyNftList,
  getMyStakedData,
  getStakedNfts,
  isApprovedState,
  getMyUnstakedData,
}) => {
  const [stakeLoadingState, setStakingLoadingState] = useState(false);
  const [loadingTitle, setLoadingTitle] = useState("");
  const Provider = new ethers.providers.Web3Provider(window.ethereum);
  const Signer = Provider.getSigner();

  const StakingContract = new ethers.Contract(
    config.STAKINGCONTRACT_ADDRESS,
    STAKINGCONTRACT_ABI,
    Signer
  );

  const NFTContract = new ethers.Contract(
    config.NFTCONTRACT_ADDRESS,
    NFTCONTRACT_ABI,
    Signer
  );

  const stakeFunc = async () => {
    setLoadingTitle("Staking");
    setStakingLoadingState(true);
    if (isApprovedState) {
      StakingContract.stake([tokenId], { gasLimit: 300000 })
        .then((tx) => {
          tx.wait().then(() => {
            setStakingLoadingState(false);
            getMyNftList();
            getMyUnstakedData();
            NotificationManager.success("Staked successfully!");
          });
        })
        .catch(() => {
          console.log("canceled");
          setStakingLoadingState(false);
        });
    } else {
      NFTContract.setApprovalForAll(config.STAKINGCONTRACT_ADDRESS, true)
        .then((tx) => {
          tx.wait()
            .then(() => {
              StakingContract.stake([tokenId], { gasLimit: 300000 }).then(
                (tx) => {
                  tx.wait().then(() => {
                    setStakingLoadingState(false);
                    getMyNftList();
                    getMyUnstakedData();
                    NotificationManager.success("Staked successfully!");
                  });
                }
              );
            })
            .catch(() => {
              console.log("canceled");
              setStakingLoadingState(false);
            });
        })
        .catch(() => {
          console.log("canceled");
          setStakingLoadingState(false);
        });
    }
  };

  const unStakeFunc = async () => {
    setLoadingTitle("Unstaking");
    setStakingLoadingState(true);
    await StakingContract.unStake([tokenId], { gasLimit: 300000 })
      .then((tx) => {
        tx.wait().then(() => {
          setStakingLoadingState(false);
          getStakedNfts();
          getMyStakedData();
          NotificationManager.success("Unstaked successfully!");
        });
      })
      .catch(() => {
        setStakingLoadingState(false);
      });
  };

  const claimFunc = async () => {
    setLoadingTitle("Claiming");
    setStakingLoadingState(true);
    await StakingContract.claimRewards([tokenId], { gasLimit: 300000 })
      .then((tx) => {
        tx.wait().then(() => {
          NotificationManager.success("Claimed successfully!");
          getStakedNfts();
          getMyStakedData();
          setStakingLoadingState(false);
        });
      })
      .catch(() => {
        setStakingLoadingState(false);
      });
  };

  return (
    <>
      <div className="border-2 border-custom duration-300 hover:shadow-2xl rounded-3xl">
        <img
          src={imgUrl}
          className="min-h-300 p-3 rounded-3xl w-full"
          alt="cardImg"
        />
        {stakeState ? (
          <>
            <h1 className="flex justify-between p-3 text-white text-xl w-full">
              <span>Lion :</span> <span>#{tokenId}</span>
            </h1>

            <h1 className="flex justify-between p-3 text-gray-400 text-lg w-full">
              <span>Balance :</span> <span>{balance} TSP</span>
            </h1>
          </>
        ) : (
          <h1 className="flex justify-between p-3 text-white text-xl w-full">
            <span>Lion :</span> <span>#{tokenId}</span>
          </h1>
        )}

        <div className="border-custom border-t-2 flex justify-between w-full">
          {stakeState === false ? (
            <button
              className="border-custom duration-150 hover:bg-green-700 p-4 rounded-b-3xl text-white w-full"
              onClick={() => stakeFunc()}>
              Stake
            </button>
          ) : (
            <>
              {" "}
              <button
                className="border-custom border-r-2 duration-150 hover:bg-green-700 p-4 rounded-bl-3xl text-white w-1/2"
                onClick={() => unStakeFunc()}>
                Unstake
              </button>
              <button
                className="duration-150 hover:bg-green-700 p-4 rounded-br-3xl text-center text-white w-1/2"
                onClick={() => claimFunc()}>
                {" "}
                Claim
              </button>
            </>
          )}
        </div>
      </div>
      {stakeLoadingState && (
        <div className="metaverse_fn_preloader opacity-60 rounded-2xl">
          <ClassicSpinner size={40} />
          <h1 className="ml-5 mt-2 text-md text-white">{loadingTitle} ...</h1>
        </div>
      )}
    </>
  );
};

export default NftCard;
