/**
 *
 * CountingTextArea
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';

const CountingTextAreaWrapper = styled.div`
  text-align: left;
  margin: 0.5em;

  > .btn {
    border-radius: 15px;
    padding: 0.3em 0;
    margin: 0 0.2em;

    &.btn-ok:not(:disabled) {
      background: #05a3e8;
      color: #fff;

      :hover {
        opacity: 0.8;
      }
    }
  }

  > .textCounter {
    float: right;
    color: #444;
    font-size: 0.8em;
    padding-rigth: 0.8em;
  }
`;

function CountingTextArea({ defaultValue, maxLength, onChange,  placeholder,  cancelable }) {
  const [value, setValue] = useState(defaultValue);

  const remainLength = maxLength - value.length;

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleOnOk() {
    onChange(value);
  }

  function handleOnCancel() {
    onChange(null);
  }

  return (
    <CountingTextAreaWrapper className="CountingTextArea">
      <TextField
        fullWidth
        multiline
        rows="1"
        margin="normal"
        placeholder={placeholder}
        variant="outlined"
        value={value}
        onChange={handleChange}
      />

      <span className="textCounter">
        {remainLength > -1
          ? `کاراکتر باقیمانده ${remainLength}`
          : 'طول ورودی قابل قبول نیست'}
      </span>

      <Button
        disabled={!value.length || value.length > maxLength}
        className="btn btn-ok"
        onClick={handleOnOk}
      >
        تایید
      </Button>
      {cancelable && (
        <Button className="btn" onClick={handleOnCancel}>
          انصراف
        </Button>
      )}
    </CountingTextAreaWrapper>
  );
}

CountingTextArea.propTypes = {
  defaultValue: PropTypes.string,
  maxLength: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

CountingTextArea.defaultProps = {
  defaultValue: '',
};

export default memo(CountingTextArea);
