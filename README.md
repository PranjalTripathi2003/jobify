# Jobify 

Jobify is a full-stack web application designed to streamline job tracking and management. Built with the MERN stack (MongoDB, Express.js, React.js, and Node.js), this project offers a modern, responsive, and user-friendly experience for managing job applications and related data.

---

## Features

- **User Authentication**: Secure login and registration system.
- **Job Management**: Add, update, delete, and filter job applications.
- **Dynamic Dashboard**: Visualize job application stats through interactive charts.
- **Search and Filter**: Filter jobs based on type, status, and date.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
- **Role-Based Access**: Handle user data securely.

---

## Tech Stack

### Frontend
- **React.js**: A modern JavaScript library for building user interfaces.
- **Redux Toolkit**: State management simplified with Redux logic.
- **React Router**: For dynamic routing.
- **Chart.js**: For visualizing data.
- **Styled Components**: For styling components.

### Backend
- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Framework for handling API endpoints.
- **MongoDB**: Database for storing application data.
- **Mongoose**: ODM for MongoDB.
- **JWT**: Secure token-based authentication.
- **bcrypt.js**: Password hashing for enhanced security.
- **Cloudinary**: Cloud-based media management solution for storing, optimizing, and delivering images and videos efficiently.

---

## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/PranjalTripathi2003/jobify.git
   ```
2. Navigate to the project directory:
   ```bash
   cd mern-jobify-v2
   ```
3. Install dependencies for both client and server:
   ```bash
   npm install
   cd client && npm install
   ```
4. Set up environment variables:
   Create a `.env` file in the root and add the following:
   ```env
   MONGO_URI=<YoNODE_ENV=development
   PORT=your_port_here
   MONGO_URL=your_mongo_connection_string_here
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRES_IN=your_jwt_expiry_here
   CLOUD_NAME=your_cloud_name_here
   CLOUD_API_KEY=your_cloud_api_key_here
   CLOUD_API_SECRET=your_cloud_api_secret_here

   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

---

## Scripts

### Backend
- **`npm start`**: Start the backend server.
- **`npm run dev`**: Start the server in development mode.

### Frontend
- **`npm start`**: Start the React app.
- **`npm run build`**: Build the production-ready app.

---

## Project Structure

```
mern-jobify-v2/
├── client/          # React frontend
├── controllers/     # Backend controllers
├── models/          # Mongoose schemas
├── routes/          # API routes
├── utils/           # Helper functions
├── middleware/      # Middleware for request handling
└── server.js        # Main server file
```

---

## Usage
1. Register or log in to the application.
2. Add, edit, or delete jobs from your dashboard.
3. Use the filtering options to find specific job applications.
4. View application statistics on the dashboard.

---

## Contributions
Contributions are welcome! Feel free to open an issue or submit a pull request for any bugs or feature requests.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments
Special thanks to [John Smilga](https://github.com/john-smilga) for this excellent project. Check out the original repository [here](https://github.com/john-smilga/mern-jobify-v2).

