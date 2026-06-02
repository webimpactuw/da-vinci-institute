import { defineType, defineField, defineArrayMember } from 'sanity'

export const course = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Course Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Course Description',
      type: 'string'
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'reference',
      to: [{ type: 'subject' }],
      description: 'Select the subject for this course or make a new one',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title'
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slides',
      title: 'Course Slides',
      type: 'array',
      of: [
        defineArrayMember({ type: 'textCard' }),
        defineArrayMember({ type: 'imageCard' }),
        defineArrayMember({ type: 'imageTextCard' }),
        defineArrayMember({ type: 'videoCard' }),
        defineArrayMember({ type: 'quizCard' }),
      ],
      description: 'Add, remove, and drag to edit slides in this course'
    })
  ]
})