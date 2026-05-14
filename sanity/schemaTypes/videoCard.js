import { defineField, defineType } from "sanity";

export const videoCard = defineType({
  name: "videoCard",
  title: "Video Card",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "URL to YouTube, Vimeo, or a hosted video file",
    }),
  ],
});