import { IconBrandFacebook, IconBrandFacebookFilled, IconBrandGmail, IconBrandInstagram, IconBrandLinkedin, IconMail } from "@tabler/icons-react";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { getNavLinks } from "./Navbar";
import { useNavigate } from "react-router-dom";

const FooterSection = styled.section`
  min-height: 20vh;
  background-color: var(--dark-brown);
  position: absolute;
  width: 90%;
  bottom: 0;
  padding: 0.5rem 5%;
  display: flex;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  
  hr {
    width: 100%;
    border-color: #FFD60080 !important;;
  }
  @media only screen and (max-width: 768px) {
    gap: 1rem;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex: 1;
  color: var(--cream) !important;

  h4 {
    font-size: 1.2rem;
    margin: 0;
    color: var(--cream) !important;
  }
  p {
    margin: 0;
  }
  a {
    color: var(--cream);
  }

  label{
    font-size: 0.9rem;
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }

  @media only screen and (max-width: 576px) {
    
  }
`;


const MainText = styled.div`
  display: flex;
  gap : 1rem;
  
  @media only screen and (max-width: 768px) {
    gap : 0;
    flex-direction: column;
    align-items: center;
  }
`

const Link = styled.p`
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const Socials = styled.div`
  display: flex;
  gap: 1rem;

  @media only screen and (max-width: 768px) {
    gap: 1.5rem;
  }
`

const SocialIconsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  padding: 1rem 0;
  width: 100%;
`

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--cream) !important;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-3px) scale(1.1);
  }

  @media only screen and (max-width: 768px) {
    width: 45px;
    height: 45px;
  }
`

const Footer = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  return (
    <FooterSection>
      <Row>
        <MainText>
          <h4>{t("YigalPinchas")}</h4> 
          <p>{t("YigalMail")}</p>
        </MainText>
        <Socials>
          {getNavLinks(i18n.language).map((link) => (
            <Link key={link.attr} onClick={()=>navigate(`${i18n.language}/${link.route}`)}>{t(link.attr)}</Link>
          ))}
        </Socials>
      </Row>
      <hr />
      <SocialIconsRow>
          <SocialIcon href="https://www.facebook.com/profile.php?id=61573052222669" target="_blank" rel="noopener noreferrer"><IconBrandFacebook size={26} /></SocialIcon>
          <SocialIcon href="https://www.instagram.com/dr.yigalpinchas.israel?igsh=MW1sbTNrYXB0b2x4Nw==" target="_blank" rel="noopener noreferrer"><IconBrandInstagram size={26} /></SocialIcon>
          <SocialIcon href={`https://mail.google.com/mail/?view=cm&fs=1&to=${t("YigalMail")}`} target="_blank" rel="noopener noreferrer"><IconMail size={26} /></SocialIcon>
          <SocialIcon href="https://www.linkedin.com/in/yigal-pinchas-ph-d-9066b2352/" target="_blank" rel="noopener noreferrer"><IconBrandLinkedin size={26} /></SocialIcon>
      </SocialIconsRow>
      <Row>
        <label>{t("Copyright")}</label>
      </Row>
    </FooterSection>
  );
};

export default Footer;
