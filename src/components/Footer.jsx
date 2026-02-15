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
    border-color: #fef4ea8e !important;;
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
      <Row>
        <label>{t("Copyright")}</label>

        <Socials>
          <a href="https://www.facebook.com/profile.php?id=61573052222669" target="#blank"><IconBrandFacebook /></a>
          <a href="https://www.instagram.com/dr._yigal_pinchas_office/" target="#blank"><IconBrandInstagram /></a>
          <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${t("YigalMail")}`} target="#blank"><IconMail /></a>
          {/* <a href="https://mail.google.com/mail/?view=cm&fs=1&to=example@email.com&su=Subject">Email using Gmail</a> */}
          <a href="https://www.linkedin.com/in/yigal-pinchas-ph-d-9066b2352/" target="#blank"><IconBrandLinkedin/></a>
        </Socials>
      </Row>
    </FooterSection>
  );
};

export default Footer;
