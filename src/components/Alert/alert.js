/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 *
 * Alert
 *
 */

import React, {useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledAlert = styled.div`
  border: 1px solid #f50057;
  border-radius: 2px;
  background: #fff;
  padding: 0.2rem;
  margin: 2px 0;
  position: relative;

  & p {
    padding: 0;
    margin: 0;
    font-weight: bold;
    color: #f50057;
  }

  & span {
    font-size: 1rem;
    color: #f50057;
    position: absolute;
    left: 5px;
    top: 2px;
    cursor: pointer;
  }

  & span:hover {
    transform: scale(1.2, 1.2);
  }
`;

function Alert({ show , message,onClose }) {

  const [showAlert, setShowAlert] = useState(show);


  console.log(show,showAlert);

  if (showAlert) {
    return (
      <StyledAlert>
        <p>{message}</p>
        <span
          onClick={() => {
            setShowAlert(false);
            onClose();
          }}
        >
          x
        </span>
      </StyledAlert>
    );
  }

  return null;
}

Alert.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string.isRequired,
};

export default Alert;
