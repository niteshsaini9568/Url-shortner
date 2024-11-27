URL Shortener Service
This is a Node.js-based URL shortener service. It allows users to convert long URLs into shortened links and provides analytics on their usage, such as the number of clicks and visiting history.

Features
Shorten URLs: Generate a shortened version of a long URL.
Redirection: Redirect users to the original URL using the shortened link.
Analytics: Provides stats like:
Total clicks.
Last accessed time.
Full visit history.
Tech Stack
Backend Framework: Express.js - Fast, unopinionated web framework for Node.js.
Database: MongoDB - NoSQL database to store URL data.
Environment Configuration: dotenv - Loads environment variables from a .env file.
Logging: Morgan - HTTP request logger middleware.
Nanoid: Nanoid - Library to generate unique short IDs.
Prerequisites
Node.js: Install the latest version of Node.js.
MongoDB: Install MongoDB and set up a running instance or use a cloud service like MongoDB Atlas.
Setup
1. Clone the Repository
bash
Copy code
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
2. Install Dependencies
bash
Copy code
npm install
3. Configure Environment Variables
Create a .env file in the root directory with the following contents:

env
Copy code
PORT=3000
MONGO_URI=mongodb+srv://<your-mongodb-uri>
BASE_URL=https://your-deployment-url.com
Replace <your-mongodb-uri> with your MongoDB connection string and https://your-deployment-url.com with your application’s base URL.

4. Run the Server
bash
Copy code
npm start
The server will start running at http://localhost:3000.

API Endpoints
Base URL
All endpoints are prefixed with your application's base URL, e.g., http://localhost:3000.

1. GET /
Description
Displays a welcome message.

Response
json
Copy code
{
  "message": "Welcome to the URL shortener service. You can shorten any URL here."
}
2. POST /shorten
Description
Create a shortened URL.

Request Body
json
Copy code
{
  "originalUrl": "https://example.com"
}
Response
json
Copy code
{
  "message": "URL has been successfully shortened!",
  "data": {
    "shortId": "abc12345",
    "shortUrl": "https://your-deployment-url.com/abc12345"
  }
}
3. GET /:shortId
Description
Redirect to the original URL using the shortId.

Response
Redirects to the original URL.
If not found: Returns a 404 error.
4. GET /stats/:shortId
Description
Get statistics about the shortened URL, including total clicks, last accessed time, and visit history.

Response
json
Copy code
{
  "message": "URL Stats",
  "data": {
    "originalUrl": "https://example.com",
    "shortUrl": "https://your-deployment-url.com/abc12345",
    "clicks": 5,
    "lastAccessed": "Last accessed: 27/11/2024 on 10:30:05",
    "visitingHistory": "URL visiting history: 2024-11-26T15:30:00.000Z, 2024-11-26T16:00:00.000Z"
  }
}
Database Model
The MongoDB schema for storing URL information is defined as follows:

Field	Type	Description
originalUrl	String	The original URL provided by the user.
shortId	String	A unique identifier for the shortened URL.
shortUrl	String	The full shortened URL including base URL.
clicks	Number	Total number of times the URL was accessed.
lastAccessed	Date	Timestamp of the last URL access.
visitingHistory	[Date]	List of timestamps when the URL was accessed.
Code Structure
plaintext
Copy code
.
├── Models/
│   └── db.js          # Database connection setup
│   └── Model.js       # Mongoose schema for URLs
├── Controllers/
│   └── urlController.js # Logic for handling API routes
├── Routes/
│   └── urlRoutes.js   # API routes
├── index.js           # Main application entry point
├── .env               # Environment variables
├── package.json       # Dependencies and scripts
└── README.md          # Documentation
Deployment
You can deploy the service on any cloud hosting provider, such as:

Vercel: Ideal for quick Node.js deployments.
Heroku: Supports Node.js apps with a MongoDB addon.
AWS / DigitalOcean / Google Cloud: For more advanced hosting setups.
Testing
Running the Server Locally
Use tools like Postman or curl to test API endpoints.
Example Requests
Shorten a URL
bash
Copy code
curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d '{"originalUrl":"https://example.com"}'
Get Stats
bash
Copy code
curl -X GET http://localhost:3000/stats/abc12345
Future Improvements
User Authentication: Add user accounts to manage URLs.
Custom Short IDs: Allow users to specify their own short IDs.
Advanced Analytics: Add geographical and device-based insights.
Contributors
Your Name – Your GitHub
