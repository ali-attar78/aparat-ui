import React, { memo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Grid, FormControl, Select, MenuItem } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line as LineChart } from "react-chartjs-2";
const VideoStatisticsChartWrapper = styled(Grid)`
  margin-top: 2em !important;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 3px 0px #c2c1c1;

  .rangeSelectBox {
    width: 110px;
    margin-right:7px
  }

  canvas {
    max-width: 100%;
  }
`;

function VideoStatisticsChart({
  statistics,
  range,
  disabled,
  handleRangeChange,
}) {

  console.log(typeof statistics);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const sortedKeys = Object.keys(statistics).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  const data = {
    labels: sortedKeys.map(
      (d) => new Date(d).toLocaleString("fa-IR").split(",")[0]
    ),
    datasets: [
      {
        data: sortedKeys.map((key) => statistics[key]),
        label: "بازدید های انجام شده از این ویدیو",
        fill: false,
        borderColor: "#05a3e8",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: Math.max(...Object.values(statistics)) + 1,
          stepSize: 1,
        },
      },
      y: {
        ticks: {
          max: Math.max(...Object.values(statistics)) + 1,
          stepSize: 1,
        },
      },
    },
  };

  return (
    <VideoStatisticsChartWrapper container spacing={2} wrap="wrap">
      <Grid item xs={12}>
        <FormControl>
          <Select
            className="rangeSelectBox"
            value={range}
            disabled={disabled}
            onChange={(e) => handleRangeChange(e.target.value)}
          >
            <MenuItem value={7}>هفته اخیر</MenuItem>
            <MenuItem value={30}>ماه اخیر</MenuItem>
            <MenuItem value={90}>سه ماه اخیر</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <LineChart data={data} options={options} />
      </Grid>
    </VideoStatisticsChartWrapper>
  );
}

VideoStatisticsChart.propTypes = {
  statistics: PropTypes.object.isRequired,
  range: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  handleRangeChange: PropTypes.func.isRequired,
};

export default memo(VideoStatisticsChart);
