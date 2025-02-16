import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DateTimeRangePicker } from '@mui/x-date-pickers-pro/DateTimeRangePicker';

const ProSpan = styled('span')({
  display: 'inline-block',
  height: '1em',
  width: '1em',
  verticalAlign: 'middle',
  marginLeft: '0.3em',
  marginBottom: '0.08em',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundImage: 'url(https://mui.com/static/x/pro.svg)',
});

function Label({
  componentName,
  valueType,
  isProOnly,
}: {
  componentName: string;
  valueType: string;
  isProOnly?: boolean;
}) {
  const content = (
    <span>
      <strong>{componentName}</strong> for {valueType} editing
    </span>
  );

  if (isProOnly) {
    return (
      <Stack direction="row" spacing={0.5} component="span">
        <Tooltip title="Included on Pro package">
          <a
            href="https://mui.com/x/introduction/licensing/#pro-plan"
            aria-label="Included on Pro package"
          >
            <ProSpan />
          </a>
        </Tooltip>
        {content}
      </Stack>
    );
  }

  return content;
}

const DateTime=()=> {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'DatePicker',
          'TimePicker',
          'DateTimePicker',
          'DateRangePicker',
          'DateTimeRangePicker',
        ]}
      >
        <DemoItem label={<Label componentName="DatePicker" valueType="date" />}>
          <DatePicker />
        </DemoItem>
        <DemoItem label={<Label componentName="TimePicker" valueType="time" />}>
          <TimePicker />
        </DemoItem>
        <DemoItem
          label={<Label componentName="DateTimePicker" valueType="date time" />}
        >
          <DateTimePicker />
        </DemoItem>
        <DemoItem
          label={
            <Label
              componentName="DateRangePicker"
              valueType="date range"
              isProOnly
            />
          }
          component="DateRangePicker"
        >
          <DateRangePicker
            localeText={{
              start: '',
              end: '',
            }}
          />
        </DemoItem>
        <DemoItem
          label={
            <Label
              componentName="DateTimeRangePicker"
              valueType="date time range"
              isProOnly
            />
          }
          component="DateTimeRangePicker"
        >
          <DateTimeRangePicker
            localeText={{
              start: '',
              end: '',
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}


export default DateTime;