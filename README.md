# Nigerian Food Website

This is a code bundle for Website Design. The original project is available at https://www.figma.com/design/1DGOIfo0wc6dLgFTuFH9tj/Website-Design.

## Running the Frontend

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Running the Backend

1. Navigate to backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Copy environment file: `cp .env.example .env`
4. Update `.env` with your MongoDB credentials:
   ```
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   PORT=5000
   ```
5. Optionally seed database: `node seed.js`
6. Start server: `npm run dev`

## Features

- User authentication (register/login)
- Product catalog with search and filtering
- Shopping cart functionality
- Order placement and tracking
- MongoDB integration
- JWT authentication
- Responsive design

## API Integration

The frontend is integrated with the backend API for:
- User authentication
- Product fetching
- Order processing
- Persistent login state