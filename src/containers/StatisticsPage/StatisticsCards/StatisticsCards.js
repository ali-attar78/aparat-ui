import React, { memo,useState,useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import PeopleOutline from '@mui/icons-material/PeopleOutline';
import MovieOutlined from '@mui/icons-material/MovieOutlined';
import ShowChartOutlined from '@mui/icons-material/ShowChartOutlined';
import CommentOutlined from '@mui/icons-material/CommentOutlined';
import getChannelStatisticsApi from "../../../services/getChannelStatisticsApi/getChannelStatisticsApi";



const StatisticsCardsWrapper = styled(Grid)`
  margin-top: 2em !important;

  .card {
    background: #fff;
    box-shadow: 0 1px 3px 0px #c2c1c1;
    text-align: center;
    padding: 1.5em !important;
    width: 100%;
    margin: 0 0.5em;
    position: relative;

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
        position: absolute;
        left: 0;
        top: 0.3em;
      }
    }
  }

  @media (max-width: 480px) {
    .card {
      .label {
        display: block;
        text-align: center;
      }
    }
  }
`;

function StatisticsCards({ }) {
  const [statistics, setStatistics] = useState({});
  const getChannelStatistics = getChannelStatisticsApi();



  async function fetchStatistics() {
    try {
      const response = await getChannelStatistics.getChannelStatistics(
        90,
        "/channel/statistics"
      );
      if (response.error) {
        console.log(response.error);
      } else {
        console.log(response.result);
        setStatistics(response.result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchStatistics();
  }, []);


  return (
    <StatisticsCardsWrapper container spacing={2} wrap="nowrap">
      <Grid className="card" item>
        <div className="value">{statistics.total_comments || 0}</div>
        <div className="label">
          <CommentOutlined className="icon" />
          تعداد کل نظرات
        </div>
      </Grid>

      <Grid className="card" item>
        <div className="value">{statistics.total_followers || 0}</div>
        <div className="label">
          <PeopleOutline className="icon" />
          تعداد کل دنبال کنندگان
        </div>{' '}
      </Grid>

      <Grid className="card" item>
        <div className="value">{statistics.total_videos || 0}</div>
        <div className="label">
          <MovieOutlined className="icon" />
          تعداد کل ویدیو ها
        </div>
      </Grid>

      <Grid className="card" item>
        <div className="value">{statistics.total_views || 0}</div>
        <div className="label">
          <ShowChartOutlined className="icon" />
          تعداد کل بازدید ها
        </div>
      </Grid>
    </StatisticsCardsWrapper>
  );
}

StatisticsCards.propTypes = {
  statistics: PropTypes.object.isRequired,
};

export default memo(StatisticsCards);
