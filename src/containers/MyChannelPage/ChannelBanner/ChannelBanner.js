import styled from 'styled-components';

export default styled.div`
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: #888;
  height: 160px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
`;
