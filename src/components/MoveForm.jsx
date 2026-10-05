import React from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  Tooltip,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FlightIcon from '@mui/icons-material/Flight';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { MOVE_METHOD_OPTIONS } from '../types/itinerary';

//移動手段
const getMethodIcon = (method) => {
  switch (method) {
    case 'walk': return <DirectionsWalkIcon fontSize="small" sx={{ mr: 1 }} />;
    case 'train': return <DirectionsTransitIcon fontSize="small" sx={{ mr: 1 }} />;
    case 'bus': return <DirectionsBusIcon fontSize="small" sx={{ mr: 1 }} />;
    case 'car': return <DirectionsCarIcon fontSize="small" sx={{ mr: 1 }} />;
    case 'airplane': return <FlightIcon fontSize="small" sx={{ mr: 1 }} />;
    default: return <MoreHorizIcon fontSize="small" sx={{ mr: 1 }} />;
  }
};

export const MoveForm = ({ item, onChange }) => {
  const isOtherMethod = item.moveMethod === 'other';

  return (
    <Grid container spacing={1.5}>
      {/* 移動手段セレクトボックス */}
      <Grid item xs={12} sm={isOtherMethod ? 6 : 12}>
        <FormControl fullWidth size="small">
          <InputLabel id={`move-method-label-${item.id}`}>移動手段</InputLabel>
          <Select
            labelId={`move-method-label-${item.id}`}
            value={item.moveMethod || 'train'}
            label="移動手段"
            onChange={(e) => onChange(item.id, 'moveMethod', e.target.value)}
          >
            {MOVE_METHOD_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value} sx={{ display: 'flex', alignItems: 'center' }}>
                {getMethodIcon(opt.value)}
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* ※「その他」選択時のみ出現する自由記述テキストエディター */}
      {isOtherMethod && (
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="移動手段の内容"
            placeholder="例: フェリー、ロープウェイ"
            value={item.moveMethodCustom || ''}
            onChange={(e) => onChange(item.id, 'moveMethodCustom', e.target.value)}
          />
        </Grid>
      )}

      {/* 参考/予約URL入力 */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          size="small"
          label="参考 / 予約URL"
          placeholder="https://..."
          value={item.url || ''}
          onChange={(e) => onChange(item.id, 'url', e.target.value)}
          InputProps={{
            endAdornment: item.url ? (
              <InputAdornment position="end">
                <Tooltip title="リンクを別タブで開く">
                  <IconButton
                    size="small"
                    component="a"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <OpenInNewIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ) : null,
          }}
        />
      </Grid>

      {/* メモ入力 */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          size="small"
          multiline
          rows={2}
          label="メモ"
          placeholder="座席番号、乗り換え情報、運賃など"
          value={item.notes || ''}
          onChange={(e) => onChange(item.id, 'notes', e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(MoveForm);