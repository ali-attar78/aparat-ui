import styled from "styled-components";
import defaultBanner from "../../../assets/images/channelBanner.jpeg";

export default styled.div`
  background-image: url(${(props) => (props.src ? props.src : defaultBanner)});
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
