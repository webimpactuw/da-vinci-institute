import { defineType, defineField } from 'sanity'

export const subject = defineType({
  name: 'subject',
  title: 'Subject',
  type: 'document',
  fields: [
    defineField({
      name: 'subjectName',
      title: 'Subject Name',
      type: 'string'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'subjectName'
      }
    }),
  ]
})