import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Filters from '../../../components/Filters';
import ChannelInfoTab from '../ChannelInfoTab/ChannelInfoTab';
import PlayListTab from '../PlayListTab/PlayListTab';
import VideosTab from '../VideosTab/VideosTab';

const ChannelDataWrapper = styled.div`
  display: block;
  background-color: #FCFCFC;
  position: relative;
  top: 240px;
  max-width: 900px;
  margin: auto;

  .dataWrapper {
    margin-top: 2em;

    .hr {
      border-bottom: 1px solid #eee;
      margin-bottom: 5em;
    }

    >*{
      justify-content:flex-start;
    }
  }
`;

const TAB_VALUES = {
  all: 'خانه',
  allVideos: 'همه ویدیو ها',
  playlist: 'لیست پخش',
  about: 'درباره کانال',
};

function ChannelData({ data }) {
  const [tab, setTab] = useState('all');

  return (
    <ChannelDataWrapper container>
      <Filters values={TAB_VALUES} defaultValue={tab} onChange={setTab} />

      <div className="dataWrapper">
        {tab === 'about' && <ChannelInfoTab data={data} />}

        {(tab === 'all' || tab === 'playlist') && <PlayListTab data={data} />}

        {tab === 'all' && <div className="hr" />}

        {(tab === 'all' || tab === 'allVideos') && (
          <VideosTab
            data={data}
            title={tab === 'allVideos' ? null : 'ویدیو های کانال'}
          />
        )}
      </div>
    </ChannelDataWrapper>
  );
}

ChannelData.propTypes = {
  data: PropTypes.object.isRequired,
};

export default memo(ChannelData);
