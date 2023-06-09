import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid } from '@mui/material';

const ChannelInfoTabWrapper = styled(Grid)`
  justify-content: flex-start;

  .title,
  .infoItem {
    padding: 1em 0;
  }

  .title {
    font-weigth: bold;
    font-size: 1.3em;
    color: #000;
  }

  .infoItem {
    color: #444;
  }
`;

function ChannelInfoTab({ data }) {
  return (
    <ChannelInfoTabWrapper container>
      <Grid item>
        <div className="title">اطلاعات کانال</div>
        <div className="infoItem">
          این کانال به درخواست {data.user.name} ایجاد شده است.
        </div>
        <div className="infoItem">
          تاریخ شروع فعالیت:{' '}
          {
            new Date(data.channel.created_at)
              .toLocaleString('fa-IR')
              .split('،')[0]
          }
        </div>
        <div className="infoItem">
          تعداد ویدیوها: {data.channel.videos_count}
        </div>
        <div className="infoItem">
          تعداد بازدید کل: {data.channel.views_count}
        </div>
      </Grid>
    </ChannelInfoTabWrapper>
  );
}

ChannelInfoTab.propTypes = {
  data: PropTypes.object.isRequired,
};

export default memo(ChannelInfoTab);
