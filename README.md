# Jorge Contreras — Personal Portfolio Website

This is a premium, single-page personal portfolio website for **Jorge Contreras**, built using semantic HTML5, custom vanilla CSS (with CSS variables for light/dark themes, glassmorphism, responsive grids, and micro-animations), and lightweight JavaScript.

## Live Demo & Deployment
You can deploy this site directly on **Render** (free Static Site Hosting) or **GitHub Pages**.

### How to host on Render
1. Create a repository on GitHub (see instructions below).
2. Go to [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** and select **Static Site**.
4. Connect your GitHub account and select this repository.
5. Configuration:
   - **Name**: `jorge-contreras`
   - **Branch**: `main`
   - **Build Command**: *Leave blank* (not required for pure static HTML/CSS/JS)
   - **Publish Directory**: `.` (root directory)
6. Click **Create Static Site**. Render will generate a URL for your site (e.g., `jorge-contreras.onrender.com`) and automatically redeploy whenever you push updates.

---

## File Structure
- `index.html`: Core structure, metadata (SEO), and content.
- `style.css`: Modern visual tokens, dark/light theme properties, mobile-responsive grids, and animations.
- `script.js`: Theme saving & toggling logic, dynamic skills loader, project filtering, scroll-trigger animations, and client-side form feedback.

---

## Getting Started Locally
Simply open the `index.html` file directly in any browser:
```bash
# In Windows Powershell:
Start-Process "index.html"
```
Or use a local server tool (like VS Code Live Server, or Python's HTTP server):
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000`.

---

## Git & GitHub Setup Instructions
Run the following commands inside this directory to upload this to GitHub:

1. Initialize Git repository:
   ```bash
   git init
   ```
2. Stage and commit files:
   ```bash
   git add .
   git commit -m "Initial commit: Jorge Contreras portfolio website"
   ```
3. Link to a remote GitHub repository:
   - Create a new, blank repository on [GitHub](https://github.com/new) (do not add a README, license, or gitignore there).
   - Copy the repository URL (e.g., `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git`).
   - Run:
     ```bash
     git branch -M main
     git remote add origin YOUR_GITHUB_REPO_URL
     git push -u origin main
     ```
