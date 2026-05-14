import { defineType, defineField } from 'sanity';

export const textCard = defineType({
  name: 'textCard',
  title: 'Text Card',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required()
    })
  ]
});