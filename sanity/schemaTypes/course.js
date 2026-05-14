import { defineType, defineField, defineArrayMember } from 'sanity'

export const course = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Course Title',
      type: 'string'
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'reference',
      to: [{ type: 'courseCategory' }],
      description: 'Select the subject category for this course or make a new one'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title'
      }
    }),
    defineField({
      name: 'slides',
      title: 'Course Slides',
      type: 'array',
      of: [defineArrayMember({ type: 'slide' })],
      description: 'Add, remove, and drag to edit slides in this course'
    })
  ]
})