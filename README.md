<p align="center">
  <img src="https://github.com/user-attachments/assets/524e170e-3d2a-4968-b3eb-d4b2470e410b" width="200" alt="logo" />
</p>

<h3 align="center">The open-source AI Chatbot for your website</h3>

<p align="center">Give us a star ⭐️</p>

## About the project


<img
  width="600px"
  alt="Demo gif image"
  src="https://github.com/user-attachments/assets/635d0445-a6ea-4410-b740-9d6bbbba4ec1"
/>

### Built with

* [Next.js](https://nextjs.org/)
* [Supabase](https://supabase.com/)
* [Upstash](https://upstash.com/)
* [Tailwind CSS](https://tailwindcss.com/)
* [ScrapingFish](https://scrapingfish.com/)

## Getting started :)

### Prerequisites

You need to create projects on each of the following platforms for `.env` file:
* Supabase
* Upstash
* Vercel
* ScrapingFish

### Setup

1. Clone the repo
   ```shell
   git clone https://github.com/taishikato/chatsage.git
   ```

2. Go to the project folder
   ```shell
   cd chatsage
   ```

3. Install packages with `pnpm`
   ```shell
   pnpm i
   ```

4. Set up your `.env` file
   * Duplicate `.env.example` to `.env`
   * Set the values

5. Apply the migration to the remote database (Supabase)
   ```shell
   supabase db push
   ```

6. Enable Google Sign-In on the Supabase Auth settings page.

   [Login with Google | Supabase Docs](https://supabase.com/docs/guides/auth/social-login/auth-google)