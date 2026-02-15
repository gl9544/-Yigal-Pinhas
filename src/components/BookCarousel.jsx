import { useTranslation } from "react-i18next";
import styled from "styled-components";
import BlobImg from "../assets/internal-images/heroBlob.svg";
import { useParams } from "react-router-dom";

const BookCarouselContainer = styled.div`
  margin: 10% 0;
  display: flex;
  position: relative;
  justify-content: ${({ lng }) => (lng === "he" ? "flex-end" : "flex-start")};
  min-height: 29vh;
  height: 45vh;

  @media only screen and (max-width: 1024px) {
    height: 38vh;
  }

  @media only screen and (max-width: 768px) {
    height: 45vh;
  }

  @media only screen and (max-width: 576px) {
    height: 35vh;
  }
`;

const InnerContainer = styled.div`
  position: absolute;
  height: 45vh;
  width: 15vw;
  transition: transform 0.2s ease-in-out;
  &:hover {
    filter: brightness(0.9);
  }
  @media only screen and (max-width: 768px) {
    height: 45vh;
    width: 32%;
    /* left: -7%; */
  }

  @media only screen and (max-width: 576px) {
    height: 35vh;
    width: 35%;
    width: 40%;
  }
`;

const BookCover = styled.img`
  min-height: 15rem;
  height: 44vh;
  width: 100%;
  transition: transform 0.25s ease-in-out;
  box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075),
    0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075),
    0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075);
  &:hover {
    transform: translateY(-10px);
  }
  @media only screen and (min-width: 1440px) {
    height: 40vh;
    width: 90%;
  }
  @media only screen and (max-width: 1024px) {
    height: 35vh;
  }
  @media only screen and (max-width: 768px) {
    height: 38vh;
  }

  @media only screen and (max-width: 576px) {
    height: 30vh;
  }
`;

const MoreInEnglish = styled.div`
  min-height: 15rem;
  height: 44vh;
  background-color: var(--light-cream);
  width: 100%;
  position: relative;
  display: flex;
  border-radius: 1px;
  align-items: center;
  color: var(--cream);

  background-size: cover;
  justify-content: center;
  background-image: url(${BlobImg});
  background-repeat: no-repeat;
  background-position: bottom;

  h4 {
    font-size: 1.2rem;
    margin: auto;
  }

  transition: transform 0.25s ease-in-out;
  box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075),
    0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075),
    0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075);
  &:hover {
    transform: translateY(-10px);
  }
  @media only screen and (min-width: 1440px) {
    height: 40vh;
    width: 90%;
  }
  @media only screen and (max-width: 1024px) {
    height: 35vh;
  }
  @media only screen and (max-width: 768px) {
    height: 38vh;
  }

  @media only screen and (max-width: 576px) {
    height: 30vh;
  }
`;

const Indicator = styled.div`
  width: 100%;
  height: 120%;
  position: relative;
  /* background-color: rebeccapurple; */
  overflow-x: hidden;
  p {
    font-size: 14px;
    opacity: 0.5;
    font-weight: 500;
    position: absolute;
    width: 100%;
    transform: translateY(60%);
    bottom: 2%;
  }

  > div {
    background-color: #80808078;
    position: absolute;
    width: 90%;
    height: 3px;
    bottom: 10%;
    left: ${({ lng }) => (lng === "he" ? "7%" : "3%")};

    @media only screen and (max-width: 1024px) {
      width: 85%;
      left: 7%;
    }
  }
`;

const ActiveIndicator = styled.div`
  background-color: #00000073;
  height: 3px;
  position: absolute;
  left: 0;
`;

const getDisplayType = (w) => {
  if (w > 1200) {
    return 0.85;
  } else if (w > 992) {
    return 0.92;
  } else if (w > 768) {
    return 1;
  } else if (w > 576) {
    return 0.85;
  } else {
    return 1.05;
  }
};

const BookCarousel = ({ nodes, currActive, setCurrActive, hideActive }) => {
  const { t, i18n } = useTranslation();
  const { lng } = useParams();

  const winW = getDisplayType(window.innerWidth);

  const getVisualData = (idx) => {
    const offset =
      Math.log((nodes.length * window.innerWidth) / 1100) * 6 +
      (nodes.length > 3 ? -3 : 15);
    let DIST = Math.abs(nodes.indexOf(currActive) - idx);
    let OFF_SET =
      Math.log(10) * (nodes.indexOf(currActive) - idx) +
      (50 * idx) / winW +
      offset;
    let SIZE_TRANSFORM = 1 / (DIST * Math.log(9)) + 0.5;
    let Z_INDEX_OFF_SET = 10 - DIST;

    return {
      transform: `translateX(${OFF_SET}%) scale(${
        nodes.indexOf(currActive) === idx ? "1.1" : SIZE_TRANSFORM
      })`,
      zIndex: Z_INDEX_OFF_SET,
    };
  };

  return (
    <BookCarouselContainer lng={lng}>
      {nodes.map((book, idx) => {
        const style = getVisualData(idx);

        return (
          <InnerContainer style={style} key={`book-cover-${book.id}`}>
            {book.name === "ספרים באנגלית" ? (
              <MoreInEnglish onClick={() => setCurrActive(book)}>
                <h4>ספרים באנגלית</h4>
              </MoreInEnglish>
            ) : (
              <BookCover
                onClick={() => setCurrActive(book)}
                src={book.coverSrc}
                alt={book.name}
              ></BookCover>
            )}
          </InnerContainer>
        );
      })}
      <Indicator>
        <p>{t("LibraryInstructions")}</p>
        <div>
          <ActiveIndicator
            style={{
              transform: `translateX(${nodes.indexOf(currActive) * 100}%)`,
              width: `${100 / nodes.length}%`,
            }}
          />
        </div>
      </Indicator>
    </BookCarouselContainer>
  );
};

export default BookCarousel;
