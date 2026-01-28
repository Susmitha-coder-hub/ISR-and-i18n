## Push repository to GitHub

1. Create an empty repository on GitHub (no README, no .gitignore).
2. From the project root run:

```bash
# set your remote URL and run the helper
GIT_REMOTE=https://github.com/Susmitha-coder-hub/ISR-and-i18nbash scripts/prepare_repo.sh
```

3. If you prefer manual steps:

```bash
git init -b main
git add --all
git commit -m "chore: initial commit — Next.js multi-language docs site"
git remote add origin https://github.com/Susmitha-coder-hub/ISR-and-i18n
git push -u origin main
```

Notes:
- Ensure you have SSH keys configured or use HTTPS remote.
- The helper script will not overwrite an existing `.git` directory.
