import GlobalService from "../services/global.service.js";

const QUERY_BASE = (accountId) => `query{ actor { nrql(accounts: ${accountId}, query: "{0}") { results } } }`;

export const METRIC_KEYS = (accountId) => GlobalService.FormatString(QUERY_BASE(accountId), ['FROM Metric SELECT keyset()']);

export const DASHBOARDS_QUERY = (cursor) => `query {
  actor {
    entitySearch(queryBuilder: {type: DASHBOARD}) {
      results ${cursor} {
        entities {
          guid
          name
          permalink
          account {
            name
          }
        }
        nextCursor
      }
    }
  }
}`;

export const DASHBOARD_CHARTS_QUERY = (guid) => `query {
  actor {
    entities(guids: "${guid}") {
      ... on DashboardEntity {
        permalink
        name
        pages {
          widgets {
            rawConfiguration
            title
          }
        }
      }
    }
  }
}`;

export const ALERTS_QUERY = (cursor, accountId) => `query {
    actor {
      account(id: ${accountId}) {
        alerts {
          nrqlConditionsSearch(searchCriteria: {queryLike: "From"}, cursor: "${cursor}") {
            nrqlConditions {
              enabled
              entity {
                permalink
                name
                account {
                  name
                }
              }
              nrql {
                query
              }
            }
            nextCursor
          }
        }
      }
    }
  }`;