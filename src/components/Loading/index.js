import React, { memo } from 'react';
import styled from 'styled-components';

import loadingImage from './loading.gif';

const LoadingWrapper = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  background-image: url(${loadingImage});
  background-repeat: no-repeat;
  background-position: center;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
`;

function Loading() {
  return <LoadingWrapper />;
}

export default memo(Loading);
