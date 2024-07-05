## Streamify

# Project Summary

In today’s social age, content creation and marking your presence on social media has become a cornerstone of online interaction and content consumption. The presence on social media gives edge to individuals striving to deliver their beliefs and thoughts to the world. However, in many regions, including Pakistan, there is a significant gap in the availability of platforms that cater specifically to the needs of local content creators and audiences. Often the content creators are unaware of the rising trends in the world and face difficulties in bringing the audience to their content. Existing platforms like Twitch, YouTube Live, and Facebook Live offer robust features but often lack the localized focus and support for regional content monetization.
Streamify aims to fill this void by offering an interactive social media platform where users can stream their content by ease with the options to follow each other on the platform while also getting intelligent content ideas by AI. By integrating real-time streaming, interactive chat, and AI-driven content recommendations, the platform enhances user engagement and community building. The use of Google Trends ensures that the content remains relevant and timely, while OpenAI provides intelligent topic suggestions to keep audiences interested.

# Novelty

The live streaming social media platform addresses the growing need for real-time, interactive content sharing and community building specially in Pakistan. In Pakistan, the digital landscape is rapidly evolving, with increasing internet social media and  smartphone usage. However, there remains a significant gap in platforms that cater to the specific needs of local content creators and audiences. This project aims to bridge this gap by offering a robust, localized platform that supports real-time streaming, interactive chat, and intelligent content recommendations.
One of the key challenges this project solves is the integration of real-time data and user interaction in a seamless and scalable manner. By leveraging advanced technologies such as WebRTC for low-latency streaming, WebSockets for instant messaging, and AI for content suggestions, the platform enhances user engagement and provides a dynamic content experience. Additionally, the integration of Google Trends data ensures that the content remains relevant and timely, helping content creators stay ahead of trends and capture the audience's interest. This comprehensive solution not only facilitates real-time content sharing but also fosters a sense of community and engagement among users.
Additionally, there is a critical need for a local revenue-generating platform for individuals in Pakistan. Many talented creators struggle to monetize their content effectively due to the lack of accessible and reliable platforms that support local payment methods and cater to regional preferences.



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
