import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BlobSVG from "../assets/internal-images/heroBlob.svg";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IconVideo } from "@tabler/icons-react";

const Page = styled.div`
  margin-top: 10vh;
`;

const PapersSection = styled.section`
  position: relative;
  min-height: 100vh;
  background-color: var(--cream);
  padding: 0 5%;
  overflow: hidden;

  @media only screen and (min-width: 1440px) {
    padding: 0 10%;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;

  @media only screen and (max-width: 576px) {
    height: 85%;
  }
`;

const ListItem = styled.button`
  flex-direction: column;
  align-items: center;
  justify-content: center;

  flex: 0 0 calc(25% - 1rem);
  display: flex;
  gap: 12px;
  border-radius: 10px;
  min-height: 6rem;
  font-size: 1.1rem;
  color: black;
  background: linear-gradient(45deg, #f9f4ee 0%, #fffcf9 100%);
  z-index: 2;
  box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.03), 0 2px 2px hsl(0deg 0% 0% / 0.03),
    0 4px 4px hsl(0deg 0% 0% / 0.03), 0 8px 8px hsl(0deg 0% 0% / 0.03),
    0 16px 16px hsl(0deg 0% 0% / 0.03);
  padding: 1.5rem;

  border: 1px solid #51312616;
  @media only screen and (max-width: 768px) {
    flex: 0 0 calc(33% - 1rem);
  }

  @media only screen and (max-width: 576px) {
    flex: 0 0 calc(50% - 1rem);
  }

  @media only screen and (min-width: 1440px) {
    font-size: 1.25rem;
  }
`;

const Blob = styled.img`
  position: absolute;
  height: 80vh;
  bottom: -50vh;
  left: -15%;
  transform: rotate(0deg);

  @media only screen and (max-width: 576px) {
    left: -15%;
    bottom: -30%;
  }
`;

const SearchContainer = styled.div`
  height: 3rem;
  margin: 2rem 0;

  input {
    height: 100%;
    width: 30%;
    min-width: 15rem;
    padding: 0 10px;
    font-size: 1rem;
    border-radius: 10px;
    border: none;
    box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.025),
      0 2px 2px hsl(0deg 0% 0% / 0.025), 0 4px 4px hsl(0deg 0% 0% / 0.025),
      0 8px 8px hsl(0deg 0% 0% / 0.025), 0 16px 16px hsl(0deg 0% 0% / 0.025);
  }
`;

const NotFoundText = styled.h3`
  margin-bottom: 10rem;
  height: 50vh;
`;

const Papers = () => {
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();
  const ArticlesArr = Object.entries(
    t("ArticlesData", { returnObjects: true })
  ).map(([key, value]) => value);
  const [filteredPapers, setFilteredPapers] = useState(ArticlesArr);
  const [searchQuery, setSearchQuery] = useState("");
  const specialArticles = [
    "קשיים ואתגרים בחינוך הגופני",
    'תקציר לסרטון האבולוציה של החנ"ג',
  ];

  useEffect(() => {
    const ArticlesArr = Object.entries(
      t("ArticlesData", { returnObjects: true })
    ).map(([key, value]) => value);
    setFilteredPapers(ArticlesArr);
  }, [t, i18n.language]);

  const handleClick = (id) => {
    navigate(`/${i18n.language}/articles/${id}`);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setFilteredPapers(
      ArticlesArr.filter((paper) => paper.name.includes(e.target.value))
    );
  };

  return (
    <Page>
      <PapersSection>
        <h2>{t("Articles")}</h2>
        <SearchContainer>
          <input
            value={searchQuery}
            id="search"
            onChange={handleSearch}
            placeholder={t("ArticleSearch")}
          />
        </SearchContainer>
        <ListContainer>
          {filteredPapers.length === 0 && (
            <NotFoundText>{t("NoArticleFound")}</NotFoundText>
          )}
          {filteredPapers.map((item, index) => (
            <ListItem
              key={index}
              className="paper-list-item"
              value={index}
              onClick={() => handleClick(index)}
              style={{
                color:
                  specialArticles.find((a) => a === item.name) && "#da6739",
              }}
            >
              {item.name}
              {item.name === 'תקציר לסרטון האבולוציה של החנ"ג' && (
                <IconVideo size={30} color="black" />
              )}
            </ListItem>
          ))}
          <Blob src={BlobSVG} alt="blob" />
        </ListContainer>
      </PapersSection>
    </Page>
  );
};

export default Papers;
