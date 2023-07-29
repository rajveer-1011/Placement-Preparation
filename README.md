# :rocket: Placement-Preparation using MERN Stack 
Welcome to the Placement Preparation Project! This project is built using the MERN stack (MongoDB, Express, React, Node.js) and Bootstrap as the frontend framework. It aims to provide a comprehensive platform for students to prepare for placements. The project includes various features, such as blog post creation, roadmaps, courses, student forums, online IDE powered by Programmiz, resources, previous paper tab, user management, JWT token authentication, and file upload to Firebase Cloud Storage. Below is a detailed guide on how to set up the project and an overview of its features.
***
## :wrench: Tech Stack
The project is built using the following technologies:
- MongoDB: A NoSQL database used for storing various data related to users, blog posts, roadmaps, courses, etc.
- Express: A backend web framework for Node.js that handles server-side operations and API management.
- React.js: A frontend library for building user interfaces, responsible for the application's client side.
- Node.js: A JavaScript runtime environment used to execute server-side code.
- Bootstrap: A popular frontend framework for building responsive and visually appealing user interfaces.
***
## :dart: Features
### 1. Blog Post
Admins & Coordinators can create, update, and delete blog posts related to placement preparation. These blog posts can include personal experiences, interview tips, and other relevant content that can benefit other students.

### 2. Courses
Admins & Coordinators can add information about relevant online courses, tutorials, or video lectures that can assist others in their placement preparation.

### 3. Roadmaps
Roadmaps provide a structured path for students to follow during their preparation journey. Users can create and share their preparation roadmaps, including topics to cover, resources to use, and milestones to achieve.

### 4. Student Forums
The platform includes student forums where users can ask questions, seek advice, and share knowledge with their peers regarding placement preparation.

### 5. Online IDE of Programmiz
The integrated online IDE powered by Programmiz allows users to practice coding problems, algorithms, and data structures directly on the platform.

### 6. Resources
This section contains a curated list of resources, including useful websites, blogs, study materials, and more, to aid students in their preparation.

### 7. Previous Year Papers Tab
The previous paper tab offers access to previous years' placement papers and interview experiences shared by other users. It helps students familiarize themselves with the recruitment process of various companies.

### 8. User Management
The platform includes user authentication and authorization mechanisms using JWT tokens to manage user access, and security, and the admin can delete users or update a user role to the coordinator. 

### 9. File Upload to Firebase Cloud Storage
Users can upload files, such as their resumes or other relevant documents, to Firebase Cloud Storage for safe and efficient storage.
***
## :computer: Installation
To set up the Placement Preparation Project locally, follow these steps:

- Clone the repository: 
  ```sh
  git clone https://github.com/rajveer-1011/Placement-Preparation.git
  ```
- Navigate to the project directory: 
  ```sh
  cd placement-preparation-project
  ```
- Install server dependencies: 
  ```sh
  cd backend && npm install
  ```
- Install client dependencies:
  ```sh
  cd frontend && npm install
  ```
- Run the MongoDB server (ensure MongoDB is installed locally)
- Create a .env file in the server directory and set your environment variables (e.g., database connection string, JWT secret, Firebase configuration, etc.).
- Start the server:
  ```sh
  cd backend && npm start
  ```
- Start the client:
  ```sh
  cd frontend && npm start
  ```
:tada: Now, you should have the Placement Preparation Project up and running locally!
***
:star2: Thank you for using the Placement Preparation Project. We hope it aids you in your preparation journey and wish you the best of luck for your placements! If you have any questions or feedback, please feel free to reach out to me. Happy learning! :star2:
