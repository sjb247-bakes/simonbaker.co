export const testimonialSchema = {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role / Context',
      type: 'string',
      description: 'e.g., "Founder & CEO", "Ultramarathon Athlete"',
    },
    {
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'program',
      title: 'Program',
      type: 'string',
      options: {
        list: [
          { title: 'Performance Coaching', value: 'Performance Coaching' },
          { title: 'Group Cohort', value: 'Group Cohort' },
          { title: 'Hypnotherapy', value: 'Hypnotherapy' },
          { title: '1:1 Intensive', value: '1:1 Intensive' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'featured',
      title: 'Show on Performance Page',
      type: 'boolean',
      initialValue: false,
      description: 'Check this to display on the performance page',
    },
  ],
};
