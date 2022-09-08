/**
 * Copyright 2020 The Magma Authors.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import 'chartjs-adapter-date-fns';
import React from 'react';
import {Bar, Line} from 'react-chartjs-2';
import {ChartData, ChartTooltipItem, TimeUnit} from 'chart.js';
import {
  add,
  differenceInDays,
  differenceInHours,
  isBefore,
  toDate,
} from 'date-fns';

export function getStepString(delta: number, unit: string) {
  return delta.toString() + unit[0];
}

export function getStep(start: Date, end: Date): [number, TimeUnit, string] {
  const durationInHours = differenceInHours(end, start);
  const durationInDays = differenceInDays(end, start);

  if (durationInDays > 7.5) {
    return [24, 'hour', 'DD-MM-YYYY'];
  } else if (durationInDays > 3.5) {
    return [12, 'hour', 'DD-MM-YY HH:mm'];
  } else if (durationInDays > 1.5) {
    return [6, 'hour', 'DD-MM-YY HH:mm'];
  } else if (durationInHours > 24.5) {
    return [3, 'hour', 'DD-MM-YY HH:mm'];
  } else if (durationInHours > 12.5) {
    return [2, 'hour', 'HH:mm'];
  } else if (durationInHours > 6.5) {
    return [1, 'hour', 'HH:mm'];
  } else if (durationInHours > 3.5) {
    return [15, 'minute', 'HH:mm'];
  } else {
    return [5, 'minute', 'HH:mm'];
  }
}

// for querying event and log count, the api doesn't have a step attribute
// hence we have to split the start and end window into several sets of
// [start, end] queries which can then be queried in parallel
export function getQueryRanges(
  start: Date,
  end: Date,
  delta: number,
  unit: TimeUnit,
): Array<[Date, Date]> {
  const queries: Array<[Date, Date]> = [];
  let intervalStart = toDate(start);
  while (isBefore(intervalStart, end)) {
    const intervalEnd = add(intervalStart, {[timeUnitToDuration(unit)]: delta});
    queries.push([intervalStart, intervalEnd]);
    intervalStart = intervalEnd;
  }
  return queries;
}

function timeUnitToDuration(unit: TimeUnit): keyof Duration {
  if (unit === 'millisecond' || unit === 'quarter') {
    throw new Error(`${unit} cannot be converted to Duration!`);
  } else {
    return `${unit}s`;
  }
}

export type DatasetType = {
  t: number;
  y: number;
};

export type Dataset = {
  label: string;
  borderWidth: number;
  backgroundColor: string;
  borderColor: string;
  hoverBorderColor: string;
  hoverBackgroundColor: string;
  data: Array<DatasetType>;
  fill?: boolean;
};

type Props = {
  start?: Date;
  end?: Date;
  delta?: number;
  dataset: Array<Dataset>;
  unit?: TimeUnit;
  yLabel?: string;
  tooltipHandler?: (tooltipItem: ChartTooltipItem, data: ChartData) => string;
};

function defaultTooltip(
  tooltipItem: ChartTooltipItem,
  data: ChartData,
  props: Props,
) {
  const dataSet = data.datasets![tooltipItem.datasetIndex!];
  return `${dataSet.label!}: ${tooltipItem.yLabel!} ${props.unit ?? ''}`;
}

export default function CustomHistogram(props: Props) {
  return (
    <>
      <Bar
        height={300}
        data={{datasets: props.dataset}}
        options={{
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                stacked: true,
                gridLines: {
                  display: false,
                },
                type: 'time',
                ticks: {
                  source: 'data',
                },
                time: {
                  unit: props?.unit,
                  round: 'second',
                  tooltipFormat: 'yyyy/MM/dd h:mm:ss a',
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Date',
                },
              },
            ],
            yAxes: [
              {
                stacked: true,
                gridLines: {
                  drawBorder: true,
                },
                ticks: {
                  maxTicksLimit: 3,
                },
                scaleLabel: {
                  display: true,
                  labelString: props?.yLabel ?? '',
                },
              },
            ],
          },
          tooltips: {
            enabled: true,
            mode: 'nearest',
            callbacks: {
              label: (tooltipItem: ChartTooltipItem, data: ChartData) => {
                return (
                  props.tooltipHandler?.(tooltipItem, data) ??
                  defaultTooltip(tooltipItem, data, props)
                );
              },
            },
          },
        }}
      />
    </>
  );
}

export function CustomLineChart(props: Props) {
  return (
    <>
      <Line
        height={300}
        data={{
          datasets: props.dataset,
        }}
        legend={{
          display: true,
          position: 'top',
          align: 'end',
          labels: {
            boxWidth: 12,
          },
        }}
        options={{
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
                ticks: {
                  maxTicksLimit: 10,
                },
                type: 'time',
                time: {
                  unit: props?.unit,
                  round: 'second',
                  tooltipFormat: 'yyyy/MM/dd h:mm:ss a',
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Date',
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  drawBorder: true,
                },
                ticks: {
                  maxTicksLimit: 5,
                },
                scaleLabel: {
                  display: true,
                  labelString: props?.yLabel ?? '',
                },
                position: 'left',
              },
            ],
          },
          tooltips: {
            enabled: true,
            mode: 'nearest',
            callbacks: {
              label: (tooltipItem: ChartTooltipItem, data: ChartData) => {
                return (
                  props.tooltipHandler?.(tooltipItem, data) ??
                  defaultTooltip(tooltipItem, data, props)
                );
              },
            },
          },
        }}
      />
    </>
  );
}
