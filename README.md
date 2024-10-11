# Wedding Memories

Welcome to **Wedding Memories** — an app designed to capture, share, and cherish every unforgettable moment from your special day! Built with **[Pinata's Files API](https://docs.pinata.cloud/api-reference/files)**, this app allows guests to effortlessly upload and share photos and videos from your wedding, creating a collective album of beautiful memories.

## 🎯 Project Overview

Wedding Memories is a user-friendly platform tailored to elevate the wedding experience by allowing guests to become storytellers. From candid snapshots to heartfelt videos, everyone can contribute to a shared gallery, capturing the essence of the celebration.

## 🚀 Features

- **Seamless File Uploads**: Easy-to-use interface for guests to upload images, videos, and more directly from their devices.
- **Pinata Integration**: Utilizes Pinata’s Files API for secure, efficient file uploads and storage.
- **Optimized Performance**: Leverages Pinata's CDN for fast content delivery and enhanced user experience.
- **Customizable Gallery**: View all shared moments in a beautiful, responsive gallery.
- **Download Options**: Guests can download their favorite moments to keep memories forever.

## 💡 Why This App?

This app is inspired by the idea that weddings are best remembered through the eyes of those who attend. Wedding Memories invites all guests to participate, creating a collaborative album that captures every laugh, dance, and unforgettable smile from the event.

## 📂 Tech Stack

- **Frontend**: React, Next.js, Framer Motion
- **Backend**: Next.js, Pinata API
- **Styling**: Tailwind CSS
- **Hosting**: Vercel

## ⚙️ Setup & Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/femakin/WeddingMemories.git
   cd WeddingMemories
   ```
2. **Install Dependencies:**:
    ```bash
    npm install
    ```
3. **Environment Variables:**Set up environment variables for Pinata API keys in a `.env.local` file:
    ```bash
    PINATA_JWT=your_api_key
    NEXT_PUBLIC_GATEWAY_URL=your_secret_key
    ```
4. **Install Dependencies:**:
    ```bash
    npm run dev
    ```

## 📝 License

This project is licensed under the MIT License.

## 📝 Feedback

We’d love to hear your thoughts and suggestions! Feel free to open an issue on the repository.