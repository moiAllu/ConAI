# CONAI

CONAI is a full SaaS product that leverages multiple APIs and AI models to provide advanced content and writing tools. The project features AI-driven functionalities, seamless payments via Stripe, and a modern tech stack for optimal performance.

## Features
- **AI-Powered Tools:**
  - **Rewrite:** Enhance and modify text with AI.
  - **AI Writing:** Generate high-quality content effortlessly.
  - **Image Generation:** Create AI-generated images.
  - **Plagiarism Checker:** Ensure content originality.
  - **Summarizer:** Condense long texts into concise summaries.
  - **AI Chat Assistant:** Smart AI chatbot for various queries.
- **Payment Integration:** Stripe is integrated for secure transactions.
- **Tech Stack:**
  - **Backend:** MERN (MongoDB, Express.js, React, Node.js)
  - **Frontend:** Next.js 14.2 with TailwindCSS and Shadcn UI
  - **Docker Support:** Easily run the application using Docker.

## Installation and Setup

### Cloning the Repository
1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd <repository-name>
   ```

### Running Frontend Separately
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open your browser and go to:
   ```
   http://localhost:3000/
   ```

### Running Backend Separately
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   npm run dev  # Or the appropriate start command for your backend
   ```

### Running the Complete Application with Docker
To run both frontend and backend using Docker:
1. Build and start the application:
   ```sh
   docker compose up --build
   ```
2. To run in detached mode:
   ```sh
   docker compose up -d --build
   ```

## Folder Structure
```
project-root/
│── frontend/  # Next.js application
│── backend/  # Backend service
│── docker-compose.yml  # Docker configuration file
```

## Contributing
Feel free to fork the repository, submit issues, or create pull requests to improve the project.

## License
This project is licensed under the MIT License.

---

**Author:** Ali Abbasi

