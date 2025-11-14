# Netlify Deployment Guide - Nigerian Food Website

This guide will help you deploy your Nigerian Food Website to Netlify.

**Repository:** https://github.com/Sopejohn/nigerian-food-website.git

## Prerequisites

1. A Netlify account (sign up at [netlify.com](https://netlify.com))
2. Your code pushed to the GitHub repository
3. Environment variables ready

## Deployment Steps

### 1. Push Your Code to GitHub

Make sure your code is committed and pushed to your repository:

```bash
git add .
git commit -m "Add Netlify deployment configuration"
git push origin main
```

### 2. Deploy to Netlify via Dashboard

1. **Go to Netlify Dashboard**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"

2. **Connect Your Repository**
   - Select GitHub as your Git provider
   - Authorize Netlify to access your repositories
   - Select the `nigerian-food-website` repository

3. **Configure Build Settings**
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
   - These are already configured in `netlify.toml`, so Netlify should detect them automatically

4. **Add Environment Variables**
   - Click "Show advanced" → "New variable"
   - Add each of the following environment variables:

   ```
   MONGODB_URI=mongodb+srv://oduyebojose:Olajumoke_12@cluster0.j3o1i5y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=your-jwt-secret-key
   PORT=5001
   NODE_ENV=production
   ```

   **Note:** These variables are for your backend API. Since your backend is separate, you may need to:
   - Deploy the backend separately (Railway, Render, Heroku, etc.)
   - Update your frontend API URL to point to your deployed backend
   - Use `VITE_API_URL` in Netlify if you need to pass the backend URL to your frontend

5. **Deploy**
   - Click "Deploy site"
   - Netlify will build and deploy your application

### 3. Deploy via Netlify CLI (Alternative)

Alternatively, you can deploy using the Netlify CLI:

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init
netlify deploy --prod
```

## Environment Variables

Add these environment variables in Netlify Dashboard:
- Go to **Site settings** → **Environment variables**

### Required Variables:

- `MONGODB_URI` - Your MongoDB connection string (for backend API)
- `JWT_SECRET` - Your JWT secret key for authentication (for backend API)
- `PORT` - Port number (typically 5001, but Netlify handles this automatically for frontend)
- `NODE_ENV` - Set to `production` for production builds

**Frontend Environment Variables:**
If you need to pass the backend API URL to your frontend, prefix with `VITE_`:
- `VITE_API_URL` - Your deployed backend API URL (e.g., `https://your-backend-api.railway.app`)

**Note:** Environment variables without the `VITE_` prefix are only available in Node.js/server-side code. For React/Vite, use `VITE_` prefix and access via `import.meta.env.VITE_API_URL`.

## Backend Deployment

Your backend (MongoDB, JWT) needs to be deployed separately:

### Option 1: Railway (Recommended)
1. Go to [railway.app](https://railway.app)
2. Create a new project
3. Connect your GitHub repository (select the backend folder)
4. Add environment variables (MONGODB_URI, JWT_SECRET, PORT)
5. Deploy

### Option 2: Render
1. Go to [render.com](https://render.com)
2. Create a new Web Service
3. Connect your repository
4. Set build command: `cd backend && npm install`
5. Set start command: `cd backend && npm start`
6. Add environment variables
7. Deploy

### Option 3: Heroku
1. Go to [heroku.com](https://heroku.com)
2. Create a new app
3. Connect your GitHub repository
4. Add environment variables in Config Vars
5. Deploy

After deploying your backend, update your frontend to use the backend URL:
- Add `VITE_API_URL` environment variable in Netlify
- Update your `src/services/api.ts` to use `import.meta.env.VITE_API_URL`

## Post-Deployment

1. **Custom Domain** (Optional)
   - Go to **Domain settings** → **Add custom domain**
   - Follow Netlify's instructions to configure DNS

2. **SSL Certificate**
   - Netlify automatically provisions SSL certificates
   - Your site will be accessible via HTTPS

3. **Continuous Deployment**
   - Every push to your main branch will automatically trigger a new deployment
   - Deploy previews are created for pull requests

## Troubleshooting

### Build Fails
- Check the build logs in Netlify Dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version (set to 20 in `netlify.toml`)
- Make sure `public/_redirects` file exists for SPA routing

### Environment Variables Not Working
- Make sure variables are set in Netlify Dashboard
- For frontend access, prefix with `VITE_`
- Redeploy after adding new environment variables
- Backend env vars won't work in frontend - deploy backend separately

### Routes Not Working (404 Errors)
- The `_redirects` file handles SPA routing
- Ensure `_redirects` is in the `public/` folder
- Verify the redirect is working in Netlify logs

### Backend API Not Connecting
- Deploy your backend separately (see Backend Deployment section)
- Add `VITE_API_URL` environment variable in Netlify
- Update your API service to use the environment variable
- Check CORS settings on your backend to allow requests from your Netlify domain

## Project Structure

```
nigerian-food-website/
├── backend/          # Backend API (deploy separately)
├── src/             # Frontend React code
├── public/          # Static files (includes _redirects)
├── netlify.toml     # Netlify configuration
└── package.json     # Frontend dependencies
```

## Support

For more help:
- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Community](https://answers.netlify.com)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

