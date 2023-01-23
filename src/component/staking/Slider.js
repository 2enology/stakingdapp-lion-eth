import { Slider, SliderItem } from "../common/slider/Slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import thumb1 from "../../assets/images/nft/v4-slider-img.jpg";
import thumb2 from "../../assets/images/nft/v4-slider-img2.jpg";
import thumb3 from "../../assets/images/nft/v4-slider-img3.jpg";
import thumb4 from "../../assets/images/nft/v4-slider-img4.jpg";
import thumb5 from "../../assets/images/nft/v4-slider-img5.jpg";
import thumb6 from "../../assets/images/nft/v4-slider-img6.jpg";
import thumb7 from "../../assets/images/nft/v4-slider-img7.jpg";
import thumb8 from "../../assets/images/nft/v4-slider-img8.jpg";

export default function SliderNFT() {
  const slideImages = [
    thumb1,
    thumb2,
    thumb3,
    thumb4,
    thumb5,
    thumb6,
    thumb7,
    thumb8,
  ];

  const sliderSettings = {
    dots: false,
    arrows: false,
    autoplay: true,
    speed: 500,
    fade: true,
    autoplaySpeed: 700,
    centerMode: true,
    centerPadding: "0px",
    infinite: true,
    slidesToShow: 1,
    pauseOnHover: true,
    slidesToScroll: 1,
  };

  return (
    <div className="mt-10">
      <Slider {...sliderSettings}>
        {slideImages?.map((thumb, idx) => (
          <SliderItem key={idx}>
            <div className="border-2 border-gray-600 p-3">
              <img src={thumb} alt="thumb" className="" />
            </div>
          </SliderItem>
        ))}
      </Slider>
    </div>
  );
}
