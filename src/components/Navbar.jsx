import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/globalStyles.css";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguageContext } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import {
  IconBook,
  IconCertificate,
  IconHome,
  IconMenu2,
  IconNews,
  IconWorld,
  IconX,
} from "@tabler/icons-react";

const NavbarSection = styled.nav`
  position: fixed;
  width: 100%;
  height: 10vh;
  z-index: 100;
  top: 0;
  direction: ${({ lng }) => (lng === "he" ? "rtl" : "ltr")};

  @media only screen and (max-width: 768px) {
    direction: ${({ lng }) => (lng === "en" ? "rtl" : "ltr")};
  }
`;

const NavbarContainer = styled.div`
  background: linear-gradient(180deg, var(--cream), #fef4ea);
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #51312684;
  position: relative;
  height: 100%;
  padding: 0 5%;
  gap: 2rem;

  @media only screen and (max-width: 1024px) {
    padding: 0 5%;
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }

  @media only screen and (min-width: 1440px) {
    padding: 0 5%;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  height: 100%;
`;

const HomeLink = styled.button`
  font-weight: bold;
  display: flex;
  background-color: transparent;
  font-size: 1.45rem;
  color: var(--dark-brown);
  margin: 1% 0;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: var(--highlight);
    filter: brightness(1);
  }

  @media only screen and (max-width: 992px) {
    font-size: 1.35rem;
    padding: 0px;
  }
`;

const Link = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--highlight);
  box-shadow: inset 0 0 0 0 var(--highlight);
  transition: color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  padding: 0 2.5vw;
  /* height: 100%; */

  &:hover {
    box-shadow: inset 0 400px 0 0 var(--highlight);
    color: white;
    transition: color 0.2s ease-in-out, box-shadow 0.5s ease-in-out;
  }

  @media only screen and (max-width: 1024px) {
    padding: 0 1.5vw;
  }

  a {
    font-weight: 600;
    font-size: 1.12rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 100%;

    @media only screen and (max-width: 992px) {
      font-size: 1.1rem;
      letter-spacing: 0px;
      padding-right: 5px;
    }
  }
`;

const DeskTopLngSwitcher = styled.div`
  /* justify-self: right; */
`

// --- Mobile Styling ---
const MobileContainer = styled.div`
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  display: none;

  @media only screen and (max-width: 768px) {
    display: block;
  }

  svg {
    margin: 1rem;
  }
`;

const Hamburger = styled.div`
  box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075),
    0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075),
    0 8px 8px hsl(0deg 0% 0% / 0.05);
  display: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--cream);
  margin: 1rem;
  border-radius: 15px;
  height: 60px;
  width: 60px;
  svg {
    margin: 0.5rem;
  }
`;

const MobileNavbarContainer = styled.div`
  background-color: var(--cream);
  height: 100vh;
  width: 65%;
  max-width: 20rem;
  position: absolute;
  right: ${({ lng }) => (lng === "he" ? "unset" : "0")};
  left: ${({ lng }) => (lng === "he" ? "0" : "unset")};
  direction: ${({ lng }) => (lng === "he" ? "rtl" : "ltr")};
  top: 0;
  transition: all 0.2s ease-in-out;
`;

const ModalLink = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0px;
  padding-right: 2vw;
  font-size: 1.5rem;
  color: var(--dark-brown);
  box-shadow: inset 0 0 0 0 var(--highlight);
  transition: color 0.3s ease-in-out, box-shadow 0.4s ease-in-out;

  border-bottom: 1px solid #51312689;
  &:hover {
    box-shadow: inset 500px 0 0 0 var(--highlight);
    color: white;
  }
`;

const SwitcherContainer = styled.div``;

const Mask = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  background-color: #0000002f;
  transition: all 0.2s ease-in-out;
`;

const TopRow = styled.div`
  display: flex;
  height: 5rem;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  position: relative;
  svg {
    margin: 0;
  }
`;

export const getNavLinks = (lng) => [
  {
    attr: "Books",
    route: lng === "he" ? "books/0" : "books/6",
    icon: <IconBook size={27} />,
  },
  {
    attr: "MultimediaShort",
    route: "dvd",
    icon: <IconWorld size={27} />,
  },
  {
    attr: "Courses",
    route: "courses",
    icon: <IconCertificate size={27} />,
  },
  {
    attr: "Articles",
    route: "articles",
    icon: <IconNews size={27} />,
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { lng, id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { isHebrew } = useLanguageContext();
  const { t, i18n } = useTranslation();

  const handleOpen = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setTimeout(setIsOpen(true), 300);
    }
  };

  return (
    <NavbarSection lng={i18n.language}>
      {/* Mobile Sidebar*/}
      <MobileContainer>
        <Hamburger>
          <IconMenu2 onClick={handleOpen} size={60} />
        </Hamburger>
        {isOpen && <Mask onClick={handleOpen}></Mask>}
        <MobileNavbarContainer
          style={{
            transform: `translateX(${
              isOpen ? "0" : i18n.language === "he" ? "-100%" : "100%"
            })`,
          }}
          lng={i18n.language}
        >
          <TopRow>
            <SwitcherContainer lng={i18n.language}>
              <LanguageSwitcher />
            </SwitcherContainer>

            <IconX onClick={handleOpen} size={50} />
          </TopRow>

          <ModalLink
            className={isOpen ? "open" : ""}
            onClick={() => navigate(`/${i18n.language}`)}
          >
            <IconHome size={30} />
            {t("Home")}
          </ModalLink>
          {getNavLinks(i18n.language).map((link, index) => (
            <ModalLink
              className={isOpen ? "open" : ""}
              key={index}
              onClick={() => navigate(`/${i18n.language}/${link.route}`)}
            >
              {link.icon}
              {t(link.attr)}
            </ModalLink>
          ))}
        </MobileNavbarContainer>
        {/* )} */}
      </MobileContainer>

      {/* Desktop Navbar */}
      <NavbarContainer>
        <HomeLink onClick={() => navigate(`/${i18n.language}`)}>
          {t("YigalPinchas")}
        </HomeLink>
        <LinksContainer>
          {getNavLinks(i18n.language).map((link, index) => (
            <Link
              onClick={() => navigate(`/${i18n.language}/${link.route}`)}
              isHebrew={isHebrew}
              key={index}
            >
              {link.icon}
              <a>{t(link.attr)}</a>
            </Link>
          ))}
        </LinksContainer>
        <DeskTopLngSwitcher>
        <LanguageSwitcher />
        </DeskTopLngSwitcher>
      </NavbarContainer>
    </NavbarSection>
  );
};

export default Navbar;
