# Eric Resume Site

A clean, single page resume website with content powered by `content.js`.

## Deploy on GitHub Pages
1. Create a new repo (example: `eric-resume-site`)
2. Upload all files from this folder
3. Repo Settings -> Pages -> Deploy from branch -> `main` -> `/ (root)`
4. Your site will be live at `https://<username>.github.io/<repo>/`

## Update content
Edit `content.js`. Refresh.

## Add your headshot
Replace the `#avatar` background by setting a background image in `styles.css`, or add:
```css
#avatar{ background-image:url("assets/headshot.jpg"); background-size:cover; background-position:center; }
```
Then drop `headshot.jpg` into `assets/`.

## PDF resume
The site links to `assets/Eric_Raszewski_Resume_2026.pdf`. Replace it anytime.
