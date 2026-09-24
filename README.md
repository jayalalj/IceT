# IceT Hockey

Practice plays and hockey-IQ games for the IceT team. Everything is plain HTML, CSS and JavaScript: no build step, no server, no data collected.

## Pages

| Folder | What it is |
|---|---|
| `/` | Home page with links to everything |
| `faceoff/` | D-Zone Faceoff Win: rim to weak side, strong-side exit, loose puck |
| `puck-retrieval/` | Puck Retrieval & Shot Suppression: breakouts, protecting the house |
| `whos-f1/` | Who's F1? F1/F2/F3 positioning and backcheck game |
| `scrimmage/` | Center Scrimmage: live 5-on-5 with coach points |
| `designer/` | Play Designer (coach-only): drag players, add steps, test, share a link |
| `coach-guide/` | Coach Guide (coach-only): how to design, test, share and publish plays |
| `play/` | Plays any shared designer link as Watch / Play it with grading |
| `playbook/` | Center Playbook: animated F1/F2/F3, faceoff and backcheck diagrams |

## Publishing

Hosted with GitHub Pages: Settings → Pages → Deploy from a branch → `main` / root.
Site: https://jayalalj.github.io/IceT/

## Updating a page

Replace the `index.html` in that page's folder, commit, and push. Pages updates within a minute or two.

## Team code

The whole site is hidden until a visitor enters the team code (case doesn't matter). It's remembered on that device. A link ending in `?code=CODE` unlocks it directly. The coach code also works as a team code.

## Coach mode

Coaches unlock coach mode with the shared code (**Coach login** at the bottom of the home page), or by opening any page with `?coach=CODE` on the end of the link. Coach mode is remembered on that device until they press **Coach ✕**.

In coach mode:
- A red **Feedback** button appears on every page. Once the Google Form is connected (`FORM` in `coach.js`), **Send** saves the note straight to Janaka's Google Sheet with the page and the play/position on screen. Until then it falls back to email, and **Copy text** always works.
- The **Coach preview** section on the home page shows draft pages.
- Pages marked as drafts can be opened. Everyone else sees "Coming soon".

This hides content from casual visitors only. The site is public, so anyone who reads the source can find hidden links. Don't put anything private on it.

### Draft workflow
1. New page goes in its own folder with `<meta name="icet-draft" content="1">` in its `<head>`.
2. Its card goes in the `#drafts` grid inside the **Coach preview** section of `index.html`, with `<span class="tag draft">Draft</span>`.
3. Coaches review it and send feedback. Changes get made.
4. When approved: remove the `icet-draft` meta line, and move the card up to **Team plays**.

The coach code is stored as a hash in `coach.js` (`CODE_HASH`). To change the code, ask for a new hash to be generated.

## Play Designer

`designer/` is coach-only (a draft page). Coaches pick a starting setup, drag players and the puck for each step, and write one caption per step. The whole play is packed into the link `play/#p=...`, so no server or database is needed. **Test it** opens that link. **Copy share link** gives a link to send around. **Save** keeps plays in that browser only.

To make a coach's play permanent on the home page, add a card linking to its `play/#p=...` link: in Coach preview first, then Team plays once it's approved.
