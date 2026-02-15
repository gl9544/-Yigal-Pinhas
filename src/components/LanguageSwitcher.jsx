import React from "react";
import styled from "styled-components";
import EnglishFlag from "../assets/internal-images/american-english.png";
import HebrewFlag from "../assets/internal-images/israel.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SwitcherContainer = styled.a`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: block;
  aspect-ratio: 1;
  padding: 0;
  background-image: ${({ lng }) =>
    lng === "he" ? `url(${EnglishFlag})` : `url(${HebrewFlag})`};
  background-size: cover;
  background-position: center;
`;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const url = window.location.pathname;
  const pathWithoutLang = url.substring(3);

  const handleChangeLanguage = () => {
    const switchTo = i18n.language === "he" ? "en" : "he";
    i18n.changeLanguage(switchTo);
    navigate(`/${switchTo}${pathWithoutLang}`);
  };

  return (
    <SwitcherContainer
      lng={i18n.language}
      onClick={handleChangeLanguage}
    ></SwitcherContainer>
  );
};

export default LanguageSwitcher;
