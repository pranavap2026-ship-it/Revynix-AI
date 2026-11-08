# 🚀 DevLens AI — Frontend

<p align="center">
  <strong>AI-Powered Code Review Platform</strong>
  <br />
  Analyze source code, identify potential bugs and security issues, and receive actionable AI-powered improvement suggestions.
</p>

<p align="center">
  <a href="https://revynix-ai.vercel.app/">🌐 Live Application</a> •
  <a href="https://github.com/pranavap2026-ship-it/Revynix-AI">💻 Frontend Repository</a> •
  <a href="https://github.com/pranavap2026-ship-it/Revynix-AI-backend">⚙️ Backend Repository</a>
</p>

---

## 📌 Overview

**DevLens AI** is a web-based AI-assisted code review platform designed to help developers analyze source code and improve software quality.

The platform provides structured AI-generated feedback to help developers identify:

- Potential bugs and logical errors.
- Security vulnerabilities.
- Performance issues.
- Code quality problems.
- Refactoring opportunities.
- Suggestions for improving code readability and maintainability.

This repository contains the **frontend application**, developed using React.js and Vite. It provides an interactive interface for authentication, code submission, AI-powered reviews, review history, user profiles, and administrative management.

The frontend communicates with a separate Node.js and Express backend through API services.

## 🌐 Live Demo

**Live Application:**  
https://revynix-ai.vercel.app/

The application requires the backend API to be available and correctly configured.

---

## ✨ Features

### 🤖 AI-Powered Code Review
- Submit source code for AI-assisted analysis.
- Receive structured code review feedback.
- Identify potential bugs, security concerns, and performance issues.
- Get actionable code improvement recommendations.

### 💻 Code Editor
- Integrated Monaco Editor.
- Edit and prepare source code before submitting it for review.
- Improved code editing experience.

### 📊 Dashboard
- View review activity and related information.
- Access important platform features from a centralized interface.

### 📜 Review History
- Browse previously submitted code reviews.
- Revisit previous analysis results.
- Access individual review details.

### 🔐 Authentication & Authorization
- User registration and login.
- Protected application routes.
- Authentication context management.
- Role-based access to administrative functionality.

### 🛡️ Admin Panel
- Administrative interface for platform management.
- Access restricted administrative features.

### 👤 Profile Management
- View and manage user profile information.
- Access personal account details.

### 🎨 User Interface
- Responsive desktop and mobile layouts.
- Theme switching functionality.
- Animated interface elements.
- Reusable UI components.
- Loading indicators and toast notifications.

### 📄 PDF Export
- Export supported review information as PDF documents.

---

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend Framework | React.js |
| Build Tool | Vite |
| Programming Language | JavaScript |
| Routing | React Router |
| Code Editor | Monaco Editor |
| API Communication | Axios |
| Styling | CSS, Tailwind CSS |
| Animations | Framer Motion |
| Icons | React Icons |
| Notifications | React Hot Toast |
| PDF Generation | jsPDF, html2canvas |
| Deployment | Vercel |

Refer to `package.json` for the exact dependency versions and available npm scripts.

---

## 🏗️ Project Architecture

The application follows a component-based frontend architecture.

- **Components:** Reusable UI elements and route protection.
- **Context:** Global authentication state management.
- **Hooks:** Reusable React hooks.
- **Layouts:** Shared application layouts.
- **Pages:** Application screens and user-facing features.
- **Services:** Backend API communication.
- **Utils:** Helper functions and supporting utilities.

### 📁 Project Structure

