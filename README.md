# Queries Scan | AGERI

by: itallorian

# Usage

Queries Scan maps all alerts and dashboards of the logged-in account with item and sub-item count, with search bar to scan all queries that have the given term.

When providing the search term, it is possible to view search suggestions related to metric attributes.


# Dependencies

Fully standalone application.

# How it works

The application carries out internal processes to query the data on the platform, bringing all the alerts and dashboards of the account. Data is formatted and cached from New Relic and local user, allowing reuse of data and non-consumption of New Relic data constantly, bringing 0% impact on data ingestion.

![Screenshot](./catalog/screenshots/queries-scan-ageri-01.png)
![Screenshot](./catalog/screenshots/queries-scan-ageri-02.png)
![Screenshot](./catalog/screenshots/queries-scan-ageri-03.png)

## Getting started

Run the following scripts:

```
npm install
npm start
```

Visit https://one.newrelic.com/?nerdpacks=local and :sparkles: