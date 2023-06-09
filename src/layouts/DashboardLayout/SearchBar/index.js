/**
 *
 * SearchBar
 *
 */

import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconButton } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { ROUTE_HOME } from '../../../routes';



const StyledWrapper = styled.div`
  border-radius: 35px;
  background: #f6f6f6;
  color: #6f7285;
  min-width: 150px;
  padding: 2px;
  position: relative;
  transition: all 500ms ease;
  max-width: 600px;
  margin: auto;
  margin-top: 5px;


  &:hover,
  &.active {
    box-shadow: 0 0 2px 1px #e4e0e0;
    background: #fff;
  }

  & > input {
    border: none;
    outline: none;
    width: 100%;
    padding: 0px 7px 0px 48px;
    background: transparent;
    color: inherit;
  }

  & .clearIcon {
    position: absolute;
    left: 36px;
    top: 9px;
    font-size: 15px;
    cursor: pointer;
    color: #8e3e6d !important;
  }

  & .serchIcon{

    margin-top:-2px

  }

  & button {
    position: absolute;
    left: 2px;
    top: 2px;
  }

  & button:hover .MuiSvgIcon-root,
  & .clearIcon:hover {
    color: #05a3e8 !important;
  }

  @media (max-width: 600px) {
    &{
      margin-top: -4px;
    }
  }
`;

function SearchBar() {
  const [active, setActive] = useState(false);
  const [searchText, setsearchText] = useState('');
  const navigate=useNavigate();


  function handleSearch() {
    navigate(`${ROUTE_HOME}?search=${searchText.trim()}`);
  }

  return (
    <StyledWrapper className={active ? 'active' : ''}>
      <input
        type="text"
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        onChange={e => setsearchText(e.target.value.trim())}
        value={searchText}
        maxLength={70}
        placeholder="جستجوی ویدیو ها و کانال ها..."
        onKeyDown={e => {
          if (e.keyCode === 13) handleSearch();
        }}
      />

      {searchText && (
        <ClearIcon className="clearIcon" onClick={() => setsearchText('')} />
      )}

      <IconButton size="small" onClick={handleSearch}>
        <SearchIcon className='serchIcon'/>
      </IconButton>
    </StyledWrapper>
  );
}

SearchBar.propTypes = {};

export default memo(SearchBar);
