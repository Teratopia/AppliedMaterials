import styled from "@emotion/styled";
import theme from "../theme";

export default styled.div`
  min-height: 700px;
  padding-top: 66px;

  @media screen and (min-width: ${ theme.breakpoints.mid }px) {
    padding-top: 96px;
  }
`;