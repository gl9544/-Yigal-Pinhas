import React from "react";
import { DVD } from "../components";
import styled from "styled-components";

const Page = styled.section`
  padding-top: 10vh;
  background-color: var(--light-cream);
`;

const Multimedia = () => {
  return (
    <Page>
      <DVD />
    </Page>
  );
};

export default Multimedia;
