export const courseData = {
    writing: {
      label: "Writing",
      courses: {
        1: {
          name: "Introduction to Writing",
          description: "Enroll in this course to learn the foundations of writing.",
          progress: 99,
          status: "resume",
          sections: [
            {
              type: "text",
              heading: "Text Card Section Heading",
              subheading: "Subheading · Term · Subject",
              blocks: [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation <strong>'Ullamco'</strong> laboris nisi ut aliquip.",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
              ],
              progress: 65,
            },
            {
              type: "video",
              title: "Video Card Section",
              videoUrl: null,
              progress: 40,
            },
            {
              type: "image",
              title: "Image Card Section",
              imageSrc: null,
              progress: 40,
            },
            {
              type: "imageText",
              title: "Image + Text Card Section",
              text: "Thanks for taking this course. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ante eleifend, vulputate id ex. Sed tempor commodo nisl, eget dictum purus condimentum id. Aliquam feugiat nisi at nunc iaculis facilisis ut et libero.",
              progress: 40,
            },
            {
              type: "quiz",
              title: "Quiz Card Section",
              question: "Question A B C D E F G",
              options: [
                { label: "Answer option A" },
                { label: "Answer option B", correct: true, explanation: "Answer B is correct because it best describes the concept." },
                { label: "Answer option C" },
                { label: "Answer option D" },
              ],
              progress: 0,
            },
          ],
        },
        2: {
          name: "Essay Structure",
          description: "Learn how to craft well-structured essays.",
          status: "begin",
          sections: [
            {
              type: "text",
              heading: "Essay Structure",
              subheading: "Writing · Term 1 · Core",
              blocks: [
                "A well-structured essay has a clear introduction, body paragraphs, and a conclusion. Each paragraph should focus on a single idea supported by evidence.",
                "The introduction should hook the reader and present a clear thesis statement that the rest of the essay will support.",
              ],
              progress: 0,
            },
            {
              type: "video",
              title: "How to Write a Thesis Statement",
              videoUrl: null,
              progress: 0,
            },
            {
              type: "quiz",
              title: "Essay Quiz",
              question: "Which part of an essay presents the main argument?",
              options: [
                { label: "The conclusion" },
                { label: "The thesis statement", correct: true, explanation: "The thesis is where you state your main argument." },
                { label: "A body paragraph" },
                { label: "The bibliography" },
              ],
              progress: 0,
            },
          ],
        },
        3: {
          name: "Creative Writing",
          description: "Explore storytelling, poetry, and creative expression.",
          status: "begin",
          sections: [
            {
              type: "text",
              heading: "The Art of Storytelling",
              subheading: "Writing · Term 2 · Elective",
              blocks: [
                "Creative writing is the art of crafting narratives, characters, and worlds from imagination. It encompasses fiction, poetry, screenwriting, and more.",
              ],
              progress: 0,
            },
          ],
        },
      },
    },
    music: {
      label: "Music",
      courses: {
        1: {
          name: "Music Theory I",
          description: "Introduction to notes, scales, and rhythm.",
          status: "begin",
          sections: [
            {
              type: "text",
              heading: "Introduction to Music Theory",
              subheading: "Music · Term 1 · Foundation",
              blocks: [
                "Music theory is the study of the practices and possibilities of music. It covers the elements of sound: pitch, rhythm, harmony, and form.",
              ],
              progress: 0,
            },
            {
              type: "image",
              title: "The Musical Staff",
              imageSrc: null,
              progress: 0,
            },
            {
              type: "quiz",
              title: "Notes Quiz",
              question: "How many lines does a standard musical staff have?",
              options: [
                { label: "4" },
                { label: "5", correct: true, explanation: "A standard staff has 5 lines and 4 spaces." },
                { label: "6" },
                { label: "7" },
              ],
              progress: 0,
            },
          ],
        },
        2: {
          name: "Music Theory II",
          description: "Harmony, chords, and composition basics.",
          status: "begin",
          sections: [
            {
              type: "text",
              heading: "Harmony & Chords",
              subheading: "Music · Term 2 · Foundation",
              blocks: [
                "Harmony refers to the combination of simultaneously sounded musical notes to produce chords and chord progressions.",
              ],
              progress: 0,
            },
          ],
        },
      },
    },
    biology: {
      label: "Biology",
      courses: {
        1: {
          name: "Cell Biology",
          description: "The building blocks of all living organisms.",
          status: "begin",
          sections: [
            {
              type: "text",
              heading: "The Cell: Unit of Life",
              subheading: "Biology · Term 1 · Foundation",
              blocks: [
                "Cells are the basic structural and functional units of all living organisms. Every living thing — from bacteria to blue whales — is made of cells.",
              ],
              progress: 0,
            },
            {
              type: "imageText",
              title: "Cell Structure",
              text: "Animal cells contain a nucleus, mitochondria, ribosomes, and other organelles enclosed within a cell membrane. Plant cells additionally have a cell wall, chloroplasts, and a large central vacuole.",
              progress: 0,
            },
            {
              type: "quiz",
              title: "Cell Quiz",
              question: "Which organelle is responsible for producing energy in the cell?",
              options: [
                { label: "Nucleus" },
                { label: "Mitochondria", correct: true, explanation: "The mitochondria is known as the powerhouse of the cell." },
                { label: "Ribosome" },
                { label: "Vacuole" },
              ],
              progress: 0,
            },
          ],
        },
      },
    },
    math: {
      label: "Math",
      courses: {
        1: {
          name: "Algebra I",
          description: "Equations, inequalities, and functions.",
          status: "begin",
          sections: [
            {
              type: "text",
              heading: "Introduction to Algebra",
              subheading: "Math · Term 1 · Core",
              blocks: [
                "Algebra is the branch of mathematics dealing with symbols and the rules for manipulating those symbols to solve equations.",
              ],
              progress: 0,
            },
            {
              type: "video",
              title: "Solving Linear Equations",
              videoUrl: null,
              progress: 0,
            },
            {
              type: "quiz",
              title: "Algebra Quiz",
              question: "Solve for x: 2x + 4 = 12",
              options: [
                { label: "x = 3" },
                { label: "x = 4", correct: true, explanation: "2(4) + 4 = 12 ✓" },
                { label: "x = 6" },
                { label: "x = 8" },
              ],
              progress: 0,
            },
          ],
        },
      },
    },
    statistics: {
      label: "Statistics",
      courses: {
        1: {
          name: "Descriptive Statistics",
          description: "Mean, median, mode and data visualization.",
          status: "begin",
          sections: [
            {
              type: "text",
              heading: "Measures of Central Tendency",
              subheading: "Statistics · Term 1 · Foundation",
              blocks: [
                "Descriptive statistics summarize and describe the main features of a dataset. The three measures of central tendency are the mean, median, and mode.",
              ],
              progress: 0,
            },
            {
              type: "image",
              title: "Normal Distribution Curve",
              imageSrc: null,
              progress: 0,
            },
            {
              type: "quiz",
              title: "Stats Quiz",
              question: "What is the median of [3, 7, 1, 9, 5]?",
              options: [
                { label: "3" },
                { label: "5", correct: true, explanation: "Sorted: 1,3,5,7,9 — the middle value is 5." },
                { label: "7" },
                { label: "9" },
              ],
              progress: 0,
            },
          ],
        },
      },
    },
  };