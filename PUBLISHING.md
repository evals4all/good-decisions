# Publishing to GitHub Pages

This site is plain HTML, CSS, JavaScript, and SVG assets, so GitHub Pages can serve it directly from the repository root.

## First Publish

1. Create a new GitHub repository named `good-decisions`.
2. Push this local repo to it:

```bash
git remote add origin https://github.com/YOUR-USERNAME/good-decisions.git
git push -u origin main
```

3. On GitHub, open the repository.
4. Go to `Settings` -> `Pages`.
5. Under `Build and deployment`, set:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
6. Save. GitHub Pages will publish the site and show a `Visit site` link when it is ready.

GitHub says Pages publishes static files pushed to a repository, and branch publishing can use the repository root. It can take up to 10 minutes for changes to publish after a push.

## Future Updates

After making changes:

```bash
git add index.html styles.css script.js assets README.md PUBLISHING.md .gitignore .nojekyll
git commit -m "Update good decisions"
git push
```

