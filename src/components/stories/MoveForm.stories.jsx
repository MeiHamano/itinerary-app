import React, { useState } from 'react';
import MoveForm from '../MoveForm';
import { createEmptyItineraryItem } from '../../types/itinerary';

export default {
  title: 'Itinerary/Forms/MoveForm',
  component: MoveForm,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'onChange' },
  },
};

// 1. 初期状態（ブランク）
export const EmptyState = {
  args: {
    item: {
      ...createEmptyItineraryItem('move'),
      moveMethod: 'train',
    },
  },
};

// 2. 「その他」選択時（自由記述テキストエディターが出現）
export const OtherMethodSelected = {
  args: {
    item: {
      ...createEmptyItineraryItem('move'),
      moveMethod: 'other',
      moveMethodCustom: 'フェリー',
      url: 'https://example.com/ferry-booking',
      notes: '出航の30分前までに受付手続きが必要',
    },
  },
};

// 3. インタラクティブ（セレクト操作や入力切り替えの動作確認用）
export const Interactive = () => {
  const [item, setItem] = useState({
    ...createEmptyItineraryItem('move'),
    moveMethod: 'train',
  });

  const handleChange = (id, field, value) => {
    setItem((prev) => ({ ...prev, [field]: value }));
  };

  return <MoveForm item={item} onChange={handleChange} />;
};