```text
client/
├── public/
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── AdminRoute.jsx
│   │   ├── AuthField.jsx
│   │   ├── AuthLayout.jsx
│   │   ├── Footer.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── ParticlesBackground.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── ReviewCard.jsx
│   │   ├── ScoreRing.jsx
│   │   ├── Sidebar.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── Toast.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── hooks/
│   │   └── useAuth.js
│   │
│   ├── layouts/
│   │   └── DashboardLayout.jsx
│   │
│   ├── pages/
│   │   ├── AdminPanel.jsx
│   │   ├── Dashboard.jsx
│   │   ├── History.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── Profile.jsx
│   │   ├── Register.jsx
│   │   ├── ReviewDetails.jsx
│   │   ├── ReviewEditor.jsx
│   │   └── Reviewer.jsx
│   │
│   ├── services/
│   │
│   ├── utils/
│   │   ├── api.js
│   │   ├── helpers.js
│   │   └── pdfExport.js
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── vercel.json
└── vite.config.js
```

*Note: This structure highlights the main application files. Additional files may exist in the project.*

---

## ⚙️ Getting Started

Follow these instructions to run the frontend application locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm
- Git
- A running DevLens AI backend API

### 1. Clone the Repository

```bash
git clone https://github.com/pranavap2026-ship-it/Revynix-AI.git
```

### 2. Navigate to the Project Directory

```bash
cd Revynix-AI/client
```

If the repository contains only the frontend application, navigate directly to the cloned repository directory instead.

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the frontend project root.

Configure the API base URL using the exact environment variable expected by `src/utils/api.js`.

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

**Important:** `VITE_API_URL` is an example. Check `src/utils/api.js` and use the actual variable name and URL format implemented in the project.

For production, configure the deployed backend API URL in your Vercel project environment variables.

> **Security:** Vite exposes variables prefixed with `VITE_` to the browser. Never store database credentials, private API keys, JWT secrets, or other server-side secrets in frontend environment variables.

### 5. Start the Development Server

```bash
npm run dev
```

Vite will display the local development URL in the terminal. The default is usually:

```text
http://localhost:5173
```

### 6. Build for Production

```bash
npm run build
```

### 7. Preview the Production Build

```bash
npm run preview
```

---

## 🔗 Backend Integration

The frontend communicates with a separate backend application.

**Backend Repository:**  
https://github.com/pranavap2026-ship-it/Revynix-AI-backend

The backend is responsible for:

- User authentication and authorization.
- Database operations.
- Code review processing.
- AI service integration.
- Review history management.
- User and administrative operations.

The frontend API configuration is maintained in:

```text
src/utils/api.js
```

Ensure that the API base URL is configured correctly and that the backend allows requests from the deployed frontend domain.

---

## ☁️ Deployment

The frontend application is deployed using **Vercel**.

**Live URL:**  
https://revynix-ai.vercel.app/

### Deployment Steps

1. Import the frontend GitHub repository into Vercel.
2. Configure the project root directory.
3. Set the appropriate environment variables.
4. Use the following build configuration:

| Setting | Value |
|---|---|
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

5. Configure the backend API URL for production.
6. Ensure the backend CORS configuration allows the frontend domain.
7. Deploy the application.

The repository includes a `vercel.json` file for deployment configuration.

---

## 🔒 Security & Best Practices

- Keep `.env` files out of version control.
- Never expose private API keys or server-side secrets in frontend code.
- Use `.env.example` to document required environment variables without including secret values.
- Do not commit `node_modules` or production build output.
- Configure appropriate authentication and authorization checks.
- Use HTTPS for production API communication.
- Keep project dependencies updated.

---

## 👨‍💻 Author

**Pranav A. P.**  
B.Tech — Computer Science and Engineering

- **GitHub:** [@pranavap2026-ship-it](https://github.com/pranavap2026-ship-it)
- **Frontend Repository:** [Revynix-AI](https://github.com/pranavap2026-ship-it/Revynix-AI)
- **Backend Repository:** [Revynix-AI-backend](https://github.com/pranavap2026-ship-it/Revynix-AI-backend)
- **Live Application:** [DevLens AI](https://revynix-ai.vercel.app/)

---

<p align="center">
  <strong>DevLens AI</strong>
  <br />
  Making code review more accessible, understandable, and actionable.
</p>