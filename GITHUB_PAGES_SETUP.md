# 📖 GitHub Pages Setup Guide

Quick guide to deploy your Accordion documentation to GitHub Pages.

---

## 🚀 Quick Setup (Recommended - 2 minutes)

### Step 1: Push Your Code

```bash
# Make sure everything is pushed
git push origin main
```

### Step 2: Configure GitHub Pages

1. **Go to your repository settings**:
   - URL: https://github.com/adityakmr7/react-native-heroui/settings/pages

2. **Under "Build and deployment"**:
   - **Source**: Select **"Deploy from a branch"**
   - **Branch**: Select **`main`**
   - **Folder**: Select **`/src/components/Accordion/docs`**

3. **Click "Save"**

### Step 3: Wait and Visit

- Wait 2-3 minutes for deployment
- Visit: https://adityakmr7.github.io/react-native-heroui/
- Your beautiful documentation is now live! 🎉

---

## ❓ What GitHub Does Automatically

When you select "Deploy from a branch":
- ✅ Detects `_config.yml` (Jekyll config)
- ✅ Builds with Jekyll automatically
- ✅ Serves your `index.html` as the homepage
- ✅ Handles markdown rendering
- ✅ Updates on every push to main

**No workflow file needed!**

---

## 🔄 If You See "Configure Workflow" Page

If GitHub shows you workflow options:

1. **Click the browser back button**
2. **Or close that page**
3. **Go directly to**: Settings → Pages
4. **Select "Deploy from a branch"** (as described above)

You can add a workflow later if you want automation.

---

## 🧪 Testing Your Deployment

### Check Build Status

1. Go to: https://github.com/adityakmr7/react-native-heroui/actions
2. You should see a "pages build and deployment" action running
3. Wait for the green checkmark ✅

### Access Your Docs

Once deployed (2-3 minutes):
- **URL**: https://adityakmr7.github.io/react-native-heroui/
- **Features**:
  - Dark mode toggle 🌙
  - Responsive design 📱
  - Auto-renders README.md 📄
  - Smooth navigation ⚡

---

## 🎨 What You'll See

Your documentation includes:
- Beautiful gradient header
- Component overview
- Installation guide
- Usage examples (15+)
- API reference
- All 4 Accordion variants
- Dark mode support

---

## ✅ Verification Checklist

After setup:
- [ ] Pushed code to GitHub
- [ ] Selected "Deploy from a branch"
- [ ] Selected `main` branch
- [ ] Selected `/src/components/Accordion/docs` folder
- [ ] Clicked Save
- [ ] Waited 2-3 minutes
- [ ] Visited docs URL
- [ ] Dark mode toggle works
- [ ] All examples visible

---

## 🐛 Troubleshooting

### "404 - Page Not Found"

**Wait longer**: First deployment can take 5-10 minutes

**Check Actions**:
- Go to: Actions tab
- Look for errors in "pages build and deployment"

**Verify Settings**:
- Settings → Pages
- Source should be "Deploy from a branch"
- Branch should be `main`
- Folder should be `/src/components/Accordion/docs`

### "Page Shows But Broken"

**Check browser console** (F12):
- Look for errors loading README.md
- May need to adjust path in index.html

**Clear cache**:
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### "Content Not Updating"

**Force rebuild**:
```bash
# Make a small change and push
git commit --allow-empty -m "Trigger rebuild"
git push origin main
```

---

## 🔄 Advanced: GitHub Actions (Optional)

If you want automatic deployment on every push:

### Step 1: Create Workflow File

Already exists at: `.github/workflows/deploy-docs.yml`

### Step 2: Change Source

1. Go to Settings → Pages
2. **Source**: Change to **"GitHub Actions"**
3. Save

### Step 3: Push

```bash
git push origin main
```

The workflow will automatically:
- Build on every push
- Deploy to GitHub Pages
- Show progress in Actions tab

---

## 📊 After Deployment

### Update Your README

Add this to your main README.md:

```markdown
## 📖 Documentation

View the complete documentation at: https://adityakmr7.github.io/react-native-heroui/
```

### Share Your Docs

- Add to package.json homepage
- Share on social media
- Add to README badges
- Submit to component directories

---

## 🎯 Quick Commands

```bash
# Check what's deployed
git ls-remote --heads origin main

# View in browser (Mac)
open https://adityakmr7.github.io/react-native-heroui/

# View in browser (Linux)
xdg-open https://adityakmr7.github.io/react-native-heroui/

# Force rebuild
git commit --allow-empty -m "Rebuild docs"
git push origin main
```

---

## ✨ You're Done!

Your Accordion documentation is now:
- ✅ Live on the web
- ✅ Professionally styled
- ✅ Mobile responsive
- ✅ Dark mode enabled
- ✅ Easy to share

**Visit**: https://adityakmr7.github.io/react-native-heroui/

---

**Need help?** Check the Actions tab for build logs or open an issue.

**Enjoy your beautiful docs! 🎉**

