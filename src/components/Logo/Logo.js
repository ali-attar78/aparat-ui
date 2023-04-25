import { memo } from "react";
import styled from "styled-components";
import logoImage from "./logo-aparat.svg";
import logoImageName from "./logo-name.svg";
import PropTypes from 'prop-types';


const sizes = {
  small: 17,
  medium: 30,
  large: 40,
};

const StyledLogo = styled.div`
  text-align: center;

  img {
    height: ${props => sizes[props.size]}px;
    display: inline-block;
  }
`;

function Logo(props) {
  return (
    <StyledLogo {...props}>
    <img src={logoImage} alt="آپارات" />
    <img src={logoImageName} alt="آپارات" />
  </StyledLogo>
  );
}

Logo.propTypes = {
  size: PropTypes.oneOf(Object.keys(sizes)),
};

Logo.defaultProps = {
  size: 'medium',
};


export default memo(Logo);
