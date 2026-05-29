import { defineType, defineField } from 'sanity'

export const imageCard = defineType({
  name: 'imageCard',
  title: 'Image Card',
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
      description: 'A short description of the image for accessibility purposes'
    }),
  ]
})