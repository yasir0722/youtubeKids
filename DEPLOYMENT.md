# YouTube Kids App - GitHub Pages Deployment

## 🚀 Live Demo
Your app will be available at: **https://yasir0722.github.io/youtubeKids**

## 📦 Deployment Setup

### Method 1: Automatic Deployment (Recommended)
GitHub Actions will automatically deploy your app when you push to the main branch.

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Add YouTube Kids app with dark mode"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository settings
   - Scroll to "Pages" section
   - Set source to "Deploy from a branch"
   - Select "gh-pages" branch
   - Click Save

3. **Wait for deployment** (usually 2-5 minutes)

### Method 2: Manual Deployment
If you prefer to deploy manually:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

## 🔧 Configuration Details

### Vite Configuration
- **Base path:** `/youtubeKids/` (matches your repository name)
- **Build output:** `dist/` directory
- **Assets:** Properly configured for GitHub Pages

### GitHub Actions Workflow
- **Trigger:** Pushes to main branch
- **Node version:** 18
- **Build command:** `npm run build`
- **Deploy target:** `gh-pages` branch

## 📋 Deployment Checklist

- ✅ Added `gh-pages` package
- ✅ Updated `package.json` with homepage and deploy script
- ✅ Configured Vite for GitHub Pages base path
- ✅ Created GitHub Actions workflow
- ✅ Ready for deployment

## 🌐 After Deployment

Once deployed, your app will have:
- **🎬 YouTube video player** from Google Sheets
- **🌙 Dark/Light mode toggle**
- **📱 Responsive design** for all devices
- **⚡ Fast loading** with Vite optimization

## 🔄 Updates

To update your deployed app:
1. Make changes to your code
2. Commit and push to main branch
3. GitHub Actions will automatically redeploy

## 🛠️ Troubleshooting

**Build fails?**
- Check that all dependencies are installed
- Verify your code has no syntax errors
- Check the Actions tab for detailed error logs

**App doesn't load?**
- Ensure GitHub Pages is enabled in repository settings
- Check that the base path in `vite.config.js` matches your repo name
- Wait a few minutes for DNS propagation
