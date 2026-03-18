import dotenv from 'dotenv';
import { defineCliConfig } from 'sanity/cli';

dotenv.config({ path: '.env.local' });

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  },
  // Studio URL will be https://simonbaker.sanity.studio (no dots allowed in hostname)
  studioHost: 'simonbaker',
});
