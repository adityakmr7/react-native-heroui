# 🚀 Complete Deployment Guide

This guide covers deploying `react-native-heroui` to NPM and documentation to GitHub Pages.

---

## 📦 NPM Publishing

### Prerequisites

- [x] NPM account created
- [x] Access to publish `react-native-heroui` package
- [x] Git repository up to date

### Quick Publish

```bash
# 1. Ensure everything is committed
git status

# 2. Login to NPM (one-time setup)
npm login

# 3. Test the build
yarn prepare

# 4. Publish (automatic versioning)
yarn release

# OR manual publish
npm publish
```

### Your Package Info

- **Name**: `react-native-heroui`
- **Version**: `0.1.0` (will auto-increment)
- **Registry**: https://registry.npmjs.org/
- **Public URL**: https://www.npmjs.com/package/react-native-heroui

### Installation for Users

```bash
npm install react-native-heroui
# or
yarn add react-native-heroui
# or
pnpm add react-native-heroui
```

---

## 📖 GitHub Pages Deployment

### Method 1: Manual Setup (Easiest)

1. **Push your code to GitHub**:

   ```bash
   git add .
   git commit -m "Add Accordion component with docs"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to: https://github.com/adityakmr7/react-native-heroui/settings/pages
   - Source: `main` branch
   - Folder: `/src/components/Accordion/docs`
   - Click **Save**

3. **Access your docs**:
   - URL: https://adityakmr7.github.io/react-native-heroui/
   - Ready in 2-3 minutes

### Method 2: Automated with GitHub Actions (Recommended)

A GitHub Actions workflow has been created at `.github/workflows/deploy-docs.yml`.

**Features**:

- ✅ Auto-deploys on every push to main
- ✅ Only rebuilds when Accordion docs change
- ✅ Manual trigger available

**To activate**:

1. Commit the workflow file:

   ```bash
   git add .github/workflows/deploy-docs.yml
   git commit -m "Add automated documentation deployment"
   git push origin main
   ```

2. Enable GitHub Pages in Settings (one-time):
   - Go to Settings → Pages
   - Source: "GitHub Actions"
   - Save

3. Done! Docs auto-update on every push.

---

## 🔄 Release Workflow

### For New Features/Fixes

```bash
# 1. Make your changes
# Edit src/components/...

# 2. Build and test
yarn prepare
yarn test
yarn typecheck

# 3. Commit with conventional commits
git add .
git commit -m "feat: add new component"
# or
git commit -m "fix: resolve styling issue"

# 4. Push
git push origin main

# 5. Release (handles versioning + npm publish + git tag)
yarn release
```

### Version Bumping

The `release-it` tool automatically handles versioning based on commits:

- `feat:` → Minor version bump (0.1.0 → 0.2.0)
- `fix:` → Patch version bump (0.1.0 → 0.1.1)
- `BREAKING CHANGE:` → Major version bump (0.1.0 → 1.0.0)

---

## 📋 Pre-Deployment Checklist

### Before Publishing to NPM

- [ ] All tests pass: `yarn test`
- [ ] TypeScript compiles: `yarn typecheck`
- [ ] Linting passes: `yarn lint`
- [ ] Build succeeds: `yarn prepare`
- [ ] Example app runs: `yarn example`
- [ ] README is up to date
- [ ] CHANGELOG is updated (auto with release-it)
- [ ] Version number is correct

### Before Deploying Docs

- [ ] Preview docs locally: `cd src/components/Accordion/docs && ./preview-docs.sh`
- [ ] All links work
- [ ] Code examples are correct
- [ ] Dark mode works
- [ ] Mobile responsive
- [ ] Update any placeholder links (yourusername → adityakmr7)

---

## 🔗 Important Links After Deployment

### NPM Package

- **Homepage**: https://www.npmjs.com/package/react-native-heroui
- **Download Stats**: https://npm-stat.com/charts.html?package=react-native-heroui

### GitHub Pages

- **Documentation**: https://adityakmr7.github.io/react-native-heroui/
- **Repository**: https://github.com/adityakmr7/react-native-heroui

### Badges for README

Add these to your README.md:

```markdown
[![npm version](https://badge.fury.io/js/react-native-heroui.svg)](https://www.npmjs.com/package/react-native-heroui)
[![npm downloads](https://img.shields.io/npm/dm/react-native-heroui.svg)](https://www.npmjs.com/package/react-native-heroui)
[![license](https://img.shields.io/npm/l/react-native-heroui.svg)](https://github.com/adityakmr7/react-native-heroui/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/adityakmr7/react-native-heroui.svg?style=social)](https://github.com/adityakmr7/react-native-heroui)
```

---

## 🎯 Post-Deployment Tasks

### After NPM Publish

1. **Test installation**:

   ```bash
   npx create-expo-app test-app
   cd test-app
   npm install react-native-heroui
   ```

2. **Update main README** with installation instructions

3. **Share on social media**:
   - Twitter/X
   - Reddit (r/reactnative)
   - Dev.to
   - Product Hunt

### After GitHub Pages Deploy

1. **Add link to package.json**:

   ```json
   {
     "homepage": "https://adityakmr7.github.io/react-native-heroui/"
   }
   ```

2. **Update repository description** on GitHub

3. **Add topics** to repository:
   - react-native
   - ui-components
   - accordion
   - heroui
   - typescript

---

## 🐛 Troubleshooting

### NPM Publish Issues

**Error: Package already exists**

- Version number needs to be incremented
- Run: `yarn release` to auto-increment

**Error: Not logged in**

```bash
npm logout
npm login
```

**Error: No permission**

- Ensure you own the package name
- Or request access from owner

### GitHub Pages Issues

**404 Error**

- Wait 5-10 minutes after first deploy
- Check Actions tab for build errors
- Verify correct folder is selected

**Styling broken**

- Check browser console for errors
- Verify CDN links are accessible
- Clear browser cache

**Content not updating**

- Force a rebuild by making a commit
- Or trigger manual workflow in Actions tab

---

## 📊 Monitoring

### NPM Package

Monitor your package stats:

- **Download counts**: https://npm-stat.com/
- **Bundle size**: https://bundlephobia.com/package/react-native-heroui
- **Type coverage**: Check TypeScript definitions

### GitHub Pages

Monitor documentation:

- **Traffic**: GitHub Insights → Traffic
- **Analytics**: Add Google Analytics to docs/\_config.yml
- **Search Console**: Submit sitemap.xml

---

## 🔄 Update Workflow

### When you add new components

1. **Add component** to `src/components/`
2. **Export** from `src/index.tsx`
3. **Build**: `yarn prepare`
4. **Test**: Add to example app
5. **Document**: Create README.md
6. **Commit & Release**: `yarn release`

### When you update existing components

1. **Make changes**
2. **Update docs** if API changed
3. **Update examples**
4. **Test thoroughly**
5. **Release**: `yarn release` (auto-patches version)

---

## 🎉 You're Ready!

Your library is fully configured for:

- ✅ NPM publishing with automatic versioning
- ✅ GitHub Pages deployment (manual or automated)
- ✅ Professional documentation
- ✅ TypeScript support
- ✅ Continuous integration

### Next Steps

1. Commit all changes
2. Push to GitHub
3. Run `yarn release` to publish to NPM
4. Enable GitHub Pages for documentation
5. Share with the community!

---

**Questions?** Open an issue at: https://github.com/adityakmr7/react-native-heroui/issues

**Good luck with your launch! 🚀**
