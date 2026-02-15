import React, { useRef } from "react";
import { Hero, About, Books, DVD } from "../components/index";
import { useTranslation } from "react-i18next";

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
      <Hero targetRef={sectionBRef} />
      <About forwardedRef={sectionBRef} />
      <Books heading={t("Books")} active={-1} hideActive={false} />
      <DVD />
    </div>
  );
};

export default Home;
