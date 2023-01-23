// import { useEffect } from "react";
// import { useWeb3React } from "@web3-react/core";
// import { injected } from "../../hooks/connect";
// import { switchSongbirdNetwork } from "../../hooks/switch-network";

// import { FaWallet } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [clickScrollTopBtnState, setClickScrollTopBtnState] = useState(false);

  // const { account, chainId, activate, deactivate } = useWeb3React();

  // async function connect() {
  //   if (chainId !== 16 || chainId === undefined) {
  //     switchSongbirdNetwork();
  //   }
  //   try {
  //     console.log("clicked");
  //     await activate(injected);
  //     localStorage.setItem("isWalletConnected", true);
  //   } catch (ex) {
  //     console.log(ex);
  //   }
  // }

  // async function disconnect() {
  //   try {
  //     deactivate();
  //     localStorage.setItem("isWalletConnected", false);
  //   } catch (ex) {
  //     console.log(ex);
  //   }
  // }

  // useEffect(() => {
  //   const connectWalletOnPageLoad = async () => {
  //     if (localStorage?.getItem("isWalletConnected") === "true") {
  //       try {
  //         await activate(injected);
  //         localStorage.setItem("isWalletConnected", true);
  //       } catch (ex) {
  //         console.log(ex);
  //       }
  //     }
  //   };
  //   connectWalletOnPageLoad();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const scrollToTop = () => {
    setClickScrollTopBtnState(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setClickScrollTopBtnState(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      <header id="header">
        <div className="border-gray-300 header">
          <div className="header_in">
            <div className="logo">
              <a className="has_text" href="/">
                {/* <img
                  src={LogoImg}
                  alt=""
                  width="50px"
                  className="mx-9 rounded-full"
                /> */}
              </a>
            </div>
            <div className="nav">
              <ul>
                <li className="menu-item-has-children">
                  <a className="gradient_link" href="#header">
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <a className="gradient_link" href="#about">
                    <span>About</span>
                  </a>
                </li>
                <li>
                  <a className="gradient_link" href="#collection">
                    <span>Collection</span>
                  </a>
                </li>
                <li>
                  <a className="gradient_link" href="#team">
                    <span>Team</span>
                  </a>
                </li>
                <li>
                  <a className="gradient_link" href="#faq">
                    <span>Faq</span>
                  </a>
                </li>
                <li>
                  <a
                    className="gradient_link"
                    href="https://twitter.com/Doodle_bunnies"
                    target="_blank"
                    rel="noreferrer">
                    <span>Twitter</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="block lg:hidden">
              <button
                className="block md:hidden trigger"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <span></span>
              </button>
            </div>
            <div className={`mobile-nav ${mobileMenuOpen ? "opened" : ""}`}>
              <div className="text-center w-full">
                <a
                  className="duration-150 font-bold hover:text-blue-400 px-4 text-2xl text-gray-700"
                  href="/">
                  HOME
                </a>
              </div>
              <div className="text-center w-full">
                <a
                  className="duration-150 font-bold hover:text-blue-400 px-4 text-2xl text-gray-700"
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}>
                  ABOUT
                </a>
              </div>
              <div className="text-center w-full">
                <a
                  className="duration-150 font-bold hover:text-blue-400 px-4 text-2xl text-gray-700"
                  href="#collection"
                  onClick={() => setMobileMenuOpen(false)}>
                  COLLECTION
                </a>
              </div>
              <div className="text-center w-full">
                <a
                  className="duration-150 font-bold hover:text-blue-400 px-4 text-2xl text-gray-700"
                  href="#team"
                  onClick={() => setMobileMenuOpen(false)}>
                  {" "}
                  TEAM
                </a>
                <div className="text-center w-full">
                  <a
                    className="duration-150 font-bold hover:text-blue-400 px-4 text-2xl text-gray-700"
                    href="#faq"
                    onClick={() => setMobileMenuOpen(false)}>
                    {" "}
                    FAQ
                  </a>
                </div>
              </div>
            </div>
            {/* <div className="helpful">
              <a href="/" className="connect_btn">
                <span className="font-bold text">
                  Connect<span> Wallet</span>
                </span>
              </a>
            </div> */}
          </div>
        </div>
      </header>
      <button
        onClick={scrollToTop}
        className={`metaverse_fn_totop ${isVisible ? "active" : ""} ${
          clickScrollTopBtnState ? "clicked" : ""
        }`}
        id="scrollTopBtn">
        <span className="icon"></span>
        <span className="arrow"></span>
        <span className="rocket"></span>
      </button>
    </>
  );
}
