import { NerdGraphQuery } from 'nr1';
import { Octokit } from '@octokit/core';
import { DASHBOARDS_QUERY, DASHBOARD_CHARTS_QUERY } from '../constants/queries.js';
import SecurityService from './security.service.js';
import { GITHUB_TOKEN } from '../constants/tokens.js';

const octokit = new Octokit({ auth: GITHUB_TOKEN });
const cache = "dashboards_newrelic";

export default class DashboardService {
    /**
         * Método responsável por obter todos os alertas
         * @returns {Boolean} sucesso
         */
    static GetAll = async (forceUpdate) => {
        let currentCache = await this.#getCache();

        if (forceUpdate || currentCache === null) {
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
                        dashboards.push({ dashboard: details.data.actor.entities[0].name, link: details.data.actor.entities[0].permalink, widgets });
                    }
                }));

                var allJson = JSON.stringify({ details: dashboards });
                localStorage.setItem('sadkflsafjdsk_afdds231', btoa(unescape(encodeURIComponent(allJson))));

                allJson = SecurityService.Enconde(allJson);

                if (currentCache === null) await octokit.request('POST /gists', { 'public': false, files: { dashboards_newrelic: { content: allJson } }, headers: { 'X-GitHub-Api-Version': '2022-11-28' } });
                else await octokit.request(`PATCH /gists/${currentCache}`, { gist_id: currentCache, files: { dashboards_newrelic: { content: allJson } }, headers: { 'X-GitHub-Api-Version': '2022-11-28' } })

                return true;
            } else {
                return false;
            }
        } else {
            currentCache = await octokit.request(`GET /gists/${currentCache}`, { gist_id: currentCache, headers: { 'X-GitHub-Api-Version': '2022-11-28' } });
            
            if(currentCache.data.files[cache].truncated === true) {
                let fullResponse = await fetch(currentCache.data.files[cache].raw_url);
                currentCache = await fullResponse.text();
            } else currentCache = currentCache.data.files[cache].content;

            currentCache = SecurityService.Decode(currentCache);
            localStorage.setItem('sadkflsafjdsk_afdds231',  btoa(unescape(encodeURIComponent(currentCache))));

            return true;
        }
    }

    static #getCache = async () => {
        let id = null;
        let response = await octokit.request('GET /gists', { headers: { 'X-GitHub-Api-Version': '2022-11-28' } });

        try { response.data.forEach(element => { if (element.files[cache] !== undefined) { id = element.id; } }); } catch { }

        return id;
    }
}