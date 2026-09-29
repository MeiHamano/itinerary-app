import React from 'react';
import {
  Box,
  Chip,
  IconButton,
  Tooltip,
  Paper,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export const DateDividerRow = ({ item, dayIndex = 1, onChange, onDelete, canDelete = true }) => {
  const dateValue = item && item.date ? dayjs(item.date) : null;

  return (
    <Paper
      elevation={0}
      sx={{
        my: 2,
        p: 1.5,
        backgroundColor: '#e8f0fe',
        borderRadius: 2,
        border: '1px solid #cce0ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 1.5,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Chip
          icon={<CalendarMonthIcon fontSize="small" />}
          label={`${dayIndex}日目`}
          color="primary"
          sx={{ fontWeight: 'bold', fontSize: '0.9rem', px: 0.5 }}
        />

        <DatePicker
          value={dateValue}
          format="YYYY/MM/DD"
          onChange={(newValue) => {
            if (onChange && item && item.id) {
              const formatted = newValue && newValue.isValid() ? newValue.format('YYYY-MM-DD') : '';
              onChange(item.id, 'date', formatted);
            }
          }}
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: 1,
            width: 180,
          }}
          slotProps={{
            textField: {
              size: 'small',
            },
          }}
        />
      </Box>

      {canDelete && (
        <Tooltip title="この日付区切りを削除">
          <IconButton
            size="small"
            onClick={() => onDelete && item && item.id && onDelete(item.id)}
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'error.main' },
            }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Paper>
  );
};

export default DateDividerRow;