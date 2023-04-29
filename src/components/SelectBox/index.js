import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TextField, MenuItem } from '@mui/material';

const Wrapper = styled.div`
  & .formControl {
    width: 100%;
  }
`;

function SelectBox({ options, onChange, ...props }) {
  return (
    <Wrapper>
      <TextField
        select
        {...props}
        onChange={(e, value) =>
          onChange(value.props.value, value.props.children)
        }
      >
        {Object.keys(options).map(key => (
          <MenuItem key={key} value={key}>
            {options[key]}
          </MenuItem>
        ))}
      </TextField>
    </Wrapper>
  );
}

SelectBox.propTypes = {
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default memo(SelectBox);
