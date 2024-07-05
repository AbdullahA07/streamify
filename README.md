This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project Setup Instructions
This project integrates LiveKit, Clerk Authentication, Google Trends, and OpenAI within a Next.js framework. Follow the steps below to set up and run the project:

1, Clone the Project

Edit the .env file in the root directory of the project.
2, Place your API secrets and keys for LiveKit, Clerk Authentication, Google Trends, and OpenAI in the corresponding fields.
Example:

LIVEKIT_API_KEY=your_livekit_api_key
CLERK_API_KEY=your_clerk_api_key
GOOGLE_TRENDS_API_KEY=your_google_trends_api_key
OPENAI_API_KEY=your_openai_api_key

3, Install Dependencies

npm install

4, Download and Install OBS Studio

Download and install OBS Studio or any other streaming tool of your choice from OBS Studio.

5, Generate Ingress ID

Login to webapp
Go to dashboard
Go to Keys
Select one of the provided protocols
Generate key

6, Copy your Ingress ID and server URL from the Webapp.
Paste these values into the appropriate fields in your streaming tool.

7, Start your stream using the configured streaming tool.
Open the Web Application

Open the web application in your browser.
Enjoy the stream!

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
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
