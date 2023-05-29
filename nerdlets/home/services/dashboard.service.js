import { NerdGraphQuery } from 'nr1';
import { DASHBOARDS_QUERY, DASHBOARD_CHARTS_QUERY } from '../constants/queries.js';
import SecurityService from './security.service.js';
import CacheService from './cache.service.js';

const cache = "dashboards_newrelic";

export default class DashboardService {
    /**
         * Método responsável por obter todos os alertas
         * @returns {Boolean} sucesso
         */
    static GetAll = async (forceUpdate, accountId) => {
        let currentCache = await CacheService.Get(cache, accountId);

        if (forceUpdate || currentCache === null) {
            console.log("no cache");
            if (forceUpdate) localStorage.getItem("ajflkasSA09fdkl") === "8ads09ASLKAD_2" ? localStorage.setItem("ajflkasSA09fdkl", "8ads09ASLKAD_1") : localStorage.removeItem("ajflkasSA09fdkl");

            let all = [];
            let cursor = "";
            let consultAlerts = true;
            while (consultAlerts) {
                let result = await NerdGraphQuery.query({ query: DASHBOARDS_QUERY(cursor) });

                if (result.data.actor.entitySearch.results.entities != undefined && result.data.actor.entitySearch.results.entities.length > 0) {
                    result.data.actor.entitySearch.results.entities.forEach(item => all.push(item));
                    cursor = `(cursor: "${result.data.actor.entitySearch.results.nextCursor}")`
                    if (result.data.actor.entitySearch.results.nextCursor === null) consultAlerts = false;
                } else consultAlerts = false;
            }

            if (all.length > 0) {
                let dashboards = [];

                await Promise.all(all.map(async (item) => {
                    let details = await NerdGraphQuery.query({ query: DASHBOARD_CHARTS_QUERY(item.guid) });
                    if (details.data.actor.entities[0].pages != undefined && details.data.actor.entities[0].pages.length > 0) {
                        let widgets = details.data.actor.entities[0].pages;
                        widgets.map(v => v.link = `https://one.newrelic.com/redirect/entity/${v.guid}`);
                        dashboards.push({ dashboard: details.data.actor.entities[0].name, link: details.data.actor.entities[0].permalink, widgets, accountId: item.account.id, account: item.account.name });
                    }
                }));

                var allJson = JSON.stringify({ details: dashboards });
                localStorage.setItem('sadkflsafjdsk_afdds231', btoa(unescape(encodeURIComponent(allJson))));

                allJson = SecurityService.Enconde(allJson);

                await CacheService.Set(cache, allJson, accountId);

                return true;
            } else {
                return false;
            }
        } else {
            currentCache = SecurityService.Decode(currentCache);
            localStorage.setItem('sadkflsafjdsk_afdds231', btoa(unescape(encodeURIComponent(currentCache))));

            return true;
        }
    }
}