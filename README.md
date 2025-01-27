# Realtime Community Chat App

A fully functional real-time community chat application built using **React**, **React-Redux**, **Vite**, and **Appwrite**. This app allows users to create accounts, log in, and chat with others in real-time. The project demonstrates the power of modern web technologies for building dynamic, responsive, and engaging user interfaces.

## Live Demo

[Realtime Community Chat App](https://realtime-community-chat-app.vercel.app/)

## Features

- **Authentication**:
  - User Sign Up and Login using Appwrite's secure authentication service.
- **Real-Time Messaging**:
  - Instant messaging with real-time updates.
  - Messages are synced across all clients using Appwrite's Realtime API.
- **Redux Integration**:
  - Efficient state management using React-Redux.
- **Responsive Design**:
  - Fully responsive layout for seamless use on desktops, tablets, and mobile devices.
- **Modern Styling**:
  - Styled with Tailwind CSS for a sleek and consistent design.

## Technologies Used

- **Frontend**:
  - React: For building the user interface.
  - React-Redux: For state management.
  - Vite: For faster development and build process.
  - Tailwind CSS: For styling.
- **Backend**:
  - Appwrite: For user authentication and real-time database operations.
- **Deployment**:
  - Vercel: For hosting the live version of the app.

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

1. Install [Node.js](https://nodejs.org/) (version 14 or higher).
2. Set up an Appwrite instance or use an existing one.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mohammedshoaib2/realtime-community-chat-app.git
   cd realtime-community-chat-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your Appwrite credentials:

   ```env
   VITE_APPWRITE_PROJECT_ID=[YOUR_PROJECT_ID]
   VITE_APPWRITE_URL=https://[YOUR_APPWRITE_ENDPOINT]
   VITE_APPWRITE_DATABASE_ID=[YOUR_DATABASE_ID]
   VITE_APPWRITE_COLLECTION_ID=[YOUR_COLLECTION_ID]
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to the local development URL provided by Vite.

## How It Works

- **Authentication**: Users can register and log in via the Appwrite backend. Authenticated users are redirected to the chat screen.
- **Real-Time Chat**: Messages are stored in an Appwrite database collection. Subscriptions to the database allow real-time updates across all clients.

## Deployment

The app is deployed on Vercel. To deploy your own version:

1. Push your project to a GitHub repository.
2. Link the repository to Vercel.
3. Set the environment variables in Vercel as defined in `.env`.
4. Deploy the app with a single click.

## Future Enhancements

- Add user profiles with avatars.
- Implement typing indicators.
- Support multiple chat rooms.
- Add file and media sharing.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to explore the app and contribute to its development!
