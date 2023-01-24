import { BsTwitter } from "react-icons/bs";
import { SiDiscord } from "react-icons/si";
import { TfiLinkedin } from "react-icons/tfi";

import logoIMG from "../../assets/images/logoIMG.png";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="flex justify-between lg:px-10 md:px-20 mt-40 px-5 sm:px-10 w-full xl:px-40 z-50">
      <div className="flex logo">
        <img src={logoIMG} alt="logoIMG" className="w-14" />
        <h1 className="hidden mt-3 sm:block text-white text-xl">Lion NFTs</h1>
      </div>
      <h1 className="hidden mt-3 sm:block text-gray-400 text-md">
        Copyright @2023 Lions - All Rights Reserved.
      </h1>

      <div className="flex gap-5 m-5">
        <BsTwitter className="duration-200 hover:text-green-500 text-2xl text-white" />
        <SiDiscord className="duration-200 hover:text-green-500 text-2xl text-white" />
        <TfiLinkedin className="duration-200 hover:text-green-500 text-2xl text-white" />
      </div>
    </footer>
  );
}
