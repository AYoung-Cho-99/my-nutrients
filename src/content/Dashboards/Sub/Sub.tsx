import { useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Tooltip,
  Divider,
  Grid,
  Box,
  Button,
  Menu,
  MenuItem,
  useTheme,
  styled
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import { Chart } from 'src/components/Chart';
import type { ApexOptions } from 'apexcharts';
import { useEventInfo } from "@/hooks/useFetchEvent";

const DotLegend = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`
);

function Sub() {
  const { t }: { t: any } = useTranslation();
  const actionRef1 = useRef<any>(null);
  const [openPeriod, setOpenMenuPeriod] = useState<boolean>(false);
  const theme = useTheme();
  const { data: foodData } = useEventInfo('D000008');

  const periods = [
    {
      value: 'today',
      text: t('Today')
    },
    {
      value: 'yesterday',
      text: t('Yesterday')
    },
    {
      value: 'last_month',
      text: t('Last month')
    },
    {
      value: 'last_year',
      text: t('Last year')
    }
  ];

  const [period, setPeriod] = useState<string>(periods[2].text);

  // const data = {
  //   daily: '$142.21',
  //   weekly: '$529.83',
  //   monthly: '$7,153.61'
  // };

  const expenses = {
    datasets: [
      {
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.success.main,
          theme.palette.warning.main,
          theme.palette.info.main,
          theme.palette.error.main
        ]
      }
    ],
    labels: [
      t('칼로리'),
      t('탄수화물'),
      t('단백질'),
      t('지방'),
      t('당'),
    ]
  };

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '55%'
        }
      }
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
      theme.palette.info.main,
      theme.palette.error.main
    ],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + 'kcal';
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5
      }
    },
    fill: {
      opacity: 1
    },
    labels: expenses.labels,
    legend: {
      labels: {
        colors: theme.colors.alpha.trueWhite[100]
      },
      show: false
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    }
  };


  const chartSeries = [parseInt(foodData?.I2790?.row[0]?.NUTR_CONT1), parseInt(foodData?.I2790?.row[0]?.NUTR_CONT2), parseInt(foodData?.I2790?.row[0]?.NUTR_CONT3), parseInt(foodData?.I2790?.row[0]?.NUTR_CONT4), parseInt(foodData?.I2790?.row[0]?.NUTR_CONT5)]

  console.log(foodData);
  

  return (
    
    <CardContent>
    {/* <Box
      sx={{
        px: { lg: 4 },
        pt: 2,
        pb: 4,
        height: '100%',
        flex: 1,
        textAlign: 'center'
      }}
    >
      <Grid spacing={3} container>
        <Grid item sm={4}>
          <Typography variant="caption" gutterBottom>
            {t('Daily')}
          </Typography>
          <Typography variant="h3">{data.daily}</Typography>
        </Grid>
        <Grid item sm={4}>
          <Typography variant="caption" gutterBottom>
            {t('Weekly')}
          </Typography>
          <Typography variant="h3">{data.weekly}</Typography>
        </Grid>
        <Grid item sm={4}>
          <Typography variant="caption" gutterBottom>
            {t('Monthly')}
          </Typography>
          <Typography variant="h3">{data.monthly}</Typography>
        </Grid>
      </Grid>
    </Box>
    <Divider
      sx={{
        mb: 3
      }}
    /> */}
    <Button
      size="small"
      variant="outlined"
      ref={actionRef1}
      onClick={() => setOpenMenuPeriod(true)}
      endIcon={<ExpandMoreTwoToneIcon fontSize="small" />}
    >
      {period}
    </Button>
    <Menu
      disableScrollLock
      anchorEl={actionRef1.current}
      onClose={() => setOpenMenuPeriod(false)}
      open={openPeriod}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
    >
      {periods.map((_period) => (
        <MenuItem
          key={_period.value}
          onClick={() => {
            setPeriod(_period.text);
            setOpenMenuPeriod(false);
          }}
        >
          {_period.text}
        </MenuItem>
      ))}
    </Menu>

    <Grid pt={3} container spacing={3}>
      <Grid
        md={6}
        item
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Chart
          height={218}
          options={chartOptions}
          series={chartSeries}
          type="donut"
        />
      </Grid>
      <Grid md={6} item display="flex" alignItems="center">
        <Box>
          {expenses.labels.map((label: string, i: number) => (
            <Typography
              key={label}
              variant="body2"
              sx={{
                py: 0.5,
                display: 'flex',
                alignItems: 'center',
                mr: 2
              }}
            >
              <DotLegend
                style={{
                  background: `${expenses.datasets[0].backgroundColor[i]}`
                }}
              />
              <span
                style={{
                  paddingRight: 6,
                  fontSize: `${theme.typography.pxToRem(11)}`,
                  color: `${expenses.datasets[0].backgroundColor[i]}`
                }}
              >
                {chartSeries[i]}kcal
              </span>
              {label}
            </Typography>
          ))}
        </Box>
      </Grid>
    </Grid>
  </CardContent>
  );
}

export default Sub;
