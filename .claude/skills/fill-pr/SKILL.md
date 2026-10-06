---
name: fill-pr
description: Fill in .github/PULL_REQUEST_TEMPLATE.md from the diff against main, show it for approval, then open the PR with gh. Use when a feature branch is ready to become a Pull Request.
---

# Fill PR

Turn a finished branch into a filled-in PR description and open the PR —
without inventing content the diff doesn't actually support.

## Scope

- Reads: `.github/PULL_REQUEST_TEMPLATE.md`, the diff between the current
  branch and `main`.
- Writes: `/tmp/pr-body.md` only. Never modifies
  `.github/PULL_REQUEST_TEMPLATE.md` itself. This is a scratch file owned by
  this skill: any existing copy is always a leftover from a previous run, so
  it's deleted before writing (Step 4) and again after the PR is created
  (Step 6).
- Side effect (only after explicit approval): runs `gh pr create`.
- Never runs `git commit`, `git push`, `git add`, or any other command that
  changes the repository or the remote. The user commits and pushes
  themselves.
- Never adds attribution of any kind: no "Generated with Claude Code" line,
  no co-author trailer, no AI signature, in the PR body or the title. The PR
  is opened with exactly the body the user approved in Step 5, nothing
  appended afterwards.

## Step 1 — Sanity-check the branch

- Confirm the current branch isn't `main` itself — if it is, stop and ask
  the user which branch they meant.
- Run `git status` — if there are uncommitted changes, tell the user they
  won't be reflected in the PR (the diff is branch-vs-main, not working
  tree) and ask whether to proceed, commit first, or stash.

## Step 2 — Read the template

Read `.github/PULL_REQUEST_TEMPLATE.md` in full. Fill in its **exact**
existing structure and section headers — don't reorder, rename, or add
sections. If the file doesn't exist at that path, stop and tell the user
rather than guessing a template shape.

## Step 3 — Read the diff

Get the full picture, not just file names:
- `git log main..HEAD --oneline` for the commit history on this branch.
- `git diff main...HEAD` (three-dot — diff against the merge base) for the
  actual content changes.

Base everything you write on what's really in this diff. Don't pad a
section with generic filler to make it look complete.

## Step 4 — Fill in each section

- **Summary** — one or two sentences on the nature of the change, per the
  template's own comment. Plain description of what changed, not a
  changelog.
- **Screenshots (UI changes)** — leave the `**Before:**` and `**After:**`
  headers exactly as they are, with nothing filled in under either. The
  user adds these manually.
- **New Behaviour** — bullet list of the actual logic/behavior changes
  visible in the diff. Only list things the diff genuinely shows — no
  speculative or aspirational bullets.
- **Other information** — only add something here if the diff surfaces
  something a reviewer would actually need to know (a follow-up left for
  later, a config/env change, a note about what wasn't covered). Leave it
  as the template's placeholder comment if there's nothing genuinely
  relevant — don't invent content to fill the section.

Before saving, delete any leftover copy from a previous run, so this never
has to read or overwrite an old PR body:

```
rm -f /tmp/pr-body.md
```

Then save the result to `/tmp/pr-body.md` as a new file.

## Step 5 — Show the user and wait for approval

Print the filled `/tmp/pr-body.md` content back to the user before doing
anything else. Do not create the PR until they've confirmed it's good, or
told you what to change (then repeat this step after editing).

## Step 6 — Create the PR

Only after approval:

1. Check whether the current branch is pushed to the remote and up to date
   (e.g. `git rev-parse --abbrev-ref @{upstream}` to see if it has an
   upstream at all, then compare `git rev-parse HEAD` against
   `git rev-parse @{upstream}`). Never run `git push` yourself. If there's
   no upstream, or the remote is behind, stop and tell the user to push the
   branch themselves before you continue — then wait for them to confirm
   it's pushed.
2. Come up with a clear, specific PR title (not the generic "Update X").
3. Run exactly this, with nothing appended to `/tmp/pr-body.md` first (no
   attribution line, no signature):
   ```
   gh pr create --title "<title>" --body-file /tmp/pr-body.md --base main
   ```
4. Report the PR URL `gh` returns.
5. Once the PR is created successfully, clean up the scratch file:
   ```
   rm -f /tmp/pr-body.md
   ```
   If `gh pr create` failed, keep the file so the user can retry without
   regenerating the body.