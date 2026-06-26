import api from '@/lib/axios';

export function createReminder(title: string, date: Date, recurring?: boolean) {
  return api.post('/reminder/create', {
    title,
    date,
    recurring,
  });
}

export function listReminders() {
  return api.get('/reminder/list');
}
