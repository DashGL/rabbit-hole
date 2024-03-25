import inquirer from 'inquirer';
import fs from 'fs';
import { blogTypes } from './src/content/blogTypes';

type Answers = {
    name: string;
    description: string;
    category: string;
    newCategory?: string;
};

const questions = [
    {
        type: 'input',
        name: 'name',
        message: "What's the name of the post?",
    },
    {
        type: 'input',
        name: 'description',
        message: "What's the description of the post?",
    },
    {
        type: 'list',
        name: 'category',
        message: 'Select the category of the post:',
        choices: [...blogTypes, 'Add New'],
    },
    {
        type: 'input',
        name: 'newCategory',
        message: "Enter the new category:",
        when: (answers: Answers) => answers.category === 'Add New',
    },
];

console.log("Hello, let's make a new post ^_^");

inquirer.prompt(questions).then((answers: Answers) => {
    const { name, description, category, newCategory } = answers;
    const selectedCategory = category === 'Add New' ? newCategory! : category;
    const publishDate = new Date().toISOString();
    const content = `---
title: ${name}
description: ${description}
category: ${selectedCategory}
publishDate: ${publishDate}
thumbnail: /src/assets/thumbnails/placeholder.png
---
  
# ${name}
> A funny or inspirational quote goes here.`;

    if (newCategory) {
        const updatedBlogTypes = [...blogTypes, newCategory];
        fs.writeFileSync(
            'src/content/blogTypes.ts',
            `export const blogTypes = ${JSON.stringify(updatedBlogTypes)} as const;`
        );
    }

    fs.writeFileSync(
        `src/content/blog/${name.toLowerCase().replace(/\s+/g, '-')}.mdx`,
        content
    );

    console.log('Post created successfully!');
});
