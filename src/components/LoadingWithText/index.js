import React, { memo } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

import loadingImage from '../Logo/logo-aparat.svg';

const RotateAnim = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingWrapper = styled.div`
  overflow: hidden;
  padding: 5px;

  .img {
    animation: ${RotateAnim} 1s linear infinite;
    width: 36px;
    height: 36px;
  }

  span,
  .img {
    float: right;
  }

  span {
    display: inline-block;
    padding: 10px;
    font-weight: bold;
  }
`;

function LoadingWithText({ text }) {
  return (
    <LoadingWrapper>
      <img className="img" src={loadingImage} alt="text" />
      <span>{text}</span>
    </LoadingWrapper>
  );
}

LoadingWithText.propTypes = {
  text: PropTypes.string,
};

LoadingWithText.defaultProps = {
  text: 'در حال بارگذاری...',
};

export default memo(LoadingWithText);
