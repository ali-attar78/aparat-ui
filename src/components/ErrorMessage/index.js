/**
 *
 * ErrorMessage
 *
 */

import React, { memo } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const ErrorMessageWrapper = styled.div`
  border: 2px solid #e59090;
  background: #faa;
  padding: 1em;
  margin: 1em;

  .closeButton {
    position: initial;
    cursor: pointer;
    margin-right: 20px;
    color: #961010;
    left: 5.7em;
  }
`;

const STATUSES = {
  404: "آیتم مورد نظر یافت نشد",
};

function renderError(error, options, forceMessage) {
  if (forceMessage) {
    return forceMessage;
  }

  if (error.response) {
    if (options[error.response.status]) {
      return options[error.response.status];
    }

    if (STATUSES[error.response.status]) {
      return STATUSES[error.response.status];
    }
  }

  return "خطایی به وجود آمده است";
}

function ErrorMessage({ error, options, forceMessage, style }) {
  const [show, setShow] = useState(true);

  return show ? (
    <ErrorMessageWrapper>
      <div className="errorMessage">
        <div style={style ? style : null}>
          {renderError(error, options, forceMessage)}
          <CloseIcon
            CloseIcon
            className="closeButton"
            onClick={() => setShow(false)}
          />
        </div>
      </div>
    </ErrorMessageWrapper>
  ) : null;
}

ErrorMessage.propTypes = {
  options: PropTypes.object,
  error: PropTypes.object.isRequired,
};

ErrorMessage.defaultProps = {
  options: {},
};

export default memo(ErrorMessage);
