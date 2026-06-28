import { defineType, defineField } from 'sanity'

export const imageTextCard = defineType({
  name: 'imageTextCard',
  title: 'Image + Text Card',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'imageSrc',
      title: 'Image File',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
      description: 'A short description of the image for accessibility purposes',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required()
    })
  ]
})