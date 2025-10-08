# 🚀 Quick Start - Accordion Documentation

Get your Accordion documentation live on GitHub Pages in 5 minutes!

## ⚡ Super Quick Start (3 Steps)

### 1️⃣ Preview Locally (Optional but Recommended)

```bash
cd src/components/Accordion/docs
./preview-docs.sh
```

Choose option 1 (Python), then open http://localhost:8000

### 2️⃣ Push to GitHub

```bash
git add .
git commit -m "Add Accordion component with documentation"
git push origin main
```

### 3️⃣ Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source":
   - Branch: `main`
   - Folder: `/src/components/Accordion/docs`
4. Click **Save**
5. Wait 2-3 minutes
6. Your docs will be live at: `https://yourusername.github.io/rn-heroui/`

**That's it! 🎉**

---

## 📋 What You Got

### Main Files

| File                     | Purpose                                          |
| ------------------------ | ------------------------------------------------ |
| `README.md`              | Complete component documentation (Markdown)      |
| `docs/index.html`        | Beautiful HTML documentation page with dark mode |
| `docs/_config.yml`       | Jekyll configuration for GitHub Pages            |
| `docs/preview-docs.sh`   | Script to preview docs locally                   |
| `DOCUMENTATION_GUIDE.md` | Comprehensive guide for customization            |

### Features Included

✅ **Comprehensive Documentation**

- Installation guide
- Usage examples for all features
- Complete API reference
- TypeScript types
- Accessibility info
- FAQ section

✅ **Beautiful HTML Page**

- Modern gradient design
- Dark mode toggle
- Responsive/mobile-friendly
- Smooth animations
- Auto-renders markdown

✅ **GitHub Pages Ready**

- Jekyll configuration
- SEO optimized
- Sitemap included
- Custom domain support

✅ **Developer Tools**

- Local preview script
- GitHub Actions example
- Deployment guide

---

## 🎨 Quick Customization

### Update Your Info (2 minutes)

**Edit `docs/index.html`** - Find and replace:

```javascript
// Line ~85: Update repository link
href = 'https://github.com/yourusername/rn-heroui';
// Replace 'yourusername' with your GitHub username
```

**Edit `docs/_config.yml`**:

```yaml
repository: yourusername/rn-heroui # Your repo
author: Your Name # Your name
```

---

## 🧪 Test Your Docs

### Checklist

- [ ] Preview works locally (`./preview-docs.sh`)
- [ ] Dark mode toggles ✨
- [ ] All links work 🔗
- [ ] Code blocks render correctly 💻
- [ ] Mobile looks good 📱
- [ ] GitHub links updated 🐙

---

## 🔗 Important Links

After deployment, your docs will be at:

```
https://yourusername.github.io/rn-heroui/
```

Replace `yourusername` with your GitHub username.

---

## 🆘 Need Help?

### Docs Not Loading?

**Check this:**

1. Is GitHub Pages enabled in Settings?
2. Did you select the correct folder (`/src/components/Accordion/docs`)?
3. Wait 5-10 minutes after first enable
4. Check Actions tab for build errors

### Want to Customize?

Read: `DOCUMENTATION_GUIDE.md` for detailed instructions on:

- Changing colors and styling
- Adding analytics
- Custom domains
- Auto-deployment
- And much more!

---

## 💡 Pro Tips

1. **Test locally first** - Always preview before deploying
2. **Use dark mode** - Tests both color schemes
3. **Check mobile view** - Open in browser dev tools
4. **Update examples** - Keep docs in sync with code
5. **Add screenshots** - Visual examples help users

---

## 📱 View on Mobile

After deploying, test on:

- iPhone (Safari)
- Android (Chrome)
- Tablet sizes

The docs are fully responsive! 📐

---

## 🎯 Next Steps

1. ✅ Deploy to GitHub Pages (done?)
2. Share the docs link in your README
3. Add link to package.json
4. Set up auto-deployment (optional)
5. Add Google Analytics (optional)

---

## 🌟 Bonus: Auto-Deployment

Want docs to update automatically on every commit?

```bash
# Copy the workflow file
mkdir -p .github/workflows
cp src/components/Accordion/docs/github-workflow-example.yml \
   .github/workflows/deploy-docs.yml

# Commit and push
git add .github/workflows/deploy-docs.yml
git commit -m "Add auto-deployment for docs"
git push
```

Now every push to main will update your docs! 🚀

---

**You're all set! 🎊**

Your Accordion component now has professional, deployable documentation.

Questions? Check `DOCUMENTATION_GUIDE.md` for detailed help.

---

_Made with ❤️ for React Native developers_
