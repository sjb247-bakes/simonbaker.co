export const postSchema = {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Performance', value: 'performance' },
          { title: 'Renovation', value: 'renovation' },
          { title: 'Cars', value: 'cars' },
          { title: 'Blog', value: 'blog' },
        ],
      },
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    },
    {
      name: 'noindex',
      title: 'No Index (Archive)',
      type: 'boolean',
      description: 'If true, this post will be excluded from search engines (kept for SEO link juice only)',
      initialValue: false,
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'For search results (50-60 chars)',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 2,
          description: 'For search results (150-160 chars)',
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Comma-separated tags',
        },
        {
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'image',
          description: 'Image for social media preview (1200x630)',
        },
      ],
    },
  ],
}
