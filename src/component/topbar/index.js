import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="justify-between lg:flex lg:px-10 md:px-20 mt-20 px-5 sm:px-10 w-full xl:px-40 z-50">
      <h1 className="lg:text-left mb-2 sm:text-5xl text-4xl text-center text-white">
        Staking
      </h1>
      <div className="border-2 border-custom border-opacity-20 flex rounded-full">
        <Link
          to={"/"}
          className="border-custom border-opacity-20 border-r-2 cursor-pointer duration-150 hover:bg-green-700 lg:py-4 px-5 py-2 rounded-l-full text-center w-full">
          <h1 className="sm:text-lg text-white text-xs">Dashboard</h1>
        </Link>
        <Link
          to={"/staking"}
          className="border-custom border-opacity-20 border-r-2 cursor-pointer duration-150 hover:bg-green-700 lg:py-4 px-7 py-2 text-center w-full">
          <h1 className="sm:text-lg text-white text-xs">Staking</h1>
        </Link>{" "}
        <Link
          to={"/unstaking"}
          className="cursor-pointer duration-150 hover:bg-green-700 lg:py-4 px-5 py-2 rounded-r-full text-center w-full">
          <h1 className="sm:text-lg text-white text-xs">Unstaking</h1>
        </Link>
      </div>
    </div>
  );
}
