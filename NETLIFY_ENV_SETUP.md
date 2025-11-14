# How to Add Environment Variables in Netlify

## Method 1: During Initial Site Setup

When you first deploy your site:

1. **Go to Netlify Dashboard**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"

2. **Connect Your Repository**
   - Select GitHub
   - Authorize Netlify
   - Select `nigerian-food-website` repository

3. **Configure Build Settings**
   - Build command: `npm run build` (auto-detected)
   - Publish directory: `build` (auto-detected)

4. **Click "Show advanced" button**
   - This reveals additional options

5. **Click "New variable" under "Environment variables"**
   - Add each variable one by one

6. **Add Your Environment Variables:**
   
   **Variable 1:**
   - Key: `MONGODB_URI`
   - Value: `mongodb+srv://oduyebojose:Olajumoke_12@cluster0.j3o1i5y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
   - Click "Add variable"

   **Variable 2:**
   - Key: `JWT_SECRET`
   - Value: `your-jwt-secret-key` (replace with your actual secret)
   - Click "Add variable"

   **Variable 3:**
   - Key: `PORT`
   - Value: `5001`
   - Click "Add variable"

   **Variable 4:**
   - Key: `NODE_ENV`
   - Value: `production`
   - Click "Add variable"

7. **Click "Deploy site"**
   - Netlify will build and deploy with these variables

---

## Method 2: Add After Deployment (Site Settings)

If you've already deployed or need to add/update variables:

1. **Go to Netlify Dashboard**
   - Visit [app.netlify.com](https://app.netlify.com)

2. **Select Your Site**
   - Click on your site name (nigerian-food-website)

3. **Go to Site Settings**
   - Click on **"Site configuration"** in the left sidebar
   - Then click **"Environment variables"**

4. **Add New Variable**
   - Click **"Add a variable"** button
   - Enter the key name
   - Enter the value
   - Select the scope:
     - **All scopes** (default) - applies to all deployments
     - **Production** - only for production deployments
     - **Deploy Preview** - only for preview deployments
     - **Branch** - specific branch
   - Click **"Add variable"**

5. **Redeploy Your Site**
   - After adding variables, you need to trigger a new deployment
   - Go to **"Deploys"** tab
   - Click **"Trigger deploy"** → **"Clear cache and deploy site"**
   - OR push a new commit to trigger auto-deployment

---

## Method 3: Using Netlify CLI

1. **Install Netlify CLI** (if not already installed)
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Link Your Site** (if not already linked)
   ```bash
   netlify link
   ```

4. **Set Environment Variables**
   ```bash
   # Add each variable
   netlify env:set MONGODB_URI "mongodb+srv://oduyebojose:Olajumoke_12@cluster0.j3o1i5y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
   
   netlify env:set JWT_SECRET "your-jwt-secret-key"
   
   netlify env:set PORT "5001"
   
   netlify env:set NODE_ENV "production"
   ```

5. **Verify Variables**
   ```bash
   netlify env:list
   ```

6. **Redeploy**
   ```bash
   netlify deploy --prod
   ```

---

## Visual Guide: Step-by-Step Screenshots

### Adding Variables in Site Settings:

1. **Site Dashboard** → Click **"Site configuration"**
2. **Left Sidebar** → Click **"Environment variables"**
3. **Click "Add a variable"** button (top right)
4. **Enter:**
   - **Key:** `MONGODB_URI`
   - **Value:** `mongodb+srv://oduyebojose:Olajumoke_12@cluster0.j3o1i5y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
   - **Scopes:** Leave as "All scopes" (or select specific)
5. **Click "Add variable"**
6. **Repeat** for each variable

---

## Important Notes:

### ⚠️ Security Best Practices:
- **Never commit** `.env` files to Git
- **Never share** your actual secret keys publicly
- Use **strong JWT secrets** (random strings, at least 32 characters)
- **Regenerate secrets** if they're ever exposed

### 🔄 Redeploy After Adding Variables:
- Environment variables are injected at **build time**
- You **must redeploy** after adding/updating variables
- New variables won't take effect until next deployment

### 🎯 Variable Scope:
- **All scopes**: Variables available in all environments
- **Production**: Only in production deployments
- **Deploy Preview**: Only in preview deployments (PR previews)
- **Branch**: Specific git branch

### 🌐 Frontend vs Backend Variables:

**For Backend API (these are for your backend service):**
- `MONGODB_URI` - Backend only
- `JWT_SECRET` - Backend only
- `PORT` - Backend only

**For Frontend (React/Vite):**
- Variables **must be prefixed with `VITE_`** to be accessible in React
- Example: `VITE_API_URL` can be accessed as `import.meta.env.VITE_API_URL`
- Variables without `VITE_` prefix are only available in Node.js build process

**If your backend is deployed separately**, you'll need:
- `VITE_API_URL` = Your deployed backend URL (e.g., `https://your-backend.railway.app`)

---

## Troubleshooting:

### Variables Not Working?
1. ✅ Check spelling (case-sensitive)
2. ✅ Redeploy after adding variables
3. ✅ Check variable scope settings
4. ✅ For frontend: Use `VITE_` prefix
5. ✅ Check build logs for errors

### How to Verify Variables in Build Logs:
1. Go to **Deploys** tab
2. Click on a deployment
3. Click **"Deploy log"**
4. Look for environment variable references (values are hidden for security)

### Update Existing Variables:
1. Go to **Site settings** → **Environment variables**
2. Find the variable
3. Click the **pencil/edit icon**
4. Update the value
5. Save and redeploy

### Delete Variables:
1. Go to **Site settings** → **Environment variables**
2. Find the variable
3. Click the **trash/delete icon**
4. Confirm deletion
5. Redeploy

---

## Quick Reference: Your Variables

```
MONGODB_URI=mongodb+srv://oduyebojose:Olajumoke_12@cluster0.j3o1i5y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-jwt-secret-key
PORT=5001
NODE_ENV=production
```

**Remember:** Replace `your-jwt-secret-key` with your actual secret!

