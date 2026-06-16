import { defineArrayMember, defineType, defineField } from "sanity";

export const quizCard = defineType({
  name: "quizCard",
  title: "Quiz Card",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "options",
      title: "Options",
      type: "array",
      of: [defineArrayMember({
        type: "object",
        fields: [
          defineField({
            name: "label",
            title: "Label",
            type: "string",
            validation: (Rule) => Rule.required(),
          }),
          defineField({
            name: "correct",
            title: "Correct",
            type: "boolean",
            description: "Check if this option is the correct answer",
          }),
          defineField({
            name: "explanation",
            title: "Explanation",
            type: "string",
            description: "Optional explanation to show after answering the question"
          }),
        ],
      })],
      validation: (Rule) => Rule.min(2).required(),
    }),
  ],
});