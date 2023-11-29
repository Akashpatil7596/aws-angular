import { version } from 'node:os';
import { ENVIRONMENT_STAGES } from '../app/constants/environment';

export const environment = {
  stage: ENVIRONMENT_STAGES.LOCAL,
  apiUrl: 'http://localhost:8080/',
};
