import React, { useMemo } from 'react';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
} from 'recharts';
import { CHART_COLORS } from 'config/constants/chartColors';

import Icon from 'components/shared/atoms/Icon';

import { StarAxisIcon, TooltipText, Score, ScoreContainer } from './styled';

const Number = ({ count, x, y }) => {
  return (
    <text id={count} x={x} y={y} fill="#A3A3A3" fontSize={13}>
      {count}
    </text>
  );
};

const CustomAxisTick = ({ x, y, payload }) => {
  let path;
  switch (payload.value) {
    case 5:
      path = <StarAxisIcon x={x - 38} y={y - 10} width={25} height={20} />;
      break;
    default:
      path = <Number x={x - 22} y={y + 4} count={payload.value} />;
  }
  return path;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <TooltipText>
        {label}:
        <ScoreContainer>
          {payload?.map(({ value: payloadValue }, i) =>
            payloadValue >= 0 ? (
              <Score key={i}>
                <Icon name="star" $size={16} $color="orange" $mr={6} $ml={6} />
                {payloadValue}
              </Score>
            ) : null,
          )}
        </ScoreContainer>
      </TooltipText>
    );
  }

  return null;
};

const ReviewsChart = ({ chart }) => {
  const chartData = useMemo(() => {
    const data = [];
    const config = [];
    if (chart?.length) {
      chart?.forEach((item, index) => {
        config[index] = {
          dataKey: `rating_${index}`,
          color: CHART_COLORS[index],
        };

        item.forEach((history, i) => {
          data[i] = {
            ...data[i],
            date: history?.date,
            [`rating_${index}`]: history?.rating ?? 0,
          };
        });
      });
    }

    return {
      data,
      config,
    };
  }, [chart]);

  return (
    <ResponsiveContainer data-testid="reviews-chart">
      <LineChart data={chartData?.data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="date" tick={{ fill: '#A3A3A3', fontSize: 13 }} />

        <YAxis
          tickCount={6}
          type="number"
          padding={{ top: 25 }}
          tick={CustomAxisTick}
          domain={[0, 5]}
        />

        <Tooltip content={<CustomTooltip />} />

        {chartData.config?.map(({ dataKey, color }, i) => (
          <Line
            key={i}
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            dot={{ stroke: color, strokeWidth: 5 }}
            activeDot={{ stroke: '#25B900', strokeWidth: 4, r: 4, fill: '#fff' }}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ReviewsChart;
