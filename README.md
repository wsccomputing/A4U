# Addvantage For You — PEP-Choices Learning App

A deployable frontend-only web app based on the uploaded specification.

## What this version includes

- Student dashboard with report insights
- Assignment workflow with planning, status, review dates, and reflection history
- Mentor, curriculum mentor, admin, and institution views
- Notifications and alerts
- Progress and analytics dashboards
- Import/export demo tools
- Print support
- No build step required

## How to run locally

Open `index.html` in a browser.

For best results, use a simple local server:

### Python

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`

## Free hosting options

### Netlify
1. Create a free Netlify account.
2. Drag the whole folder into Netlify Drop.
3. Your site will go live instantly.

### GitHub Pages
1. Create a repository.
2. Upload `index.html`, `styles.css`, and `app.js`.
3. Enable GitHub Pages in repository settings.

### Cloudflare Pages
1. Create a free Pages project.
2. Upload the folder or connect a GitHub repo.
3. Set build command to none.

## Demo logins

All demo passwords are:

```text
demo123
```

Accounts are listed on the login screen.

## Important limitations

This version uses browser `localStorage`, so:

- data is only stored in the user's browser
- there is no secure multi-user authentication
- there is no real backend or database
- it is not suitable for GDPR-sensitive production deployment as-is

## Best production upgrade path

Keep this frontend and connect it to:

- Supabase Auth for login
- Supabase Postgres for data
- Supabase Row Level Security for role-based access
- Netlify or Cloudflare Pages for hosting

## Suggested next steps

1. Replace localStorage with a real backend.
2. Add email reminders and calendar integration.
3. Add protected routes and session handling.
4. Add file uploads and PDF report ingestion.
5. Add proper analytics charts and cohort filtering.
