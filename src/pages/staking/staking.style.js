import styled from "styled-components";
import BgShape from "../../assets/images/bg/TheHuntStakingBackground.png";
import gradientShape from "../../assets/images/nft/v4_baner_mesh-grad.png";

const StakingStyleWrapper = styled.section`
  background: url(${BgShape}) no-repeat;
  min-height: 100vh;
  width: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::before {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    content: "";
    background: linear-gradient(120deg, rgba(14, 16, 16, 0.9) 0%, #181025 100%);
    z-index: -1;
  }

  // left content
  .mint_left_content {
    padding-right: 99px;

    p {
      margin-top: 23px;
      a {
        color: rgba(255, 255, 255, 0.8);
        font-weight: 600;
      }
    }

    .bithu-btn {
      width: 100% !important;
    }
  }

  .mint_left_inner {
    max-width: 372px;
    width: 100%;
    margin-left: auto;
  }

  .mint_count_list {
    padding: 0;
    margin: 15px 0 30px;

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 56px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      h5 {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        text-align: right;
        color: #ffffff;
      }
    }
  }

  .mint_quantity_sect {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 106px;
    width: 100%;
    height: 100%;

    button {
      border: none;
      outline: none;
      background: transparent;
      padding: 0px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      text-align: center;
      text-transform: uppercase;
      color: #ffffff;
    }

    input {
      max-width: 58px;
      width: 100%;
      border: none;
      border-left: 1px solid rgba(255, 255, 255, 0.1);
      border-right: 1px solid rgba(255, 255, 255, 0.1);
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      padding: 0px 19px;
      outline: none;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      text-align: center;
      text-transform: uppercase;
      color: #ffffff;
    }
  }

  //right content
  .mint_right_content {
    position: relative;
    margin-top: 50px;
    &::before {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background: url(${gradientShape}) no-repeat;
      background-position: center;
      background-size: contain;
      content: "";
      z-index: -1;
    }
    h1,
    h4,
    h5,
    h6 {
      color: #ffffff;
      text-transform: uppercase;
      margin-bottom: 12px;
    }

    .content_header {
      h4 {
        img {
          margin-left: 7px;
        }
      }
      h1 {
        font-size: 60px;
        margin-top: 15px;
      }
    }

    .mint_timer {
      margin-top: 20px;
      margin-bottom: 53px;
    }

    .mint_btns {
      display: flex;
      column-gap: 25px;
      margin-top: 70px;

      button {
        background: transparent;
      }
    }
  }

  // timer
  .countBox {
    display: flex;
    column-gap: 20px;
    align-items: center;
    flex-direction: row-reverse;
    justify-content: flex-end;

    .countBoxItem {
      display: flex;
      color: #ffffff;
      align-items: baseline;
      flex-direction: row-reverse;
      position: relative;
      justify-content: center;

      &::before,
      &::after {
        position: absolute;
        right: -11px;
        height: 5px;
        width: 5px;
        background: #ffffff;
        content: "";
      }
      &::before {
        top: 62%;
      }
      &::after {
        top: 35%;
      }

      &:first-child {
        &::before,
        &::after {
          display: none;
        }
      }
    }

    .split {
      display: none;
    }

    .count,
    .label {
      font-style: normal;
      font-weight: 400;
      font-size: 40px;
      line-height: 50px;
      text-transform: uppercase;
      color: #ffffff;
      position: relative;
    }
  }

  /* particles */
  .banner_particles {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
  }

  @media only screen and (min-width: 768px) and (max-width: 991px) {
    .mint_left_content {
      padding-right: 20px;
    }

    .mint_right_content {
      .content_header {
        h4 {
          font-size: 18px;
        }

        h1 {
          font-size: 40px;
        }
      }

      .content_footer {
        h5 {
          font-size: 18px;
        }
      }
    }

    .countBox {
      .countBoxItem {
        .count {
          font-size: 36px !important;
        }
      }
    }
  }

  @media only screen and (max-width: 767px) {
    padding: 30px 0 120px 0;
    .mint_left_inner {
      margin: 0 auto;
    }
    .mint_left_content {
      padding-right: 0;
    }
  }
  @media only screen and (max-width: 575px) {
    padding-bottom: 140px;

    .mint_right_content {
      .content_header {
        h1 {
          font-size: 45px;
        }
      }
    }

    .countBox {
      .countBoxItem {
        .count {
          font-size: 29px !important;
        }
      }
    }
  }

  @media only screen and (max-width: 375px) {
    .mint_right_content {
      .mint_btns {
        flex-direction: column;
        row-gap: 15px;
      }
    }
  }
`;

export default StakingStyleWrapper;
