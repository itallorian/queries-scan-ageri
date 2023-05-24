import { NerdGraphQuery } from 'nr1';
import { Octokit } from '@octokit/core';
import { ALERTS_QUERY } from '../constants/queries.js';
import SecurityService from './security.service.js';
import { GITHUB_TOKEN } from '../constants/tokens.js';

const octokit = new Octokit({ auth: GITHUB_TOKEN });
const cache = "alerts_newrelic";

/**
 * Classe de serviços responsável por todo o
 * gerenciamento de alertas
 * @AlertService
 */
export default class AlertService {

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
                let result = await NerdGraphQuery.query({ query: ALERTS_QUERY(cursor) });

                if (result.data.actor.account.alerts.nrqlConditionsSearch.nrqlConditions != undefined && result.data.actor.account.alerts.nrqlConditionsSearch.nrqlConditions.length > 0) {
                    result.data.actor.account.alerts.nrqlConditionsSearch.nrqlConditions.forEach(item => all.push(item));
                    cursor = result.data.actor.account.alerts.nrqlConditionsSearch.nextCursor;
                    if (result.data.actor.account.alerts.nrqlConditionsSearch.nextCursor === null) consultAlerts = false;
                } else consultAlerts = false;
            }

            if (all.length > 0) {
                var allJson = JSON.stringify({ details: all });

                localStorage.setItem('anr18DAKdanas_afdds231', btoa(unescape(encodeURIComponent(allJson))));

                allJson = SecurityService.Enconde(allJson);

                if (currentCache === null) await octokit.request('POST /gists', { 'public': false, files: { alerts_newrelic: { content: allJson } }, headers: { 'X-GitHub-Api-Version': '2022-11-28' } });
                else await octokit.request(`PATCH /gists/${currentCache}`, { gist_id: currentCache, files: { 'alerts_newrelic': { content: allJson } }, headers: { 'X-GitHub-Api-Version': '2022-11-28' } })

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
            localStorage.setItem('anr18DAKdanas_afdds231',  btoa(unescape(encodeURIComponent(currentCache))));

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