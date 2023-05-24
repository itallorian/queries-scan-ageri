import GlobalService from "../services/global.service.js";
import { ACCOUNT_ID } from "./tokens.js";

const QUERY_BASE = `query{ actor { nrql(accounts: ${ACCOUNT_ID}, query: "{0}") { results } } }`;

export const METRIC_KEYS = GlobalService.FormatString(QUERY_BASE, ['FROM Metric SELECT keyset()']);

export const DASHBOARDS_QUERY = (cursor) => `query {
  actor {
    entitySearch(queryBuilder: {type: DASHBOARD}) {
      results ${cursor} {
        entities {
          guid
          name
          permalink
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

export const ALERTS_QUERY = (cursor) => `query {
    actor {
      account(id: ${ACCOUNT_ID}) {
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