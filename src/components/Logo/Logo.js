import { memo } from "react";
import styled from "styled-components";
import logoImage from "./logo.png";

const StyledLogo = styled.div`
text-align: center;
`;

function Logo(){
    return <StyledLogo>

<img src={logoImage} alt="aparat logo"/>

    </StyledLogo>
}

Logo.propTypes = {};

export default memo(Logo);