import React, { useEffect, useState } from "react";
import { bookNodes } from "../static/books";
import styled from "styled-components";
import { Books } from "../components/index";
import BlobSVG from "../assets/internal-images/heroBlob.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Section = styled.section`
  background-color: var(--light-cream);
  position: relative;
  padding: 5%;
  padding-top: 10%;
  overflow: hidden;
  min-height: 100vh;

  &::before {
    content: "";
    position: absolute;
    top: 3rem;
    left: 4rem;
    width: 100%;
    height: 100%;
    background-image: url(${BlobSVG});
    background-size: cover;
    transform: rotate(45deg); /* Change the angle as needed */
    transform-origin: center center;
    z-index: -1;
  }

  @media only screen and (min-width: 1440px) {
    padding: 5% 10%;
  }

  @media only screen and (max-width: 769px) {
    padding: 5%;
  }
`;

const Title = styled.h2`
  z-index: 10;
  width: 80%;
  margin-bottom: 2rem;
  font-size: 3rem;

  @media only screen and (max-width: 576px) {
    margin-top: 4rem;
    font-size: 2.2rem;
    width: 100%;
  }
`;

const Content = styled.div`
  z-index: 10;
  line-height: 1.5rem;
`;

const PurchaseButton = styled.a`
  display: inline-block;
  margin: 2rem 0;
  padding: 1rem 2.5rem;
  background-color: #1a1a1a;
  color: var(--highlight);
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  border-radius: 50px;
  text-decoration: none;
  transition: background-color 0.25s ease, transform 0.2s ease;
  &:hover {
    background-color: #333;
    transform: translateY(-2px);
  }
`;

const ContactCard = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin: 2rem 0;
  padding: 1rem 2.5rem;
  background-color: #1a1a1a;
  border-radius: 50px;
  color: #fff;
  font-size: 1.05rem;
  font-weight: 500;
  a {
    color: var(--highlight);
    font-weight: 700;
    text-decoration: none;
  }
`;

const VideoTextRow = styled.div`
  display: flex;
  direction: ltr;
  flex-direction: ${({ lng }) => (lng === "he" ? "row" : "row-reverse")};
  gap: 3rem;
  align-items: flex-start;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const BookVideo = styled.video`
  width: 35%;
  min-width: 260px;
  border-radius: 12px;
  flex-shrink: 0;
  box-shadow: 0 4px 24px rgba(0,0,0,0.15);

  @media only screen and (max-width: 768px) {
    width: 100%;
    min-width: unset;
  }
`;

const FullCover = styled.img`
  width: ${(props) => (props.size === 2 ? "60%" : "40%")};
  margin: auto;
  align-self: center;
  padding: ${(props) => (props.size === 2 ? "2% 20%" : "2% 30%")};
`;

const BookSummery = () => {
  const { lng, id } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const node = bookNodes.find((n) => n.id == id);

  // switch to the first book if the language was switched
  useEffect(() => {
    if (node.language !== lng) {
      const temp = bookNodes.find((n) => n.language === lng);
      navigate(`/${lng}/books/${temp.id}`);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [lng]);

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <Section lng={i18n.language}>
        <Title>{node.name}</Title>

        <VideoTextRow lng={i18n.language}>
          {node.videoSrc && (
            <BookVideo key={node.id} controls>
              <source src={node.videoSrc} type="video/mp4" />
              <source src={node.videoSrc} type="video/quicktime" />
            </BookVideo>
          )}
          <Content>
          {node.paragraphs.map((p, idx) => (
            <div key={idx} dangerouslySetInnerHTML={{ __html: p }}></div>
          ))}
          {node.points && (
            <ul>
              {node.points.map((p) => (
                <li>{p}</li>
              ))}
            </ul>
          )}

          {node.language === "he" && node.purchaseMethod === "url" ? (
            <PurchaseButton href={node.purchaseMessage} target="_blank" rel="noopener noreferrer">
              ← {t("PurchaseBooks")}
            </PurchaseButton>
          ) : node.language === "he" ? (
            <ContactCard>
              <a href="mailto:yigalpinchas@gmail.com">yigalpinchas@gmail.com</a>
              <span>:לרכישת הספר צרו קשר</span>
            </ContactCard>
          ) : node.purchaseMethod === "url" ? (
            <PurchaseButton href={node.purchaseMessage} target="_blank" rel="noopener noreferrer">
              {t("PurchaseBooks")} →
            </PurchaseButton>
          ) : node.purchaseMethod === "unavailable" ? (
            <h4>{node.purchaseMessage}</h4>
          ) : null}

          {node.fullCover && (
            <FullCover
              size={
                node.name ===
                "The Complete Holistic Guide To Working Out In The Gym"
                  ? 1
                  : 2
              }
              src={node.fullCover}
              alt="full cover"
            />
          )}
          </Content>
        </VideoTextRow>
      </Section>
      <Books heading={t("MoreBooks")} active={id} hideActive={true} />
    </>
  );
};

export default BookSummery;
