import dotenv from 'dotenv';
import { defineCliConfig } from 'sanity/cli';

dotenv.config({ path: '.env.local' });

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  },
  deployment: {
    appId: 'acrldq5qddmc8dnfs8jcvpaw',
  },
  studioHost: 'simonbaker',
});
