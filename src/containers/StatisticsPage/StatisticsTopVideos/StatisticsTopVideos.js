import React, { memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { converSecondToTime } from '../../../utils/helpers';

const StatisticsTopVideosWrapper = styled(Grid)`
  margin-top: 2em !important;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 3px 0px #c2c1c1;
  font-size: 1.2em;
  margin-bottom: 25px;


  .topVideosTable {
    td,
    th {
      text-align: right;
      vertical-align: middle;
      position: relative;

      &.videoDetail {
        > .duration {
          position: absolute;
          right: 5.6em;
          bottom: 2.2em;
          background: #f9b03a;
          border: 1px solid #c78d36;
          padding: 4px 2px;
          margin: 0;
          width: auto;
          line-height: 1em;
          height: 1.5em;
          min-width: 32px;
          border-radius: 2px;
          text-align: center;
          opacity: 0.8;
        }

        > .title {
          display: inline-block;
          font-size: 1.2em;
          position: absolute;
          right: 125px;
          top: 30px;
        }
      }
    }
  }
`;

const Img = styled.img`
  width: 100px;
  height: 70px;
  display: inline-block;
  float: rigth;
  cursor: pointer;
`;

function StatisticsTopVideos({ statistics, onVideoClick }) {
  return (
    <StatisticsTopVideosWrapper container spacing={2} wrap="nowrap">
      <Table className="topVideosTable">
        <TableHead>
          <TableRow>
            <TableCell>ویدیوهای پر بازدید</TableCell>
            <TableCell>بازدید کل</TableCell>
            <TableCell>تعداد لایک</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {statistics.top_videos.map(item => (
            <TableRow key={item.slug}>
              <TableCell className="videoDetail">
                <Img
                  src={item.banner_link}
                  alt="بنر ویدیو"
                  onClick={() => onVideoClick(item.slug)}
                />
                <b className="duration">{converSecondToTime(item.duration)}</b>
                <h2 className="title">{item.title.substr(0, 50)}</h2>
              </TableCell>
              <TableCell>{item.views}</TableCell>
              <TableCell>{item.likeCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StatisticsTopVideosWrapper>
  );
}

StatisticsTopVideos.propTypes = {
  statistics: PropTypes.object.isRequired,
  onVideoClick: PropTypes.func.isRequired,
};

export default memo(StatisticsTopVideos);
