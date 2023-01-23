export default function Topbar() {
  return (
    <div className="justify-between lg:flex lg:px-10 md:px-20 mt-20 px-5 sm:px-10 w-full xl:px-60 z-50">
      <h1 className="lg:text-left mb-2 sm:text-5xl text-4xl text-center text-white">
        Staking
      </h1>
      <div className="border-2 border-custom border-opacity-20 flex rounded-full">
        <div className="border-custom border-opacity-20 border-r-2 cursor-pointer duration-150 hover:bg-green-700 lg:py-4 px-5 py-2 rounded-l-full text-center w-full">
          <a className="sm:text-xl text-white text-xs">Dashboard</a>
        </div>
        <div className="border-custom border-opacity-20 border-r-2 cursor-pointer duration-150 hover:bg-green-700 lg:py-4 px-7 py-2 text-center w-full">
          <a className="sm:text-xl text-white text-xs">Staking</a>
        </div>{" "}
        <div className="cursor-pointer duration-150 hover:bg-green-700 lg:py-4 px-5 py-2 rounded-r-full text-center w-full">
          <a className="sm:text-xl text-white text-xs">Unstaking</a>
        </div>
      </div>
    </div>
  );
}
