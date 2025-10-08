# 📋 NPM Publishing Checklist

Quick checklist before publishing to NPM.

## ✅ Pre-Publish Checks

### Code Quality

- [ ] All tests pass: `yarn test`
- [ ] TypeScript compiles: `yarn typecheck`
- [ ] Linting passes: `yarn lint`
- [ ] No console errors in example app

### Build

- [ ] Clean build: `yarn clean && yarn prepare`
- [ ] Check lib/ folder is generated
- [ ] TypeScript definitions exist in `lib/typescript/`
- [ ] All components exported in `lib/module/`

### Documentation

- [ ] README.md is complete and accurate
- [ ] All component READMEs are up to date
- [ ] Code examples work correctly
- [ ] API documentation matches actual props

### Version Control

- [ ] All changes committed
- [ ] Working tree clean: `git status`
- [ ] Pushed to GitHub: `git push origin main`

### Package Configuration

- [ ] package.json version is correct
- [ ] Package name is available (first publish only)
- [ ] License file exists
- [ ] .npmignore or "files" field configured correctly

## 🚀 Publish Commands

### Option 1: Automated Release (Recommended)

```bash
# This handles everything: version bump, changelog, git tag, npm publish
yarn release
```

Prompts you for:

- Version bump type (patch/minor/major)
- Changelog confirmation
- GitHub release
- NPM publish

### Option 2: Manual Publish

```bash
# 1. Login to NPM (if not already)
npm login

# 2. Bump version manually
npm version patch  # or minor, or major

# 3. Test publish (dry run)
npm publish --dry-run

# 4. Actual publish
npm publish

# 5. Push tags
git push --follow-tags
```

## 📊 Post-Publish Verification

- [ ] Package appears on NPM: https://www.npmjs.com/package/react-native-heroui
- [ ] Can install: `npm install react-native-heroui`
- [ ] Test in fresh project
- [ ] GitHub release created (if using release-it)
- [ ] Git tag pushed

## 🎯 Test Installation

```bash
# Create test project
npx create-expo-app test-heroui
cd test-heroui

# Install your package
npm install react-native-heroui

# Try importing
# Edit App.js/App.tsx and import components
```

## 🐛 Common Issues

### "You need to authenticate"

```bash
npm logout
npm login
```

### "Version already exists"

- Increment version in package.json
- Or use: `npm version patch`

### "No permission to publish"

- Verify package name ownership
- Check if you're logged into correct NPM account

### Build files missing

```bash
yarn clean
yarn prepare
```

## 📢 Post-Publish Promotion

- [ ] Tweet/post about the release
- [ ] Update README badges
- [ ] Post on Reddit (r/reactnative)
- [ ] Write blog post/tutorial
- [ ] Update documentation site
- [ ] Tag relevant people/communities

## 🔄 For Subsequent Releases

1. Make your changes
2. Run tests
3. Update CHANGELOG (or use conventional commits)
4. Run `yarn release`
5. Announce updates

## 🎉 You're Ready!

Run:

```bash
yarn release
```

And follow the prompts!

---

**Current Package**: `react-native-heroui`  
**Registry**: https://registry.npmjs.org/  
**Version**: Check package.json

**Good luck! 🚀**
