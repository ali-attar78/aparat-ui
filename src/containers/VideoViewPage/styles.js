import { Dialog } from "@mui/material";
import styled from "styled-components";

export const VideoViewContentWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;

  .sidebar {
    width: 550px;
    padding-right: 1em;
  }

  .content {
    width: 100%;
  }

  @media (max-width: 768px) {
    .sidebar {
      display: none;
    }
  }
`;

export const VideoInfoWrapper = styled.div`
  .title {
    font-size: 1.5em;
    color: #222;
  }

  .Row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .views {
    color: #222;
    font-size: 1.1em;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;

    .icon {
      margin-right: 0.5em;
      margin-top: -4px;
    }
  }

  .extraInfo {
    border-top: 1px solid #e5e5e5;
    margin-top: 1em;
    padding: 1em 0;
    font-size: 1em;

    .videoDescribtion {
      color: #444;
    }

    .videoTimeAndTags {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 0.9em;
    }
  }
`;

export const LinkButton = styled.span`
  font-size: 0.8em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 1.5em;
  cursor: pointer;

  &.tag {
    margin-left: 0.8em;
  }

  :hover,
  :focus {
    color: #000;
  }
`;

export const ChannelInfoWrapper = styled.div`
  font-size: 1.2em;
  color: #444;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  h4 {
    font-size: 0.7em;
    margin: 0;
    padding: 0 0 0 0 0;
  }

  span {
    font-size: 0.7em;
  }

  img {
    width: 45px;
    height: 45px;
    border-radius: 100%;
    margin-left: 0.4em;
    border: 1px solid #aaa;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  height: 30px;

  .MuiButtonBase-root {
    border-radius: 50px;
    display: flex;
    justify-content: space-between;
    width: auto;
    min-width: auto;
    margin: 0 0.5em;

    &:hover,
    &:focus {
      background: #f2f2f2 !important;
    }

    .MuiSvgIcon-root {
      font-size: 1.8em;
      margin: 0 0.2em;
      color: #666;
    }
  }

  a {
    text-decoration: none;
    color: #666;
    text-align: center !important;
    justify-content: center !important;
    font-size: 0.9em !important;
    span {
      padding-left: 0.2em;
    }
  }
  .desc {
    font-size: 1em;
    color: #666 !important;
    padding-top: 0.15em;
  }

  .btn-follow {
    font-size: 0.8em;
    padding: 0 1em;

    :not(:disabled) {
      background: #df0f50;
      color: #fff;

      :hover {
        opacity: 0.8;
        background: #df0f50 !important;

        &,
        .MuiSvgIcon-root {
          color: #fff;
        }
      }
    }

    &.followed {
      background: #dedede;
      &,
      .MuiSvgIcon-root {
        color: #444;
      }
    }

    .MuiSvgIcon-root {
      color: #fff;
      font-size: 1.5em;
    }
  }
`;

export const ShareModalWrapper = styled(Dialog)`
  .MuiTypography-root {
    color: #484b62;
    border-bottom: 1px solid #f5f5f9;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .MuiSvgIcon-root {
    &:hover {
      color: #df0f50;
      cursor: pointer;
    }
  }

  .links {
    display: flex;
    margin-bottom: 1.5em;

    a {
      display: inline-block;
      margin: 0 0.4em;
      width: 50px;
      text-align: center;
      color: #666;
      text-decoration: none;

      img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        overflow: hidden;
      }
    }
  }

  .copyUrlBox {
    border: 1px solid #999;
    background: rgba(41, 42, 51, 0.1);
    padding: 0.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;

    span {
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif, arial !important;
      font-weight: bold;
    }

    .copyIcon {
      background: #6f7285;
      color: #f5f5f9;
      border-radius: 100%;
      width: 30px;
      height: 30px;
      padding: 0.3em;
      margin-left: 1.5em;
    }
  }
`;

export const VideoCommentsWrapper = styled.div`
  .CountingTextArea {
    textarea {
      height: 1.3em !important;
      transition: all ease 500ms;

      :focus {
        height: 6em !important;
      }
    }
  }
`;

export const RelatedVideosWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;

  .duration {
    position: absolute;
    right: 0.5em;
    bottom: 0.3em;
    background: rgba(255, 103, 32, 0.8);
    padding: 0.2em;
    color: #fff;
    border-radius: 5px;
  }
`;

export const VideoItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  position: relative;

  :not(:nth-child(1)) {
    margin-top: 1em;
  }

  :hover {
    img {
      box-shadow: 0 0 3px 1px #888;
    }
  }

  img {
    width: 50%;
    margin-left: 0.5em;
    transition: box-shadow ease 500ms;
  }

  .videoDetail {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title {
      color: #444;
      margin: 0;
      padding: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .playlist {
      color: #777;
    }

    .viewsAndAge {
      display: flex;
      font-size: 0.9em;
    }
  }
`;

export const VideoPlayListWrapper = styled.div`
  background: #f5f5f9;
  margin-bottom: 1.5em;

  .NoItemInList {
    margin: 0;

    .reloadPlaylist {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      width: 100%;
    }
  }

  .playlistBox {
    .header {
      border-bottom: 1px solid #fbfbfc;
      background-color: #e6e7ef;
      padding: 1.2em 0.8em;
      color: #444;
      font-weight: 500;

      i {
        float: left;
        font-size: 0.9em;
        color: #de5108;
      }
    }

    .list {
      max-height: 250px;
      overflow-y: auto;

      .VideoItem {
        padding: 0.5em 0;
        margin-bottom: 0.5em;

        &.selected {
          background: #e1e1e1;
        }

        img {
          width: 80px;
        }

        .title {
          font-size: 1em;
        }

        .duration {
          position: absolute;
          right: 4.8em;
          bottom: 0.8em;
          font-size: 0.7em;
          background: rgba(255, 103, 32, 0.8);
          padding: 0.2em;
          color: #fff;
          border-radius: 5px;
        }

        .playIcon {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-10px);
          font-size: 20px;
        }
      }
    }
  }
`;
