// カテゴリの選択肢
export const CATEGORY_OPTIONS = [
  { value: 'meal', label: 'ご飯' },
  { value: 'move', label: '移動' },
  { value: 'activity', label: 'アクティビティ' },
  { value: 'shopping', label: 'ショッピング' },
  { value: 'other', label: 'その他' },
];

export const MOVE_METHOD_OPTIONS = [
  { value: 'walk', label: '徒歩' },
  { value: 'train', label: '電車' },
  { value: 'bus', label: 'バス' },
  { value: 'car', label: '車' },
  { value: 'airplane', label: '飛行機' },
  { value: 'other', label: 'その他' },
];

// 日付区切りの初期生成
export const createEmptyDateDivider = () => ({
  id: `divider-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
  type: 'divider',
  date: new Date().toISOString().split('T')[0],
});

// 予定ブロックの初期生成
export const createEmptyItineraryItem = (initialCategory = 'meal') => ({
  id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
  type: 'item',
  startTime: '',
  endTime: '',
  category: initialCategory,
  moveMethod: 'train',
  moveMethodCustom: '',
  place: '',
  url: '',
  notes: '',
});