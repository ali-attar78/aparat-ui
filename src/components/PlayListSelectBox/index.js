import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SelectBox from "../SelectBox";
import createPlaylistApi from "../../services/GetPlaylistApi/getPlaylistApi";
import createAddPlaylist from "../../services/AddPlaylist/addPlaylist";
import AddCategoryIcon from "@mui/icons-material/Add";
import AddCategoryCancelIcon from "@mui/icons-material/Cancel";
import { ContentPasteSearchOutlined } from "@mui/icons-material";

function CategorySelectBox({ value, onChange, ...props }) {
  const PlaylistApi = createPlaylistApi();
  const AddPlaylist = createAddPlaylist();
  const [addNewItem, setAddNewItem] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [currentValue, setCurrentValue] = useState(
    value ? `00${value}` : value
  );

  const [items, setItems] = useState({
    0: "افزودن لیست پخش جدید",
    "00": "بدون لیست پخش",
  });

  async function listCategory() {
    const response = await PlaylistApi.getPlaylist("/playlist");
    //  console.log(response.result);
    response.result.forEach((item) => {
      if (item.user_id) {
        setItems((prevItems) => ({
          ...prevItems,
          [`00${item.id}`]: item.title,
        }));
      }
    });

    // setOptions(items);
  }

  function handleChange(val) {
    if (val === "0") {
      setAddNewItem(true);
    } else {
      if (val === "00") {
        onChange(null);
        setCurrentValue("");
      } else {
        onChange(val.replace(/^00/, ""));
      }
      setCurrentValue(val);
    }
  }

  async function handleAddNewItem() {
    const thisResponse = await AddPlaylist.addPlaylist(
      newItemTitle,
      "/playlist/create"
    );
    const item = thisResponse.result;
    if (item.user_id) {
      const newId = `00${parseInt(item.id) + 1}`;
      setItems((prevItems) => ({
        ...prevItems,
        [newId]: item.title,
      }));
      setCurrentValue(newId);
    }

    setAddNewItem(false);
    setNewItemTitle("");
  }

  useEffect(() => {
    listCategory();
  }, []);

  function handleAddNewItemCancel() {
    setAddNewItem(false);
    setNewItemTitle("");
  }

  return (
    <>
      {addNewItem ? (
        <TextField
          fullWidth
          variant="outlined"
          {...props}
          autoFocus
          label="عنوان دسته بندی جدید"
          value={newItemTitle}
          onChange={(e) => setNewItemTitle(e.target.value.trim())}
          onKeyDown={(e) => e.which === 13 && handleAddNewItem()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  color="primary"
                  edge="end"
                  disabled={newItemTitle.length < 3}
                  onClick={handleAddNewItem}
                >
                  <AddCategoryIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  edge="end"
                  onClick={handleAddNewItemCancel}
                >
                  <AddCategoryCancelIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <SelectBox
          fullWidth
          variant="outlined"
          {...props}
          options={items}
          value={currentValue || ""}
          onChange={handleChange}
        />
      )}
    </>
  );
}

CategorySelectBox.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
};

export default memo(CategorySelectBox);
