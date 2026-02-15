import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css"; // Import default styles
import styled from "styled-components";
import { getFilePlugin } from "@react-pdf-viewer/get-file";
import { useTranslation } from "react-i18next";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

const Section = styled.section`
  min-height: 100vh;
  padding-top: 10vh;
  background-color: var(--light-cream);
  direction: ${({ lng }) => (lng === "he" ? "rtl" : "ltr")};
  text-align: ${({ lng }) => (lng === "he" ? "right" : "left")};
`;

const BackBtn = styled.button`
  height: 3rem;
  margin: 2rem 5%;
  border-radius: 10px;
  background-color: var(--highlight);
  color: var(--light-cream);
  font-size: 1rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;

  @media only screen and (min-width: 1440px) {
    margin: 2rem 10%;
  }
`;

const ViewerContainer = styled.div`
  margin: auto;
  overflow-x: hidden;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

  h3 {
    width: 95%;
  }

  @media only screen and (max-width: 768px) {
    width: 80%;
  }

  @media only screen and (max-width: 576px) {
    width: 95%;
  }
`;

const VideoContainer = styled.div`
  width: 95%;
  display: flex;
  justify-content: center;
  height: 80vh;
  margin-bottom: 2rem;

  @media only screen and (max-width: 768px) {
    height: 70vh;
  }

  @media only screen and (max-width: 576px) {
    height: 40vh;
  }
`;

const DownloadBtn = styled.button`
  background-color: var(--highlight);
  padding: 0.8rem 1.8rem;
  border-radius: 10px;
  color: var(--light-cream);
  margin-bottom: 1rem;
  font-size: 1rem;
  box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.03), 0 2px 2px hsl(0deg 0% 0% / 0.03),
    0 4px 4px hsl(0deg 0% 0% / 0.03), 0 8px 8px hsl(0deg 0% 0% / 0.03),
    0 16px 16px hsl(0deg 0% 0% / 0.03);
`;

const Paper = () => {
  const navigate = useNavigate();
  const { lng, id } = useParams();
  const { t, i18n } = useTranslation();
  const getFilePluginInstance = getFilePlugin();

  const ArticlesArr = Object.entries(
    t("ArticlesData", { returnObjects: true })
  ).map(([key, val]) => val);

  useEffect(() => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  }, []);
  
  // if more articles in one language than the other
  if (id > ArticlesArr.length - 1) {
    navigate(`/${i18n.language}/articles`);
    return <></>;
  }

  const paper = ArticlesArr[id];
  const pdfjsVersion = require("pdfjs-dist/package.json").version;

  const downloadPdf = (url, name) => {
    // Creating a link element dynamically
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}.pdf`;

    // Appending the link to the document
    document.body.appendChild(link);

    // Triggering the click event to start the download
    link.click();

    // Removing the link from the document after the download
    document.body.removeChild(link);
  };

  return (
    <Section lng={i18n.language}>
      <BackBtn onClick={() => navigate(`/${i18n.language}/articles`)}>
        {i18n.language === "he" ? (
          <IconArrowRight size={20} />
        ) : (
          <IconArrowLeft size={20} />
        )}
        {t("Back")}
      </BackBtn>
      <ViewerContainer>
        {/* Only relevant for the one with video (others have the title as part of the PDF) */}
        {paper.name === 'תקציר לסרטון האבולוציה של החנ"ג' && (
          <>
            <h3>{paper.name}</h3>
            <VideoContainer>
              <iframe
                width="100%"
                src={`https://www.youtube.com/embed/Q2FBKluBJhQ`}
                title="YouTube Video Preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </VideoContainer>
          </>
        )}
        <Worker
          workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
        >
          <Viewer
            fileUrl={require(`../static/articles/${i18n.language}/${paper.url}.pdf`)}
            defaultScale={SpecialZoomLevel.PageWidth}
            plugins={[getFilePluginInstance]}
          />
          <DownloadBtn
            onClick={() =>
              downloadPdf(
                require(`../static/articles/${i18n.language}/${paper.url}.pdf`),
                paper.name
              )
            }
          >
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/material-rounded/24/FFFFFF/download--v1.png"
              alt="download--v1"
            />
          </DownloadBtn>
        </Worker>
      </ViewerContainer>
    </Section>
  );
};

export default Paper;
