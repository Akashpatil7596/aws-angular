import { environment } from '../environments/environment';

export const apiUrl = environment.apiUrl;

export const stage: 'production' | 'staging' | 'local' = environment.stage as
  | 'production'
  | 'staging'
  | 'local';
