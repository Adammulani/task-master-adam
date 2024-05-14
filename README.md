# Task Master

**Important Note**:------------------- Allow popups in your browser settings to ensure proper functionality of the website.----------------------------------------


## Description

This project is a web application that allows users to manage tasks. It provides features like user authentication, storing data on the cloud, task management, and more.

## API Documentation
https://drive.google.com/file/d/1VI-nX2zGpeQRR01j18eYav48m7_qYLRa/view?usp=drive_link


## Description

This project is a web application that allows users to manage tasks. It provides features like user authentication, storing data on the cloud, task management, and more.


## Technologies Used

- React.js for frontend
- Node.js and Express for backend
- Auth0 for authentication
- Mantine library for form
- MongoDB Atlas for data storage
- JWT token for securely transferring data
- Prisma for database management

- ## Deployed version
- https://task-master-adam-tan.vercel.app/    ## Don't forget to **allow Popup** because it is part of **Auth0 authentication process** else website will not work as you will not be able to login properly


## Project Features

1. **Authentication**: Users can sign up, log in, and log out.
2. **Cloud Data Storage**: Utilizes MongoDB Atlas to store data, ensuring data is accessible across devices.
3. **Protected Routes**: All routes are protected by JWT token.
4. **Route Handling**: Incorrect route access redirects users to the home page.
5. **Responsive Design**: The website is designed to be responsive across devices.
6. **RESTful API**: Provides endpoints to manage tasks.
7. **Task Listing**: Displays a list of all tasks.
8. **Task Details**: Allows users to view details of a single task by clicking on its card.
9. **Favorites**: Users can mark tasks as favorites.
10. **Task Deletion**: Allows users to delete tasks.
11. **Task Editing**: Users can edit existing tasks.
12. **Task Addition**: Users can add new tasks with details like title, task description, deadline (optional), and status (Pending or Completed).
13. **Task Status Update**: Users can update the status of a task as completed.
14. **Search Functionality**: Provides search functionality to find specific tasks based on title or task description.
15. **Favorites Page**: A dedicated page to list all tasks marked as favorites.

## Installation

To clone the git repository to your local machine:
git clone https://github.com/Adammulani/task-master-adam.git

1. Navigate to the client directory and execute the following command to install frontend dependencies:
    ```
    npm install
    ```

2. Navigate to the server directory and execute the following commands to install backend dependencies and set up Prisma:
    ```
    npm install
    npx prisma db push
    npx prisma generate
    ```

3. Configure Auth0 for authentication:
    - Go to the official website of Auth0 (auth0.com), sign up/login, and create a new application.
    - Choose frontend technology for a quickstart guide. Follow the steps in the documentation to connect your application with Auth0. **Documentation** https://auth0.com/docs/quickstarts
    - Create an API on the Auth0 website. Inside the identifier field, provide a unique name. This identifier will be used as the audience parameter for Auth0 configuration in your code.
    - While attempting to login, ensure to allow popups to prevent issues with the website's functionality.

4. Update the `.env` file with your own `DATABASE_URL`. First, create a database in MongoDB Atlas or on your local machine, and remember its password.

## Usage

After completing the installation steps, you can run the application locally to start managing tasks.

## Start the frontend
-cd client
-npm run dev

## Start the backend
-cd server
-npm run start



