import React, { useState } from 'react';
import ItineraryItemRow from '../ItineraryItemRow';
import { createEmptyItineraryItem } from '../../types/itinerary';

export default {
  title: 'Itinerary/ItineraryItemRow',
  component: ItineraryItemRow,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'onChange' },
    onDelete: { action: 'onDelete' },
  },
};

// 1. 初期表示状態（時間・内容すべてブランク、初期カテゴリ: ご飯）
export const DefaultEmpty = {
  args: {
    item: createEmptyItineraryItem('meal'),
  },
};

// 2. 「移動」選択時（MoveForm が内部で呼び出される状態）
export const MoveCategory = {
  args: {
    item: {
      ...createEmptyItineraryItem('move'),
      startTime: '09:00',
      endTime: '10:30',
      moveMethod: 'train',
      notes: '新幹線 乗車',
    },
  },
};

// 3. バリデーション警告（終了時刻が開始時刻より前の異常系）
export const TimeValidationError = {
  args: {
    item: {
      ...createEmptyItineraryItem('activity'),
      startTime: '15:00',
      endTime: '12:00', // 開始より前
      place: '美術館 鑑賞',
    },
  },
};

// 4. インタラクティブ（カテゴリ選択でフォームが切り替わる動作を完全検証）
export const Interactive = () => {
  const [item, setItem] = useState(createEmptyItineraryItem('meal'));

  const handleChange = (id, field, value) => {
    setItem((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <ItineraryItemRow
      item={item}
      onChange={handleChange}
      onDelete={(id) => alert(`Delete item: ${id}`)}
    />
  );
};