import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { bookNodes } from "../static/books";
import { useNavigate, useParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";
import BookCarousel from "./BookCarousel";
import { IconArrowLeft } from "@tabler/icons-react";

const BooksSection = styled.section`
  padding: 3vh 5%;
  overflow: hidden;
  background-color: #65b3e155;

  @media only screen and (min-width: 1440px) {
    padding: 4vh 10%;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: auto;
  min-height: 50vh;
  gap: 5rem;

  @media only screen and (max-width: 1025px) {
    gap: 2rem;
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    gap: 0rem;
  }
`;

const BookCarouselContainer = styled.div`
  flex: 5;
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;

  @media only screen and (max-width: 768px) {
    flex: 1;
  }
`;

const BookDescContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 4rem;
  flex: 4;

  @media only screen and (max-width: 768px) {
    width: 80%;
    margin: auto;
    text-align: center;
    align-items: center;
    flex: 1;
  }

  @media only screen and (max-width: 576px) {
    width: 100%;
    padding: 17% 0;
  }

  h3 {
    margin-bottom: 0rem;
    font-size: 2rem;

    @media only screen and (max-width: 769px) {
      margin-bottom: 1.5rem;
    }
  }

  p {
    color: #5b5b5b;
    width: 100%;
    line-height: 1.3rem;

    @media only screen and (min-width: 1440px) {
      line-height: 1.7;
    }

    @media only screen and (max-width: 768px) {
      margin: auto;
      margin-bottom: 5%;

      /* text-align: justify; */
    }

    @media only screen and (max-width: 576px) {
      width: 90%;
    }
  }
`;

const ActionButton = styled.button`
  border-radius: 10px;
  font-size: 1.2rem;
  width: max-content;
  background-color: #234e76;
  color: var(--cream);
  padding: 1rem 1.25rem;
  margin-top: 0.5rem;
  
  @media only screen and (min-width: 1440px) {
    padding: 1rem 1.25rem;
  }
  
  @media only screen and (max-width: 768px) {
    margin-top: 1rem;
    padding: 1.25rem 1.5rem;
  }
`;

const Books = ({ heading, active, hideActive }) => {
  const navigate = useNavigate();
  const {lng} = useParams();
  const { t } = useTranslation();
  const [lngBooks, setLngBooks] = useState(
    bookNodes.filter((book) => book.language === lng)
  );
  const nodes = lngBooks.filter(
    (book, idx) => !hideActive || active != book.id
  );
  const [currActive, setCurrActive] = useState(
    active !== -1 ? nodes.findIndex((book) => book.id != active) : nodes[0]
  );

  useEffect(() => {
    const newBooks = bookNodes.filter( (book) => book.language === lng);
    setCurrActive(
      active !== -1 ? newBooks.find((book) => book.id != active) : newBooks[0]
    );
    setLngBooks(newBooks);
  }, [lng]);

  const handleReadMore = () => {
    const temp = lngBooks.filter((book, idx) => idx != currActive.id);
    setCurrActive(temp[0]);
    navigate(`/${lng}/books/${currActive.id}`);
    window.scrollTo(0, 0);
  };

  const handleChangeLanguage = () => {
    const switchTo = lng === "he" ? "en" : "he";
    navigate(`/${switchTo}/books/3`);
  };

  useEffect(() => {
    AOS.refresh();
  }, [currActive]);

  return (
    <BooksSection id="books-container">
      <h2>{heading}</h2>
      <MainContainer>
        <BookCarouselContainer>
          <BookCarousel
            nodes={nodes}
            currActive={currActive}
            setCurrActive={setCurrActive}
            hideActive={hideActive}
          />
        </BookCarouselContainer>
        <BookDescContainer
          data-aos="fade-up"
          data-aos-duration="1000"
          style={{ direction: lng === "he" ? "rtl" : "ltr" }}
        >
          <h3>{currActive.name}</h3>
          <p style={{ direction: currActive.direction }}>
            {currActive.shortDesc}
          </p>
          {currActive.name === "ספרים באנגלית" ? (
            <ActionButton onClick={handleChangeLanguage}>
              <IconArrowLeft />
            </ActionButton>
          ) : (
            <ActionButton onClick={handleReadMore}>
              {t("ReadMore")}
            </ActionButton>
          )}
        </BookDescContainer>
      </MainContainer>
    </BooksSection>
  );
};

export default Books;
