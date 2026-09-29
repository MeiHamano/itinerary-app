import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import DateDividerRow from '../DateDividerRow';

const theme = createTheme();

// 最小限の初期データ
const sampleDivider = {
  id: 'divider-1',
  type: 'divider',
  date: '2026-10-01',
};

export default {
  title: 'Itinerary/DateDividerRow',
  component: DateDividerRow,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div style={{ padding: '20px', maxWidth: '700px' }}>
            <Story />
          </div>
        </LocalizationProvider>
      </ThemeProvider>
    ),
  ],
};

// 1. 通常表示
export const Default = {
  render: () => {
    return (
      <DateDividerRow
        item={sampleDivider}
        dayIndex={1}
        onChange={() => {}}
        onDelete={() => {}}
        canDelete={true}
      />
    );
  },
};

// 2. カレンダーを操作できるインタラクティブ版
export const Interactive = () => {
  const [item, setItem] = useState(sampleDivider);

  return (
    <DateDividerRow
      item={item}
      dayIndex={1}
      onChange={(id, field, value) => {
        setItem((prev) => ({ ...prev, [field]: value }));
      }}
      onDelete={() => alert('削除ボタンがクリックされました')}
      canDelete={true}
    />
  );
};