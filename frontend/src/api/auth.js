import { useMutation } from '@tanstack/react-query';
import { client } from './client';

export const useRegisterMutation = () =>
  useMutation({
    mutationFn: (payload) => client.post('/auth/register/', payload),
  });

export const useLoginMutation = () =>
  useMutation({
    mutationFn: (payload) => client.post('/token/', payload),
  });

export const useRefreshMutation = () =>
  useMutation({
    mutationFn: () => client.refreshAccessToken(),
  });


