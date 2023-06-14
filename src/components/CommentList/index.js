import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Grid } from "@mui/material";

import CommentItem from "../CommentItem";
import NoItemInList from "../NoItemInList";
import Loading from "../Loading";
import GetCommentListService from "../../services/GetCommentListApi/GetCommentListApi";
import { COMMENT_STATE_PENDING } from "../../constans";

const CommentListWrapper = styled(Grid)`
  display: flex;
  align-content: space-around;
  justify-content: space-around;
  flex-wrap: wrap;
  position: relative;

  > .loadingLoader {
    position: absolute;
  }

  &.loading {
    opacity: 0.5;
    max-height: 450px;
    overflow: hidden;
  }
`;

function CommentList({
  filterValue,
  myComments,
  customNotFoundTitle,
  showVideoImage,
  onPostNewAnswer,
  onRemoveComment,
}) {
  const GetCommentListApi = GetCommentListService();
  const [newComment, setNewComment] = useState("");
  const [acceptComment, setAcceptComment] = useState("");
  const [removeComment, setRemoveComment] = useState("");

  const [commentList, setCommentList] = useState({});

  useEffect(() => {
    if (!myComments) {
      const fetchComments = async () => {
        let myResult = {};
        try {
          const response = await GetCommentListApi.GetCommentList("/comment");
          if (response.error) {
            console.log(response.error);
          } else {
            response.result.forEach((item) => {
              if (!item.parent_id) {
                myResult[item.id] = {
                  ...item,
                  children: [],
                };
              } else {
                myResult[item.parent_id].children.push(item);
              }
            });
            console.log(myResult);

            if (filterValue === "all") {
              setCommentList(myResult);
            } else {
              const filteredData = [];

              for (const item of Object.values(myResult)) {
                const copiedItem = { ...item };

                if (copiedItem.children && copiedItem.children.length) {
                  copiedItem.children = copiedItem.children.filter(
                    (subItem) => subItem.state === COMMENT_STATE_PENDING
                  );
                }

                if (
                  copiedItem.state === COMMENT_STATE_PENDING ||
                  (copiedItem.children && copiedItem.children.length)
                ) {
                  filteredData.push(copiedItem);
                }
              }

              setCommentList(filteredData);
            }
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchComments();
    }
  }, [newComment, filterValue, acceptComment]);

  const handleNewComment = (newComment) => {
    setNewComment(newComment);
  };

  const handleAcceptComments = (accepted) => {
    console.log(accepted);
    setAcceptComment(accepted);
  };

  const handleRemoveComments = (removed) => {
    setRemoveComment(removed);
  };

  return (
    <CommentListWrapper>
      {!!commentList &&
        Object.values(myComments ? myComments : commentList).map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onPostNewComment={myComments ? onPostNewAnswer : handleNewComment}
            onAcceptComment={handleAcceptComments}
            onRemoveComment={
              myComments ? onRemoveComment : handleRemoveComments
            }
            showVideoImage={showVideoImage}
          />
        ))}

      {!!!commentList && <NoItemInList title="هیچ موردی یافت نشد" />}
    </CommentListWrapper>
  );
}

CommentList.propTypes = {
  comments: PropTypes.object,
};

export default memo(CommentList);
