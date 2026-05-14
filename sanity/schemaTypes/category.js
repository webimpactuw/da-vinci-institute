import { defineType, defineField } from 'sanity'

export const courseCategory = defineType({
  name: 'courseCategory',
  title: 'Course Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string'
    })
  ]
})