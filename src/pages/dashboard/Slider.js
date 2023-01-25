import { Slider, SliderItem } from "../../component/common/slider/Slider";
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

  var sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 370,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
        },
      },
    ],
  };

  return (
    <div className="mt-3 w-full">
      <Slider {...sliderSettings}>
        {slideImages?.map((thumb, idx) => (
          <SliderItem key={idx}>
            <div className="flex justify-center px-3 w-full">
              <img
                src={thumb}
                alt="thumb"
                className="rounded-3xl shadow-2xl shadow-white"
                width="350px"
              />
            </div>
          </SliderItem>
        ))}
      </Slider>
    </div>
  );
}
