import styled from "@emotion/styled";
import theme from "../theme.js";

export default styled.div`
  margin: 0 auto;
  max-width: 1080px;
  padding: 12px 0px;


  @media screen and (min-width: ${theme.breakpoints.mid}px) {
    padding: 12px 20px;

  }

`;