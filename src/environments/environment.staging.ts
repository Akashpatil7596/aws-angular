import { version } from 'node:os';
import { ENVIRONMENT_STAGES } from '../app/constants/environment';

export const environment = {
  stage: ENVIRONMENT_STAGES.LOCAL,
  apiUrl: 'https://aws-node-production.up.railway.app/',
};
