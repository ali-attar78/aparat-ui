import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid, Tabs, Tab, TextField } from "@mui/material";

import SelectBox from '../../../components/SelectBox';
import TagSelectBox from '../../../components/TagSelectBox';
import Dump from '../../../components/Dump/dump';

const Wrapper = styled.div`
  flex-grow: 1;

  & .tabs {
    border-bottom: 1px solid #ddd;

    & .MuiTabs-indicator {
      background-color: #666;
      height: 1px;
    }
  }

  & .tabContent {
    padding: 1rem;
  }

  & .inputWrapper {
    margin-bottom: 1rem;

    & label {
      font-weight: bold;
      padding-bottom: 0.8rem;
      display: inline-block;
    }

    & .input {
      background: #fff;
    }
  }
`;

function FileUploadInfo() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [data, setData] = useState({
    title: 'عنوان ویدیو',
    category: 1,
    info: 'این توضیحان هستش',
    tags: [],
  });

  function changeData(key, value) {
    setData({ ...data, [key]: value });
  }

  return (
    <Wrapper>
      <Tabs
        value={selectedTab}
        onChange={(e, tabIndex) => {
          setSelectedTab(tabIndex);
        }}
        indicatorColor="primary"
        textColor="primary"
        className="tabs"
      >
        <Tab label="مشخصات ویدیو" />
        <Tab label="تنظیمات پیشترفته" />
      </Tabs>

      <Grid container>
        {selectedTab === 0 && (
          <Grid container spacing={2} className="tabContent">
            <Grid item xs={12} sm={6} className="inputWrapper">
              <TextField
                fullWidth
                id="inp-title"
                className="input"
                variant="outlined"
                label="عنوان ویدیو"
                defaultValue={data.title}
                onChange={e => changeData('title', e.target.value.trim())}
              />
            </Grid>

            <Grid item xs={12} sm={6} className="inputWrapper">
              <SelectBox
                fullWidth
                id="inp-category"
                variant="outlined"
                className="input"
                options={{ '1': 'one', '2': 'tow' }}
                label="دسته بندی آپارات"
                value={data.category}
                onChange={value => changeData('category', value)}
              />
            </Grid>

            <Grid item xs={12} className="inputWrapper">
              <TextField
                fullWidth
                id="inp-info"
                multiline
                rows={3}
                className="input"
                variant="outlined"
                label="توضیحات اضافه"
                defaultValue={data.info}
                onChange={e => changeData('info', e.target.value.trim())}
              />
            </Grid>

            <Grid item xs={12} sm={6} className="inputWrapper">
              <TagSelectBox
                fullWidth
                id="inp-category"
                variant="outlined"
                className="input"
                label="برچسپ ها"
                max={10}
                value={data.tags}
                onChange={value => changeData('tags', value)}
              />
            </Grid>
          </Grid>
        )}
        {selectedTab === 1 && (
          <Grid item className="tabContent">
            dovomi
          </Grid>
        )}
      </Grid>

      {/* <Dump data={data} /> */}
    </Wrapper>
  );
}

export default FileUploadInfo;
