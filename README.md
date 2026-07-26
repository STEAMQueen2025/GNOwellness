# GNO Health & Wellness Alliance — Website with Editor Access

This folder is your complete website, rebuilt so Danielle and Dominique can edit it
themselves — text, photos, bios, logo, links, phone, address, and email — with no code.

There are 3 setup steps. Each is a few clicks. Do them in order.

---

## STEP 1 — Put the site on GitHub (one time)

1. Go to github.com and create a free account (or sign in).
2. Click the "+" (top right) → "New repository".
   - Name it: gno-website
   - Keep it Private. Click "Create repository".
3. On the new repo page, click "uploading an existing file".
4. Drag EVERYTHING inside this folder into the upload box
   (the folders admin, assets, content, templates, plus build.js, netlify.toml,
   this README, and all the photo files).
5. Click "Commit changes".

## STEP 2 — Connect Netlify to GitHub (one time)

1. Log in to app.netlify.com.
2. Open your existing site (gnohealthandwellnessalliance) → Site configuration →
   Build & deploy → "Link repository" (or create the link under
   "Import an existing project" and choose GitHub → gno-website).
   - Build command: node build.js   (it should read this from netlify.toml automatically)
   - Publish directory: _site
3. Deploy. Your site address stays the same. From now on, the site rebuilds
   itself automatically whenever content changes — no more dragging files.

## STEP 3 — Turn on logins and invite Danielle & Dominique (one time)

1. In your Netlify site dashboard: Integrations → Identity → Enable Identity.
2. Under Identity → Registration, set registration to "Invite only".
3. Under Identity → Services → Git Gateway → Enable Git Gateway.
4. Go to the Identity tab → "Invite users" → enter Danielle's email, then
   Dominique's email.
5. They'll each get an email. They click "Accept the invite", which opens the
   website — a window pops up where they set their own password.

That's it.

---

## How Danielle and Dominique edit the site

1. Go to the website and scroll to the bottom → tap "Staff login"
   (or go straight to  yoursite.netlify.app/admin ).
2. Log in with their email + password.
3. They'll see three sections:
   - ⚙️ Contact Info & Links — phone, email, address, class time, donate /
     form / Instagram links, and the logo.
   - 📄 Pages — every headline, paragraph, program description, photo caption,
     and the class photos & before/after galleries.
   - Leadership page — add, remove, or reorder board members; change photos,
     names, titles, and bios.
4. Make a change → click "Save" → click "Publish".
5. The site rebuilds itself. Changes appear on the live site in about 1–2 minutes.

Notes:
- Photos uploaded through the editor are stored automatically — no file naming needed.
- A few fields say "(HTML allowed)" — these contain bold text like <b>this</b>.
  Editing the words is fine; just leave the <b> and </b> tags around bolded words.
- If a publish ever fails, the previous version of the site stays live. Nothing breaks.

## Managing logins later

- Add or remove editors any time: Netlify dashboard → Identity tab.
- Danielle is the day-to-day manager; Dominique is the backup. Both have the
  same editing powers (Netlify treats all invited users the same).
