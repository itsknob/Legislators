When Server starts, reach out and grab data, then run the cron job to refresh it
once a day. Don't do this on the frontend.

Need to clean up utils/index.js

## 01/20/2020

- Need to write Map Data Scraper as Node App with Authenticated Request (Rate
  Limits)
- Should probably download files, then parse files, then upload data to the
  database.

  - Look into SSR for Map

- Fix Bioguide Requests on Backend Launch, bioguide is updating their website,
  some funky stuff changed.

## 05/05/2020

- Side Bar
  - Filters
    - Party
    - Congress (Year)
    - State
    - House of Congress (Senate, House)
  - Sorts
    - Aphabetical
    - By State
