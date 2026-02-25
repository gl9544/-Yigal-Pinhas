import React, { useRef } from "react";
import { Hero, About, Books, DVD } from "../components/index";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const VideoSection = styled.section`
  width: 100%;
  margin-top: 10vh;
  background-color: var(--dark-brown);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  video {
    width: 60%;
    height: 120vh;
    object-fit: cover;
    display: block;

    @media only screen and (max-width: 768px) {
      width: 85%;
      height: 70vh;
    }
  }
`;

const Home = () => {
  const sectionBRef = useRef(null);
  const { t, i18n } = useTranslation();
  const url = window.location.pathname;
  const pathWithoutLang = url.substring(3);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  // if (url.contains("/en") && i18n.language === "he") {
  //   i18n.changeLanguage("en");
  // } else if (!url.contains("/en") && i18n.language === "en") {
  //   i18n.changeLanguage("he");
  // }

  return (
    <div className="App">
      <VideoSection>
        <video autoPlay muted loop playsInline>
          <source src="/hero-video.MOV" type="video/quicktime" />
          <source src="/hero-video.MOV" type="video/mp4" />
        </video>
      </VideoSection>
      <Hero targetRef={sectionBRef} />
      <About forwardedRef={sectionBRef} />
      <Books heading={t("Books")} active={-1} hideActive={false} />
      <DVD />
    </div>
  );
};

export default Home;
