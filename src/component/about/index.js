import { Fade, Bounce } from "react-reveal";

import AboutUsIMG from "../../assets/images/nft/aboutusIMG.png";
import ClawsSVG from "../../assets/svg/claws.svg";
import FolderSVG from "../../assets/svg/folded.svg";
const Collection = () => {
  return (
    <section id="about" className="">
      <div className="container">
        <div className="fn_cs_title">
          <Bounce left duration={1000}>
            <div className="divider" data-color="1">
              <div className="line"></div>
              <div className="middle"></div>
              <div className="left1"></div>
              <div className="left2"></div>
              <div className="right1"></div>
              <div className="right2"></div>
            </div>
            <h3 className="title" data-color="black">
              About Us
            </h3>
          </Bounce>
        </div>
      </div>
      <Fade bottom duration={1000}>
        <div className="container">
          <div className="fn_row">
            <div className="fn_col2">
              <p className="font-light small text-black">
                Doodle Bunny is the NFT project on Flare network. It will not only bring in first ever doodle NFTs on Flare but also, NFT breeding & NFT staking to earn our native Bunny token. There will be total 1000 doodle bunnies (500 Males & 500 Females).
              </p>
            </div>
            <div className="fn_col2">
              <p className="font-light small text-black">
                Our NFTs holders will be able breed them - 1 Male x 1 Female = Baby Bunny (There will be 500 Baby Bunnies). NFT breeding will cost Bunny token (which will be burned) & later available to stake them on our staking website to earn BUNNY token. {" "}
              </p>
            </div>
          </div>
        </div>
        <div className="about_img flex justify-center w-full">
          <img src={AboutUsIMG} alt="" width="1300px" />
          <img src={ClawsSVG} alt="" className="fn__svg top" />
          <img src={FolderSVG} alt="" className="bottom fn__svg" />
        </div>{" "}
      </Fade>
    </section>
  );
};

export default Collection;
