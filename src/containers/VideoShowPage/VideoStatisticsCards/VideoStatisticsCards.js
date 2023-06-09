import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import PeopleOutline from '@mui/icons-material/PeopleOutline';
import MovieOutlined from '@mui/icons-material/MovieOutlined';
import ShowChartOutlined from '@mui/icons-material/ShowChartOutlined';


const VideoStatisticsCardsWrapper = styled(Grid)`
  margin-top: 2em !important;

  .card {
    background: #fff;
    box-shadow: 0 1px 3px 0px #c2c1c1;
    text-align: center;
    padding: .9em !important;
    width: 100%;
    margin: 0 0.5em;

    &:first-child {
      margin-right: 0;
    }

    &:last-child {
      margin-left: 0;
    }

    .value {
      font-weight: bold;
      font-size: 1.8em;
      color: #000;
      margin: 0.5em 0;
    }

    .label {
      margin: 0.5em 0;
      font-size: 1.1em;
      display: flex;
      justify-content: center;
      align-items: center;

      .icon {
        margin-left: 0.5em;
        font-size: 1.1em;
        margin-left: 0.5em;
        font-size: 1.8em;
      }
    }
  }

  @media (max-width: 480px) {
    .card {
      .label {
        display: block;
        text-align: center;

        .icon {
          display: block;
          margin: auto;
        }
      }
    }
  }
`;

function VideoStatisticsCards({ video, todayViews }) {
  return (
    <VideoStatisticsCardsWrapper container spacing={2} wrap="nowrap">
      <Grid className="card" item>
        <div className="value">{video.likeCount}</div>

        <div className="label">
          <PeopleOutline className="icon" />
          تعداد پسند ها
        </div>
      </Grid>

      <Grid className="card" item>
        <div className="value">{video.views}</div>
        <div className="label">
          <MovieOutlined className="icon" />
          بازدید های ویدیو
        </div>{' '}
      </Grid>

      <Grid className="card" item>
        <div className="value">{todayViews || 0}</div>
        <div className="label">
          <ShowChartOutlined className="icon" />
          بازدید های امروز
        </div>
      </Grid>
    </VideoStatisticsCardsWrapper>
  );
}

VideoStatisticsCards.propTypes = {
  video: PropTypes.object.isRequired,
  todayViews: PropTypes.number,
};

export default memo(VideoStatisticsCards);
