import { memo } from "react";
import styled from "styled-components";
import logoImage from "./logo-aparat.svg";
import logoImageName from "./logo-name.svg";

const StyledLogo = styled.div`
  text-align: center;

  img{
      height: 30px;
      display: inline-block;
  }
`;



function Logo() {
  return (
    <StyledLogo>
      <img src={logoImage} alt="aparat logo" />
      <img src={logoImageName} alt="aparat logo" />

    </StyledLogo>
  );
}

Logo.propTypes = {};

export default memo(Logo);
