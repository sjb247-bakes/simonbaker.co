const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Lazy initialization to avoid errors at build time
let _client: any = null;
let imageBuilder: any = null;
let initialized = false;

async function ensureInitialized() {
  if (initialized || !projectId) return;
  
  const { createClient } = await import('next-sanity');
  const { default: imageUrlBuilder } = await import('@sanity/image-url');
  
  _client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-03-15',
    useCdn: process.env.NODE_ENV === 'production',
  });
  
  imageBuilder = imageUrlBuilder(_client);
  initialized = true;
}

// Mock client for build time
export const client = {
  fetch: async (query: string) => {
    if (!projectId) {
      console.warn('Sanity projectId not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local');
      return [];
    }
    
    if (!initialized) {
      await ensureInitialized();
    }
    
    return _client?.fetch(query) || [];
  },
};

export const urlFor = (source: any) => {
  return {
    url: () => {
      if (!projectId || !imageBuilder) return '';
      return imageBuilder.image(source).url();
    },
  };
};
