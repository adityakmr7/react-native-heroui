# 📖 GitHub Pages Setup

Quick guide to deploy the complete documentation site.

## 🚀 Deployment Steps

### Method 1: Deploy from Branch (Easiest)

1. **Go to your repository on GitHub**:
   - Navigate to: https://github.com/adityakmr7/react-native-heroui/settings/pages

2. **Under "Build and deployment"**:
   - **Source**: Select **"Deploy from a branch"**
   - **Branch**: Select **`main`**
   - **Folder**: Select **`/docs`**
   - Click **"Save"**

3. **Wait 2-3 minutes**, then visit:
   - https://adityakmr7.github.io/react-native-heroui/

### Method 2: GitHub Actions (Automated)

1. **Update the workflow file** at `.github/workflows/deploy-docs.yml`:
   - Change `source: ./src/components/Accordion/docs`
   - To: `source: ./docs`

2. **Go to Settings → Pages**:
   - **Source**: Select **"GitHub Actions"**
   - Save

3. **Push your code**:

   ```bash
   git add .
   git commit -m "docs: add complete documentation site"
   git push origin main
   ```

4. Docs will auto-deploy on every push!

---

## ✨ What's Included

Your documentation site now includes:

### Main Pages

- **index.html** - Beautiful homepage with all components
- **README.md** - Quick start guide

### Component Documentation (9 components)

Each with comprehensive docs:

- ✅ Accordion
- ✅ Button
- ✅ Input
- ✅ Card
- ✅ Avatar
- ✅ Badge
- ✅ Chip
- ✅ Switch

### Features

- 🎨 Dark mode toggle
- 📱 Mobile responsive
- 🔍 Clean navigation
- ⚡ Fast loading
- 📖 Markdown-based docs
- 🎭 Beautiful UI

---

## 🧪 Local Preview

```bash
cd docs
python3 -m http.server 8000
# Visit: http://localhost:8000
```

---

## 📝 Adding New Components

When you add a new component:

1. **Create markdown file**:

   ```bash
   docs/components/newcomponent.md
   ```

2. **Generate HTML page**:

   ```bash
   cp docs/components/_template.html docs/components/newcomponent.html
   # Then replace COMPONENT_NAME, COMPONENT_ICON, etc.
   ```

3. **Add to index.html**:
   - Add a new card in the component grid

4. **Push changes** - done!

---

## 🎯 Your Documentation URL

After deployment:
**https://adityakmr7.github.io/react-native-heroui/**

---

**All set! Your comprehensive docs are ready to deploy! 🚀**
