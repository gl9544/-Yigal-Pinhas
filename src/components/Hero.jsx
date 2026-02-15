import React from "react";
import styled from "styled-components";
import GuyWorkingOut from "./../assets/internal-images/man-dumbels.webp";
import DumbellSVG from "./../assets/internal-images/weight.svg";
import Tilt from "./Tilt";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const HeroSection = styled.section`
  display: flex;
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  overflow-y: hidden;
  align-items: center;

  @media only screen and (max-width: 1024px) {
    margin-top: 5vh;
  }

  @media only screen and (max-width: 768px) {
    display: block;
    margin-top: 0vh;
  }
`;

const HeroTextContainer = styled.div`
  height: 70vh;
  flex: 4;
  margin: 5% 5% 0%;

  @media only screen and (min-width: 1440px) {
    margin: 7% 10% 0%;
  }

  @media only screen and (max-width: 1024px) {
    margin: 4%;
    margin-top: 5%;
  }

  @media only screen and (max-width: 768px) {
    height: 60vh;
    padding: 0% 0;
    width: 85%;
    margin: auto;
    margin-top: 2rem;
    text-align: center;
  }

  @media only screen and (max-width: 576px) {
    height: 65vh;
    width: 95%;
    padding: 5% 0;
    margin: auto;
  }
`;

const HeroText = styled.h1`
  margin-bottom: 0;
  font-size: 4.2rem;
  line-height: 5rem;

  @media only screen and (max-width: 768px) {
    margin-top: 0rem;
  }
`;

const HeroSubtitle = styled.h3`
  color: var(--highlight);

  @media only screen and (max-width: 1024px) {
    margin: 1.5rem 0rem;
    line-height: 2rem;
  }
`;

const HeroDesc = styled.p`
  color: #656565;
  margin-bottom: 2rem;
  width: 75%;

  @media only screen and (max-width: 768px) {
    width: 65%;
    margin: auto;
  }

  @media only screen and (max-width: 576px) {
    width: 85%;
  }
`;

const ActionButton = styled.button`
  font-size: 20px;
  padding: 1rem 1rem;
  
  @media only screen and (min-width: 1440px) {
    padding: 1.25rem 1.25rem;
  }
  
  @media only screen and (max-width: 768px) {
    margin-top: 2.5rem;
    padding: 1.25rem 1rem;
  }
`;

const TiltContainer = styled(Tilt)`
  height: 70vh;
  flex: 3;
  margin: 5% 0 0%;
  position: relative;
  left: -1%;

  @media only screen and (min-width: 1440px) {
    margin: 7% 0% 0%;
  }

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const HeroGuy = styled.img`
  border-radius: 15px;
  position: absolute;
  width: 70%;
  left: 5vw;
  bottom: 40%;

  @media only screen and (max-width: 768px) {
    z-index: -1;
    opacity: 0.6;
    bottom: 65vh;
    left: 50vw;
    display: none;
  }
`;

const HeroGirl = styled.img`
  border-radius: 15px;
  position: absolute;
  width: 90%;
  bottom: 10%;
  left: ${({ lng }) => (lng === "he" ? "10vw" : "unset")};
  right: ${({ lng }) => (lng === "he" ? "unset" : "10vw")};

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const Dumbell = styled.img`
  position: absolute;
  bottom: 0;
  height: 150px;
  left: ${({ lng }) => (lng === "he" ? "unset" : "0%")};
  right: ${({ lng }) => (lng === "he" ? "0%" : "unset")};
  transform: ${({ lng }) => lng !== "he" && "scaleX(-1)"};

  @media only screen and (max-width: 576px) {
    height: 100px;
  }
`;

const MobileHeroImg = styled.img`
  display: none;

  @media only screen and (max-width: 768px) {
    display: block;
    width: 100%;
    max-height: 38vh;
    object-fit: cover;
    object-position: top;
  }
`;

const Hero = ({ targetRef }) => {
  const { t, i18n } = useTranslation();
  const {lng} = useParams();

  const scrolllToAbout = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <HeroSection lng={lng} id="main">
      <MobileHeroImg
        src={require(`../assets/client-images/Books/3-books-${lng}.jpg`)}
      />
      <HeroTextContainer
        data-aos="fade-up"
        data-aos-duration="1500"
        data-aos-delay="500"
      >
        <HeroText>{t("YigalPinchas")}</HeroText>
        <HeroSubtitle>{t("HeroSubtitle")}</HeroSubtitle>
        <HeroDesc>{t("HeroDescription")}</HeroDesc>
        <ActionButton onClick={scrolllToAbout} className="action-button">
          {t("ReadMore")}
        </ActionButton>
      </HeroTextContainer>
      <TiltContainer>
        <div
          data-aos="fade-up"
          data-aos-duration="1500"
          style={{ position: "relative", height: "100%", width: "100%" }}
        >
          <HeroGuy src={GuyWorkingOut} alt="guy working out with tire" />
          <HeroGirl
            lng={i18n.language}
            src={require(`../assets/client-images/Books/3-books-${i18n.language}.jpg`)}
            alt="girl doing yoga image"
          />
        </div>
      </TiltContainer>
      <Dumbell
        lng={i18n.language}
        src={DumbellSVG}
        alt="guy working out with tire"
      />
    </HeroSection>
  );
};

export default Hero;
