# Scalable Backend Service

## Description

This project is a scalable and cloud-deployable backend service that authenticates users to our target web app. It consists of two main components: the backend service located in the `/backend` directory and the frontend React web app located in the `/my-react-app` directory.

The backend service is containerized using Docker for easy deployment and is also [hosted](http://scalablebackendservice-env-2.eba-94xqkp3a.us-west-2.elasticbeanstalk.com) on AWS Elastic Beanstalk, which provides capacity provisioning, load balancing, and auto scaling to the application.

The service is tested with Jest, a JavaScript testing framework. Additionally, a CI/CD pipeline is set up through GitHub Actions to automate Jest testing and deployment to AWS Elastic Beanstalk on a push to the GitHub repository.

## Customer Facing Features

- **Home Page:** Clear UI that directs users to either register or login.
- **Register Users:** Register new users with a new account.
- **Login Existing Users:** Login existing users to their account.
- **Profile Page:** Displays a welcome message to an authenticated user.

## REST API

The backend service provides a REST API for interacting with the application. Here are the available endpoints:

- `/api/register` - POST request to register a new user.
- `/api/login` - POST request to login an existing user.

You can use tools like Postman or cURL to test these endpoints.

## Technologies Used

- **Frontend UI (`/my-react-app`):** React, JSON Web Token, Material UI.
- **Backend Service (`/backend`):** Node.js, MongoDB, Jest Testing Framework, JSON Web Token, Bcrypt Password Hash, Express.
- **CI/CD:** Docker, GitHub Actions.
- **Cloud-specific:** AWS Elastic Beanstalk (Amazon EC2).
- **Security-specific:** AWS Certificate Manager to generate a SSL certificate to securely transfer data via HTTPS (validation pending).

## Service Installation

1. Clone the repository: `git clone https://github.com/Will-Hsu/backend-service.git`
2. Change directory: `cd backend`
3. Install dependencies: `npm install`

## Service Usage

1. Start the server: `npm start`
2. Access the service at `http://localhost:5000`
3. Run the Jest unit tests: `npm test`

## UI Web App Installation and Usage

1. Ensure the backend service is running and open a new terminal window
2. Change directory: `cd my-react-app`
3. Install dependencies: `npm install --openssl-legacy-provider`
4. Access the application at `http://localhost:3000`

## Contact

For any questions or feedback, please contact me at [tb950110@gmail.com](mailto:tb950110@gmail.com).
