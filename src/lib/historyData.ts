export interface HistoryItem {
  id: string;
  date: string;
  time: string;
  score: number;
  trend: 'up' | 'down' | 'same';
}

export const MOCK_HISTORY: HistoryItem[] = [
  { id: '1', date: 'Dec 18, 2025', time: '14:30', score: 5.0, trend: 'same' },
  { id: '2', date: 'Dec 15, 2025', time: '10:15', score: 4.5, trend: 'down' },
  { id: '3', date: 'Dec 12, 2025', time: '16:45', score: 5.0, trend: 'up' },
  { id: '4', date: 'Dec 10, 2025', time: '09:00', score: 4.5, trend: 'same' },
  { id: '5', date: 'Dec 07, 2025', time: '11:30', score: 4.0, trend: 'down' },
  { id: '6', date: 'Dec 04, 2025', time: '14:00', score: 4.5, trend: 'up' },
  { id: '7', date: 'Dec 01, 2025', time: '08:45', score: 4.0, trend: 'same' },
  { id: '8', date: 'Nov 28, 2025', time: '15:20', score: 3.5, trend: 'down' },
];
