# good decisions

Static website prototype for tracking sleep, food estimates, calories, daily calorie deficit, exercise, weekly weight-loss progress, BMI, streaks, voice or typed updates, Slack prompt settings, and daily motivation.

Program start date: May 25, 2026.

Open `index.html` directly in a browser or serve this folder locally:

```bash
python3 -m http.server 4173
```

The current version stores both the draft day and saved daily history in browser `localStorage`. May 25, 2026 is the Day 1 start anchor; after that, the logging date defaults to the actual calendar date when the page opens. Saved entries power the weekly, monthly, rolling 7-day progress views, calorie averages, deficit averages, BMI updates, and the "any log counts" streak. A full day of sleep, food, and movement unlocks a congratulatory quote; weight is treated as a weekly check-in.

The calorie deficit estimate uses a configurable baseline daily burn, a rough exercise burn estimate, and estimated food calories. The 1-2 lb/week target is represented as a rough 500-1000 kcal/day deficit range.

BMI uses weekly weight and height to calculate `weight lb / height in^2 * 703`. It is shown as a screening metric, with the current BMI and goal-weight BMI side by side in the weekly weight tracker.

Once hosted on GitHub Pages, the site itself will be accessible from a phone. The current localStorage-only data will not automatically sync across phone and desktop; cross-device history would need a small backend or sync target later.

See `PUBLISHING.md` for the GitHub Pages publishing steps.
