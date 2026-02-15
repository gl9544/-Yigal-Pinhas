import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75vh;
  text-align: center;
  h1 {
    direction: ${({ dir }) => dir};
    /* direction: ltr;; */
  }
  /* height: 100%; */
  /* margin: auto; */
`;

const FourOFour = () => {
  const { t, i18n } = useTranslation();
  return (
    <OuterContainer dir={i18n.language === "he" ? "rtl" : "ltr"}>
      <h1>{t('404')}</h1>
    </OuterContainer>
  );
};

export default FourOFour;
