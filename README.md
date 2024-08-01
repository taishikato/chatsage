<p align="center">
  <img src="https://github.com/user-attachments/assets/524e170e-3d2a-4968-b3eb-d4b2470e410b" width="200" alt="logo" />
</p>

<h3 align="center">The open-source AI Chatbot for your website</h3>

<p align="center">Give us a star ⭐️</p>

# Chatsage

![GitHub last commit (branch)](https://img.shields.io/github/last-commit/taishikato/chatsage/main)
![Vercel](https://vercelbadge.vercel.app/api/taishikato/chatsage)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

[Discord](https://discord.gg/reEuUQNYb3)

[Chatsage](https://www.chatsage.co/) is an open source Chatbase alternative.

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

## Contact us (I mean...me)

[@taishik_](https://x.com/taishik_)

## Cloud version

https://www.chatsage.co

## Self hosting

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

## Contributors

<a href="https://github.com/taishikato/chatsage/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=taishikato/chatsage" />
  <img width="65" src="https://github.com/user-attachments/assets/b5ed2394-7964-4dc6-9193-9ebbf63daf5f" />
</a>
