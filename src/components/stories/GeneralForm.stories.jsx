import React, { useState } from 'react';
import GeneralForm from '../GeneralForm';
import { createEmptyItineraryItem } from '../../types/itinerary';

export default {
  title: 'Itinerary/Forms/GeneralForm',
  component: GeneralForm,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'onChange' },
  },
};

// 1. ご飯（初期状態・ブランク）
export const MealEmpty = {
  args: {
    item: createEmptyItineraryItem('meal'),
  },
};

// 2. アクティビティ（入力例付き）
export const ActivityFilled = {
  args: {
    item: {
      ...createEmptyItineraryItem('activity'),
      place: 'カヤックツアー',
      url: 'https://example.com/activity/kayak',
      notes: '濡れてもいい服装と着替えを持参すること',
    },
  },
};

// 3. ショッピング
export const Shopping = {
  args: {
    item: createEmptyItineraryItem('shopping'),
  },
};

// 4. その他（ホテル等）
export const Other = {
  args: {
    item: createEmptyItineraryItem('other'),
  },
};

// 5. インタラクティブ（入力動作確認用）
export const Interactive = () => {
  const [item, setItem] = useState(createEmptyItineraryItem('meal'));
  const handleChange = (id, field, value) => {
    setItem((prev) => ({ ...prev, [field]: value }));
  };

  return <GeneralForm item={item} onChange={handleChange} />;
};