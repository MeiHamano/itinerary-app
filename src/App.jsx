import React, { useState, useCallback } from 'react';
import { Container, Typography, Box, Stack, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import DateDividerRow from './components/DateDividerRow';
import ItineraryItemRow from './components/ItineraryItemRow';
import TimelineFooter from './components/TimelineFooter';
import { createEmptyDateDivider, createEmptyItineraryItem } from './types/itinerary';

export default function App() {
  // タイムライン全体のState: 初期表示は「1日目の区切り」＋「空の予定カード1件」
  const [timelineList, setTimelineList] = useState([
    createEmptyDateDivider(),
    createEmptyItineraryItem(),
  ]);

  //予定アイテムまたは日付区切りのフィールド値を更新する
  const handleItemChange = useCallback((id, field, value) => {
    setTimelineList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  }, []);

  //指定したIDのアイテム（予定または日付区切り）を配列から除外する
  const handleDelete = useCallback((id) => {
    setTimelineList((prev) => prev.filter((item) => item.id !== id));
  }, []);

  //特定の日付区切りブロックの直下に新しい予定を挿入する
  const handleAddItemUnderDivider = useCallback((dividerId) => {
    setTimelineList((prev) => {
      // 対象の日付区切りのインデックスを検索
      const index = prev.findIndex((item) => item.id === dividerId);
      // 見つからない場合は末尾に追加
      if (index === -1) return [...prev, createEmptyItineraryItem()];
      const nextList = [...prev];
      nextList.splice(index + 1, 0, createEmptyItineraryItem());
      return nextList;
    });
  }, []);

  //画面下部フッターから、新しい日程（2日目、3日目...）を末尾に追加する
  const handleAddDivider = useCallback(() => {
    setTimelineList((prev) => [
      ...prev,
      createEmptyDateDivider(),
      createEmptyItineraryItem(),
    ]);
  }, []);
  // タイムライン描画時に「何日目か」を動的にカウントする
  let dayCounter = 0;

return (
    // MUI DatePicker を正常に動作させるためのアダプター設定
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* ブラウザデフォルトの余白・背景リセット */}
      <CssBaseline />

      {/* アプリ全体の最大幅・余白・背景色を制御するメインコンテナ */}
      <Container maxWidth="md" sx={{ py: 4, minHeight: '100vh', backgroundColor: '#ffffff' }}>
        
        {/* アプリヘッダーエリア --- */}
        <Box sx={{ mb: 4, pb: 2, borderBottom: '1px solid #e0e0e0' }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
            タイムスケジュール
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            複数日の旅行計画をタイムラインで整理・作成できます
          </Typography>
        </Box>

        {/* タイムライン一覧エリア（日付区切りと予定が並ぶスタック） --- */}
        <Stack spacing={2}>
          {timelineList.map((item) => {
            // タイプが「日付区切り（divider）」の場合のレンダリング
            if (item.type === 'divider') {
              dayCounter += 1; // 日数カウント（1日目、2日目...）
              return (
                <DateDividerRow
                  key={item.id}
                  item={item}
                  dayIndex={dayCounter}
                  onChange={handleItemChange}
                  onDelete={handleDelete}
                  onAddItemHere={handleAddItemUnderDivider}
                  // 日付区切りが2つ以上存在する場合のみ削除を許可（最後の1つは保護）
                  canDelete={timelineList.filter((i) => i.type === 'divider').length > 1}
                />
              );
            }

            // タイプが「通常の予定（item）」の場合のレンダリング
            return (
              <ItineraryItemRow
                key={item.id}
                item={item}
                onChange={handleItemChange}
                onDelete={handleDelete}
              />
            );
          })}
        </Stack>

        {/* 最下部アクションフッター（次の日程を追加） --- */}
        <TimelineFooter onAddDivider={handleAddDivider} />
      </Container>
    </LocalizationProvider>
  );
}