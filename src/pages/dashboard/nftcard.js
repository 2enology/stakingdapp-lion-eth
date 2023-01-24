import nft from "../../assets/images/nft/nft.png";
export default function NftCard() {
  return (
    <div className="border-2 border-custom rounded-3xl">
      <img src={nft} className="p-3 rounded-3xl w-full" />
      <h1 className="p-3 text-gray-400 text-xl">Lion #1235</h1>
      <div className="border-custom border-t-2 flex justify-between w-full">
        <button className="border-custom border-r-2 duration-150 hover:bg-green-700 p-4 rounded-bl-3xl text-white w-1/2">
          Unstake
        </button>
        <button className="duration-150 hover:bg-green-700 p-4 rounded-br-3xl text-center text-white w-1/2">
          Claim
        </button>
      </div>
    </div>
  );
}
