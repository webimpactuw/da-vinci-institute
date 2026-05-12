import { defineType, defineField } from 'sanity'

export const slide = defineType({
  name: 'slide',
  title: 'Slide',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Slide Title',
      type: 'string',
      description: 'Title of the slide, used for navigation/table of contents',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'slideContent',
    }),
  ]
})