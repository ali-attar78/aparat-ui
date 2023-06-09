import React, { memo, useState ,useEffect  } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import createGetTagListApi from "../../services/GetTagListApi/getTagListApi";
import createAddTag from "../../services/AddTag/addTag";

import AddNewTagIcon from '@mui/icons-material/Add';

import {
  Button,
  Input,
  MenuItem,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Chip,
  Checkbox,
  ListItemText,
} from '@mui/material';

const Wrapper = styled.div`
  & .formControl {
    width: 100%;
  }

  
 .MuiInputBase-formControl .css-1ar2bnf-MuiSelect-select-MuiInputBase-input-MuiInput-input {
  border: 1px solid #ccc;
}

  label + .css-14ftp9k-MuiInputBase-root-MuiInput-root {
    margin-top: 0px;
  }

  .css-1ar2bnf-MuiSelect-select-MuiInputBase-input-MuiInput-input.MuiSelect-select{

    height: auto;
    min-height: 36px;
    padding-top: 10px;

  }

  & label + .MuiInput-formControl {
    margin-top: 0;
  }

  & .MuiInput-underline:after,
  & .MuiInput-underline:before {
    display: none;
  }

  & .MuiSelect-selectMenu {
    border: 1px solid #c4c4c4;
    border-radius: 4px;
    background: #fff;
    padding: 12px;
  }

  & .chips {
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
  }

  & .chip {
    width: auto;
    background: #df1051;
    margin: 2px;

    & .MuiChip-deleteIcon {
      margin: 0;
      margin-left: 5px;
      color: #fff;
    }
  }

  & .chip-empty {
    width: auto;
    font-weight: bold;
    padding: 6px;
    display: inline-block;
  }
`;


const StyledAddTagButton = styled(Button)`
  margin: 0 !important;
  margin-top: -10px !important;
  margin-left: -8px !important;
  min-width: 30px !important;
  background: #fff !important;
  overflow: hidden !important;
  border: 1px solid #949494 !important;
`;


export async function fetchTags() {
  const response = await getTagListApi.GetTags("/tag");
  return response;
}




const getTagListApi = createGetTagListApi();
const addTag = createAddTag();



function SelectBox({ value, label, max, onChange ,...props}) {
  const [selectedItems, setSelectedItems] = useState(value || []); // set default value to empty array
  const [options, setOptions] = useState([]);
  const [searchText, setSearchText] = useState('');



  useEffect(() => {
    fetchTags()
      .then((response) => {
        const tags = response.result;
        setOptions(tags);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  async function createTag() {
    const response = await addTag.addTag(searchText,"/tag/create");
    console.log(response);
    
    // Update options with the new tag
    const newTag = response.result;
    setOptions(prevOptions => [...prevOptions, newTag]);
  
    // Select the new tag
    setSelectedItems(prevSelectedItems => [...prevSelectedItems, newTag.id]);
  
    // Clear the input field
    setSearchText('');
  }

  function handleChange(e) {
    const val = e.target.value.filter(item => item !== undefined);
    if (val) {
      setSelectedItems(val);
      onChange(val);
    }
  }

  function handleDeleteItem(event, val) {
    event.stopPropagation();
    const newItems = selectedItems.filter(item => item !== val);
    setSelectedItems(newItems);
    onChange(newItems);
  }

  const getOptionLabel = (option) => {
    if (!option) {
      return "";
    }
    if (typeof option === "number" && (options && Array.isArray(options))) {
      const item = options.find(item => item.id === option);
      return item ? item.title : "";
    }
    return "";
  };



  function renderItems() {
    const filtered = options.filter(
      item => item.title.lastIndexOf(searchText) >= 0,
    );

    return [
      <MenuItem key="searchTag">
        <Input
          className="searchTag"
          fullWidth
          value={searchText}
          endAdornment={
            filtered.length ? null : (
              <InputAdornment position="end">
                <StyledAddTagButton onClick={createTag}>
                  <AddNewTagIcon />
                </StyledAddTagButton>
              </InputAdornment>
            )
          }
          onChange={e => setSearchText(e.target.value.trim())}
        />
      </MenuItem>,
      filtered.map(item => (
        <MenuItem key={item.id} value={item.id}>
          <Checkbox checked={selectedItems.indexOf(item.id) > -1} />
          <ListItemText primary={`#${item.title}`} />
        </MenuItem>
      )),
    ];
  }


  return (
    <Wrapper>
      <FormControl className="formControl">
        {label && (
          <InputLabel htmlFor="select-multiple-chip">{label}</InputLabel>
        )}
        <Select
          multiple
          displayEmpty
          {...props}
          value={selectedItems}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className="chips">
              {!selected.length ? (
                <span className="chip-empty">
                  یک یا چند مورد را انتخاب کنید
                </span>
              ) : (
                selected.map(val => (
                  <Chip
                    key={val}
                    className="chip"
                    label={getOptionLabel(val)}
                    onMouseDown={(e) => handleDeleteItem(e, val)}
                    onDelete={(event) => {}}
                  />
                ))
              )}
            </div>
          )}
          onChange={handleChange}
        >
           {selectedItems.length >= max ? (
            <MenuItem>شما تنها قادر به انتخاب {max} مورد هستید</MenuItem>
          ) : (
            renderItems()
          )}
        </Select>
      </FormControl>
    </Wrapper>
  );
}

SelectBox.propTypes = {
  options: PropTypes.array,
  value: PropTypes.array,
  max: PropTypes.number,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

SelectBox.defaultProps = {
  max: 5,
  options: [],
};

export default memo(SelectBox);
