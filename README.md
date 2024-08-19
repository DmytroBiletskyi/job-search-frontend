# Job Search Frontend

This repository contains the frontend for a Job Search application. The frontend is built using **Next.js** with **TypeScript** and **Tailwind CSS**, providing a responsive and dynamic interface for users to search for jobs, manage their profiles, and interact with job listings.

## Overview

The Job Search Frontend is the client-side application that interacts with the Job Search Backend. It provides a user-friendly interface for job search, profile management, and viewing job details. The application is designed using Next.js for server-side rendering, ensuring fast load times and SEO optimization.

## Key Directories

- **`app/`**: Contains the App Router pages and layout for the application.
- **`components/`**: Reusable components like buttons, forms, modals, etc.
- **`services/`**: Handles API requests and data fetching logic.
- **`styles/`**: Includes global styles and Tailwind CSS configurations.
- **`utils/`**: Utility functions for handling common tasks.

## Technologies Used

- **Next.js**: A React framework with built-in support for server-side rendering and static site generation.
- **TypeScript**: Strongly typed JavaScript for improved developer experience.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Axios**: Promise-based HTTP client for making API requests.
- **Formik & Yup**: Form handling and validation libraries.
- **JWT**: JSON Web Tokens for handling authentication.

## Pages

- **`/jobs`**: The main job search page where users can search and filter job listings.
- **`/jobs-details/[id]`**: The job details page, displaying detailed information about a specific job.
- **`/profile`**: The user's profile page where they can manage their personal information.
- **`/liked`**: A page displaying the jobs liked by the user.
- **`/login`**: The login page for user authentication.
- **`/create-profile`**: The registration page for new users.

## Setup and Installation

To set up the project locally, follow these steps:

### Clone the repository:
```bash
git clone https://github.com/DmytroBiletskyi/job-search-frontend.git
cd job-search-frontend
```
### Install dependencies:

```bash
npm install
```
### Run the development server:
```bash
npm run dev
```