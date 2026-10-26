# Artwork

The repo ships a neutral placeholder so the plugin works out of the box:

- `default/wallpaper.jpg` — 1920×1080, original abstract dusk wallpaper
- `default/mascot.png` — original butterfly mascot, transparent background

To use your own art, put these two files in the parent folder (`assets/`):

- `assets/wallpaper.jpg` — any 16:9 JPEG
- `assets/mascot.png` — transparent PNG, roughly 300–500px tall

`host.js` tries the local file first and falls back to `default/` when it is
missing, so you can delete your files again at any time. Both files are listed
in `.gitignore` to keep personal artwork out of the repo.
