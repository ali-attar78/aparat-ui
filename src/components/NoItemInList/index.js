import React, { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Grid } from "@mui/material";

import BoxImage from "./box.png";

const NoItemInListWrapper = styled(Grid)`
  text-align: center;
  margin: 1.5em;
  margin-top: 2.5em;
  position: relative;

  img {
    width: 128px;
    height: 128px;
  }

  p {
    color: #444;
  }
`;

function NoItemInList({ title }) {
  return (
    <NoItemInListWrapper>
      {typeof title === "string" && (
        <>
          <img src={BoxImage} alt={title} />
        </>
      )}
      <p>{title}</p>
    </NoItemInListWrapper>
  );
}

NoItemInList.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default memo(NoItemInList);
