import React from "react";
import styled from "styled-components";
import YigalImg from "./../assets/client-images/yigal-new.jpg";
import GroceriesSVG from "./../assets/internal-images/Bag of groceries.svg";
import { useTranslation } from "react-i18next";

const AboutSection = styled.section`
  position: relative;
  padding: 5%;
  background-color: var(--light-cream);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media only screen and (min-width: 1440px) {
    padding: 5% 10%;
  }

  h2 {
    text-align: center;
    margin: 0;
  }

  h4 {
    color: var(--highlight);
    text-align: center;
    margin: 0.5rem;
  }
`;

const MainContainer = styled.div`
  direction: ${({ lng }) => (lng === "he" ? "ltr" : "rtl")};
  gap: 1.5rem;
  height: 70%;
  margin: 2rem 0;
  padding: 2rem 3%;

  @media only screen and (max-width: 768px) {
    padding: 2rem 0;
    width: 100%;
  }

  @media only screen and (max-width: 576px) {
    margin-top: 3rem;
  }

  img {
    float: ${({ lng }) => (lng === "he" ? "left" : "right")};
    margin: ${({ lng }) =>
      lng === "he" ? "0 3rem 2rem 0" : "0 0rem 2rem 3rem"};
    width: 30%;
    object-fit: cover;
    display: block;

    @media only screen and (max-width: 768px) {
      width: 45vw;
      float: none;

      margin: 2rem auto;
    }
    @media only screen and (max-width: 576px) {
      width: 50vw;
    }
  }
`;

const AboutTextContainer = styled.div`
  @media only screen and (max-width: 768px) {
    margin: auto;
    width: 100%;
  }

  p {
    direction: ${({ lng }) => (lng === "he" ? "rtl" : "ltr")};
    line-height: 1.5rem;
    list-style: none;
    text-align: ${({ lng }) => (lng === "he" ? "right" : "left")};

    @media only screen and (max-width: 768px) {
      line-height: 2;
      width: 90%;
      margin: auto;
    }
  }
`;

const AboutImageContainer = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    float: left;
    width: 70%;
    object-fit: contain;

    @media only screen and (max-width: 768px) {
      width: 45vw;
    }
    @media only screen and (max-width: 576px) {
      width: 50vw;
    }
  }
`;

const Groceries = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10%;
`;

const About = ({ forwardedRef }) => {
  const { t, i18n } = useTranslation();

  return (
    <AboutSection id="about" ref={forwardedRef}>
      <h2>{t("AboutTitle")}</h2>
      <h4>{t("AboutSubtitle")}</h4>
      <MainContainer
        // data-aos="fade-up"
        // data-aos-duration="1500"
        lng={i18n.language}
      >
        <img src={YigalImg} alt="Yigal Pinchas - יגאל פנחס" />
        <AboutTextContainer
          dangerouslySetInnerHTML={{ __html: t("AboutMain") }}
          lng={i18n.language}
        ></AboutTextContainer>
        {/* <AboutImageContainer> */}
        {/* </AboutImageContainer> */}
      </MainContainer>
      <Groceries src={GroceriesSVG} alt="bag-of-groceries" />
    </AboutSection>
  );
};

export default About;
