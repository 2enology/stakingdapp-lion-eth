import Slider from "./Slider";

export default function DashBoard() {
  return (
    <div className="2xl:px-32 flex justify-between lg:px-10 mb-10 md:px-20 mt-10 px-5 sm:px-10 w-full z-50">
      <div className="border-2 justify-between staking_content w-full">
        <div className="lg:flex w-full">
          <div className="grid grid-cols-2 lg:w-2/3">
            <div className="border-b-2 border-custom border-r-2 w-full">
              <h1 className="ml-2 mt-3 sm:ml-14 sm:mt-14 sm:text-2xl text-indigo-500 text-left">
                Total Staked Lions
              </h1>
              <h1 className="ml-2 sm:ml-14 sm:text-4xl text-left text-lg text-white">
                14 Lions
              </h1>
            </div>
            <div className="border-b-2 border-custom w-full">
              <h1 className="ml-2 mt-3 sm:ml-14 sm:mt-14 sm:text-2xl text-indigo-500 text-left">
                Total Unstaked Lions
              </h1>
              <h1 className="ml-2 sm:ml-14 sm:text-4xl text-left text-lg text-white">
                6 Lions
              </h1>
            </div>
            <div className="border-b-2 border-custom border-r-2 lg:border-b-0 w-full">
              <h1 className="ml-2 mt-3 sm:ml-14 sm:mt-14 sm:text-2xl text-indigo-500 text-left">
                You have earned
              </h1>
              <h1 className="ml-2 sm:ml-14 sm:text-4xl text-left text-lg text-white">
                65,565 Burnable
              </h1>
            </div>
            <div className="border-b-2 border-custom lg:border-b-0 w-full">
              <h1 className="ml-2 mt-3 sm:ml-14 sm:mt-14 sm:text-2xl text-indigo-500 text-left">
                Available for claim
              </h1>
              <h1 className="ml-2 sm:ml-14 sm:text-4xl text-left text-lg text-white">
                343,99 Burnable
              </h1>
            </div>
          </div>
          <div className="border-custom border-l-2 lg:mt-0 lg:w-1/3 mt-10">
            <Slider />
            <div className="ml-3 mt-10">
              <h1 className="sm:text-2xl text-white">Total Staked NFTs</h1>
              <h1 className="sm:text-5xl text-gray-500 text-lg">50 Lions</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
