## Radio Browser Frontend Challenge

>  Live [Radio Browser Frontend Challenge](https://frontend-radio-browser-hugo-leonardo.vercel.app)

>  This is a challenge by [Coodesh](https://coodesh.com/)

This is an app designed to search for AM/FM radios around the world. You can also add radios to your favorites. Track and hear your favorite radio later, whenever you want.

- [Requirements pt-BR](https://github.com/hugoleonardodev/hugo-radio-browser?tab=readme-ov-file#obrigat%C3%B3rios)

- Bonus requirements: Dark mode and support for multiple languages

## Languages and Technologies

- Next.js application with TypeScript.
- Flowbite React is an UI library that is built on top of TailwindCSS. So I can take advantege from both. Because I can have beatiful components whenever I want or build my own component with TailwindCSS.
- React Hook Form and Zod for input validations. Zod is a TypeScript friendly validator.
- All the other libraries listed on package.json "dependencies" are recommended by Vercel at Next.js documentation.
- Tests are configured for both unit with Jest and React Testing Library and Cypress for E2E tests. I have writen a few tests with Cypress.
- For "devDependencies" I'm using ES Lint and Prettier with several plugins. CSS nano and Post CSS are tools to improve production bundle.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
# Localhost development server
npm run dev
# Build for production
npm run build
# Test with Cypress Open
npm run test:open
# Test with Cypress Headless
npm run test:e2e

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
