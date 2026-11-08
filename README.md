
DevLens AI — Frontend
<p align="center"> <strong>AI-Powered Code Review Platform</strong><br /> Review source code, identify potential issues, and get actionable improvement suggestions. </p><p align="center"> <a href="https://revynix-ai.vercel.app/">Live Application</a> · <a href="https://github.com/pranavap2026-ship-it/Revynix-AI-backend">Backend Repository</a> </p>
Overview
DevLens AI is a web-based AI-assisted code review platform. It helps developers inspect source code and understand potential improvements through structured feedback, including possible bugs, security concerns, performance issues, code-quality recommendations, and refactoring suggestions.

This repository contains the client-side application, built with React and Vite. It provides the user interface for authentication, code submission, AI review results, review history, user profiles, and administration. The frontend communicates with the separate DevLens AI backend through an API service.

Live Demo
https://revynix-ai.vercel.app/

The application requires the backend API to be available and correctly configured.

Features
AI code review interface — submit source code for AI-powered analysis.
Code editor — edit and prepare code for review using the Monaco Editor integration.
Review results — inspect structured feedback and recommendations returned by the backend.
Review history — revisit previous code reviews.
Review details — open an individual review and examine its analysis.
Dashboard — view the user's review activity and related information.
Authentication — register, log in, and access protected application pages.
Protected routes — restrict authenticated and administrative pages.
Admin panel — provide an administrative interface for platform management.
Profile management — view and manage user profile information.
Responsive layout — support desktop and mobile browsing.
Theme controls — switch the application's visual theme.
Reusable UI components — shared navigation, sidebar, loading, toast, score, and review components.
Technology Stack
Area	Technologies
Frontend framework	React
Build tool	Vite
Routing	React Router
Code editor	Monaco Editor
API communication	Axios
Styling	CSS, Tailwind CSS
Animation	Framer Motion
Icons	React Icons
Notifications	React Hot Toast
PDF/export utilities	jsPDF, html2canvas
Deployment	Vercel
Refer to package.json for the exact dependency versions and available npm scripts.

Project Structure
client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AdminRoute.jsx
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
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   ├── layouts/
│   │   └── DashboardLayout.jsx
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
│   ├── services/
│   ├── utils/
│   │   ├── api.js
│   │   ├── helpers.js
│   │   └── pdfExport.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
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
The tree highlights the files visible in the supplied project structure. Additional files may exist in folders such as services, assets, and public.

Getting Started
Prerequisites
Node.js (LTS recommended)
npm
A running DevLens AI backend API
1. Clone the frontend repository
git clone <YOUR-FRONTEND-REPOSITORY-URL>
cd <YOUR-FRONTEND-REPOSITORY-FOLDER>
2. Install dependencies
npm install
3. Configure the API URL
Create a local .env file in the client directory and configure the API base URL expected by src/utils/api.js.

For example, if the API service reads VITE_API_URL:

VITE_API_URL=http://localhost:5000/api
Use the exact variable name and URL format expected by your src/utils/api.js implementation. For production, set it to your deployed backend API URL.

Security: Vite exposes variables prefixed with VITE_ in the browser bundle. Do not put database credentials, private API keys, JWT signing secrets, or other server-side secrets in frontend environment variables.

4. Start the development server
npm run dev
Vite prints the local development URL in the terminal (commonly http://localhost:5173).

5. Build for production
npm run build
To preview the production build locally:

npm run preview
Backend Integration
The frontend communicates with the separate backend repository:

DevLens AI Backend

The backend is responsible for server-side operations such as authentication, authorization, database access, and AI code-review processing. The frontend API configuration is maintained in:

src/utils/api.js
Check that file for the actual API base URL, request configuration, and token handling used by this client.

Deployment
The frontend is deployed on Vercel.

For deployment:

Import the frontend repository into Vercel.
Set the project root to the frontend repository root.
Configure the frontend API environment variable to point to the deployed backend.
Use npm run build as the build command.
Use dist as the output directory.
Configure the backend CORS policy to allow the deployed frontend domain.
The repository includes a vercel.json file for deployment configuration.

Security and Repository Hygiene
Keep .env files out of Git.
Commit a sanitized .env.example only if the project needs to document environment-variable names.
Never store server secrets in frontend code.
Do not commit node_modules, build output, or local editor files.
Use HTTPS for production API communication.
Author
Pranav A. P.
B.Tech — Computer Science and Engineering

GitHub: @pranavap2026-ship-it
Live Project: DevLens AI
Backend Repository: Revynix-AI-backend
DevLens AI — making code review more accessible, understandable, and actionable.

