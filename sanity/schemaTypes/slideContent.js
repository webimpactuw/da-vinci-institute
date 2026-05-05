import { defineType, defineArrayMember } from 'sanity'

export const slideContent = defineType({
  name: 'slideContent',
  title: 'Slide Content',
  type: 'array',
  of: [
    defineArrayMember({ type: 'block' }),
    defineArrayMember({
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineArrayMember({
      name: 'videoRef',
      title: 'Video',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'Video URL',
          type: 'url',
          description: 'URL to YouTube, Vimeo, or a hosted video file',
        }
      ]
    })
  ]
})