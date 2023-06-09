import styled from 'styled-components';

const ITEM_WIDTH = 220;
export const SlidableWrapper = styled.div`
  h2 {
    font-size: 1.5em;
    color: #484b62;
    font-weight: 500;
    margin-bottom: 0.7em;
  }

  .slideWrapper {
    overflow: hidden;
    overflow-x: auto;
    display: block;

    .slideWrapperItems {
      display: inline;
      width: ${props => props.itemsCount * ITEM_WIDTH}px;
    }
  }
`;

export const VideoItemWrapper = styled.div`
  width: ${ITEM_WIDTH}px;
  height: ${ITEM_WIDTH}px;
  display: inline-block;
  position: relative;
  padding: 3px;
  cursor: pointer;


  > img {
    width: 100%;
    height: ${ITEM_WIDTH - 100}px;
  }

  .videoContent{
    margin: 5px 5px;
  }

  .duration {
    position: absolute;
    left: 10px;
    top: ${ITEM_WIDTH - 125}px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 0 0.3em;
    letter-spacing: 0.5px;
    border-radius: 3px;
    border: 1px solid #888;
  }

  .title {
    color: #484b62;
    font-size: 0.8em;
    margin: 0;
  }

  .user {
    color: #6f7285;
    font-size: 0.8em;

  }

  .views {
    color: #6f7285;
    font-size: 0.7em;
    font-weight: 300;
    line-height: 1.5;
  }

  .title,
  .views,
  .user {
    padding: 0.3em 0;
    display: block;
  }
`;

export const UserLink = styled.b``;
