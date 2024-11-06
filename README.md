Mentor Token Frontend

Production link:
https://mentor-tokent-frontend.vercel.app/

This repository hosts the frontend code for the Mentor Token application, a platform designed to connect startups with mentors and companies. The frontend is built with React and Vite for optimal performance and development speed.

Features

	•	User registration and authentication with protected routes
	•	Role-based dashboards for mentors and companies
	•	Job postings and applications
	•	Interactive UI with responsive design
	•	Integration with the backend for data handling
	•	Password reset functionality with email links

    Technologies

	•	React
	•	Vite (for fast development and bundling)
	•	React Router (for client-side routing)
	•	Axios (for API requests)
	•	CSS and CSS modules (for styling)
	•	Environment Variables using .env for configuration

Getting Started

To set up the project locally, follow these steps:

Prerequisites

Ensure you have Node.js (version 14 or higher) and npm installed on your machine.

Installation

	1.	Clone the repository:
    git clone https://github.com/your-username/mentor-token-frontend.git
cd mentor-token-frontend

	2.	Install dependencies:
    npm install

    Environment Variables

Create a .env file in the root of your project and set the following environment variables:
Contact me at ljochev@gmail.com

Running the App

To start the development server:

npm run dev

Project Structure

Below is an overview of the main folders in the project:
src/
│
├── components/          # Reusable UI components
├── routes/              # React Router route components
├── dashboard/           # Dashboard-specific components for mentors and companies
├── assets/              # Static files like images and fonts
├── styles/              # Global CSS and module styles
└── main.css             # Main stylesheet

Routing

The app uses react-router-dom for client-side routing. Key routes include:

	•	/: Home Page
	•	/about: About Page
	•	/contact: Contact Page
	•	/login: Login Page
	•	/register: Registration Page
	•	/passwordReset: Password reset page with a reset token
	•	/mentorDashboard: Protected route for mentors’ dashboard
	•	/companyDashboard: Protected route for companies’ dashboard

    Note: Routes like /mentorDashboard and /companyDashboard are protected and require user authentication.