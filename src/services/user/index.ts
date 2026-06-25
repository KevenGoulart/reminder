import api from '@/lib/axios';

export function registerUser(email: string, password: string) {
  return api.post('/auth/register', {
    email,
    password,
  });
}

export function loginUser(email: string, password: string) {
  return api.post('/auth/login', {
    email,
    password,
  });
}
