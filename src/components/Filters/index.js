import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Button } from '@mui/material';

const FilterWrapper = styled(Grid)`
  margin-top: 1.5em;
  margin-bottom: 1.5em;

  .FiltterButton {
    color: #292a33;
    background-color: #d3d6e0;
    border-radius: 15px;
    padding: 0.7em 2em;
    margin: 0.2em;

    &.selected {
      color: #f5f5f9;
      background-color: #484b62;
    }
  }
`;

function Filters({ values, defaultValue, onChange }) {
  const [filter, setFilter] = useState(defaultValue);

  function changeFilter(value) {
    onChange(value);
    setFilter(value);
  }

  return (
    <FilterWrapper>
      {Object.entries(values).map(([key, label]) => (
        <Button
          key={key}
          className={`FiltterButton ${key === defaultValue ? 'selected' : ''}`}
          onClick={() => changeFilter(key)}
        >
          {label}
        </Button>
      ))}
    </FilterWrapper>
  );
}

Filters.propTypes = {
  values: PropTypes.object.isRequired,
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default memo(Filters);
