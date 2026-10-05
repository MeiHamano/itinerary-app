import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TimelineFooter from '../TimelineFooter';

const theme = createTheme();

export default {
  title: 'Itinerary/TimelineFooter',
  component: TimelineFooter,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  argTypes: {
    onAddDivider: { action: 'onAddDivider clicked' },
  },
};

// 1. デフォルト表示
export const Default = {
  args: {
    onAddDivider: () => alert('「＋ 次の日付（区切り）を追加」がクリックされました'),
  },
};