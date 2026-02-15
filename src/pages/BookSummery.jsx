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

const Purchase = styled.a`
  font-size: 1.3rem;
  font-weight: 400;
  line-height: 2rem;
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

          {node.purchaseMethod === "url" ? (
            <div>
              <h3 style={{ lineHeight: "2.5rem" }}>
                {t("PurchaseBooks")} &nbsp; <br />
                <Purchase href={node.purchaseMessage} target="#blank">
                  {t("ClickHere")}
                </Purchase>
              </h3>
            </div>
          ) : node.purchaseMethod === "contact" ? (
            <div
              style={{ lineHeight: "2.5rem" }}
              dangerouslySetInnerHTML={{ __html: node.purchaseMessage }}
            ></div>
          ) : (
            <h4>{node.purchaseMessage}</h4>
          )}

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
      </Section>
      <Books heading={t("MoreBooks")} active={id} hideActive={true} />
    </>
  );
};

export default BookSummery;
