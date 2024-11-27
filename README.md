# URL Shortener Service

Welcome to the **URL Shortener Service**, a simple yet powerful solution to shorten long URLs and track their usage with detailed analytics.

## Features

- **URL Shortening**: Quickly shorten long URLs into compact links.
- **Redirection**: Automatically redirect users from a short URL to the original.
- **Detailed Analytics**: 
  - Track total clicks.
  - View the last accessed time.
  - Access the visiting history of URLs.

## Tech Stack

- **Backend Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Unique ID Generator**: [Nanoid](https://github.com/ai/nanoid)
- **Environment Management**: [dotenv](https://github.com/motdotla/dotenv)
- **Request Logging**: [Morgan](https://www.npmjs.com/package/morgan)

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Latest version recommended)
- [MongoDB](https://www.mongodb.com/) (Local or cloud instance like MongoDB Atlas)

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/niteshsaini9568/Url-shortner.git
cd url-shortener

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=3000
MONGO_URI= mongodb://127.0.0.1:27017/urlshortner
```

### Step 4: Start the Application

```
nodemon index.js
```

The server will run on `http://localhost:8080`.

---

## API Endpoints

### **Base URL**
All API routes are prefixed with the base URL: `http://localhost:8080`.

### **Endpoints**

#### **1. GET `/`**
Returns a welcome message.

**Response:**
```json
{
  "message": "Welcome to the URL shortener service. You can shorten any URL here."
}
```

#### **2. POST `/shorten`**
Shorten a long URL.

**Request Body:**
```json
{
  "originalUrl": "https://example.com"
}
```

**Response:**
```json
{
  "message": "URL has been successfully shortened!",
  "data": {
    "shortId": "abc12345",
    "shortUrl": "https://url-shortner-peach-nine.vercel.app/abc12345"
  }
}
```

#### **3. GET `/:shortId`**
Redirect to the original URL using the `shortId`.

- **Successful**: Redirects to the original URL.
- **Error**: Returns a 404 if the shortId is invalid or not found.

#### **4. GET `/stats/:shortId`**
Retrieve analytics for a shortened URL.

**Response:**
```json
{
  "message": "URL Stats",
  "data": {
    "originalUrl": "https://example.com",
    "shortUrl": "https://url-shortner-peach-nine.vercel.app/abc12345",
    "clicks": 5,
    "lastAccessed": "Last accessed: 27/11/2024 on 10:30:05",
    "visitingHistory": "URL visiting history: 2024-11-26T15:30:00.000Z, 2024-11-26T16:00:00.000Z"
  }
}
```

---

## Database Model

The URL data is stored in a MongoDB collection with the following schema:

| Field             | Type       | Description                                  |
|--------------------|------------|----------------------------------------------|
| `originalUrl`     | String     | The original URL.                           |
| `shortId`         | String     | Unique identifier for the shortened URL.    |
| `shortUrl`        | String     | Complete shortened URL.                     |
| `clicks`          | Number     | Count of how many times the URL was visited.|
| `lastAccessed`    | Date       | Timestamp of the last visit.                |
| `visitingHistory` | [Date]     | List of all access timestamps.              |

---

## Project Structure

```plaintext
.
├── Models/
│   ├── db.js          # MongoDB connection setup
│   ├── Model.js       # Mongoose schema for URLs
├── Controllers/
│   ├── urlController.js # Logic for handling API routes
├── Routes/
│   ├── urlRoutes.js   # API route definitions
├── index.js           # Main entry point
├── .env               # Environment variables
├── package.json       # Dependencies and scripts
└── README.md          # Documentation
```

---

## Deployment

### Recommended Platforms
- [Vercel](https://vercel.com/)


### Steps
1. Push your code to a GitHub repository.
2. Link your repository to your preferred deployment platform.
3. Add your environment variables to the deployment settings.

---

## Testing

### Locally
- Use [Postman](https://www.postman.com/) or [curl](https://curl.se/) to test the API endpoints.

### Example Commands

#### Shorten a URL:
```bash
curl -X POST http://localhost:8080/shorten -H "Content-Type: application/json" -d '{"originalUrl":"https://example.com"}'
```

#### Get Stats:
```bash
curl -X GET http://localhost:8080/stats/abc12345


### How to Use
- Save this as `README.md` in your repository root.
- Replace placeholders like `your-username`, `https://your-deployment-url.com`, and `your-mongodb-uri` with actual values.
