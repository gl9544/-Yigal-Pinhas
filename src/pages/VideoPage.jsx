import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { videoNodes } from "../static/videos";
import BlobSVG from "../assets/internal-images/heroBlob.svg";

const Section = styled.section`
  background-color: var(--light-cream);
  position: relative;
  padding: 5%;
  padding-top: 12%;
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
    transform: rotate(45deg);
    transform-origin: center center;
    z-index: -1;
  }

  @media only screen and (min-width: 1440px) {
    padding: 5% 10%;
    padding-top: 10%;
  }

  @media only screen and (max-width: 768px) {
    padding: 5%;
    padding-top: 15%;
  }
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  font-size: 2.5rem;

  @media only screen and (max-width: 576px) {
    margin-top: 2rem;
    font-size: 1.8rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 2rem;
  line-height: 1.8rem;
  max-width: 700px;
`;

const VideoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;

  video {
    width: 50%;
    max-height: 70vh;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
    background: #000;

    @media only screen and (max-width: 768px) {
      width: 90%;
    }
  }
`;

const OtherVideos = styled.div`
  margin-top: 4rem;
`;

const OtherTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media only screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const VideoCard = styled.div`
  background: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.18);
  }

  video {
    width: 100%;
    height: 160px;
    object-fit: cover;
    pointer-events: none;
  }

  p {
    color: #fff;
    padding: 0.75rem 1rem;
    font-size: 0.95rem;
    font-weight: 600;
  }
`;

const VideoPage = () => {
  const { lng, id } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const node = videoNodes.find((v) => v.id == id);

  useEffect(() => {
    if (node && node.language !== lng) {
      const offset = lng === "en" ? 4 : -4;
      const alternate = videoNodes.find((v) => v.id == node.id + offset);
      if (alternate) navigate(`/${lng}/videos/${alternate.id}`);
    }
    setIsLoading(false);
  }, [lng]);

  if (isLoading || !node) return <></>;

  const others = videoNodes.filter((v) => v.language === lng && v.id != id);

  return (
    <Section>
      <Title>{node.title}</Title>
      <Description>{node.description}</Description>
      <VideoWrapper>
        <video key={node.src} controls autoPlay muted>
          <source src={node.src} type="video/mp4" />
        </video>
      </VideoWrapper>

      {others.length > 0 && (
        <OtherVideos>
          <OtherTitle>{lng === "he" ? "סרטונים נוספים" : "More Videos"}</OtherTitle>
          <VideoGrid>
            {others.map((v) => (
              <VideoCard key={v.id} onClick={() => navigate(`/${lng}/videos/${v.id}`)}>
                <video muted>
                  <source src={v.src} type="video/mp4" />
                </video>
                <p>{v.title}</p>
              </VideoCard>
            ))}
          </VideoGrid>
        </OtherVideos>
      )}
    </Section>
  );
};

export default VideoPage;
