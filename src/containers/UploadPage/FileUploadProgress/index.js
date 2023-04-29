import React, { memo } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: red;
`;

function FileUploadProgress() {
  return (
    <Wrapper>
      <h1>FileUploadProgress</h1>
    </Wrapper>
  );
}

export default memo(FileUploadProgress);
