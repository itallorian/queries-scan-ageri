import { NerdGraphQuery } from 'nr1';
import { ALERTS_QUERY } from '../constants/queries.js';
import SecurityService from './security.service.js';
import CacheService from './cache.service.js';

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
    static GetAll = async (forceUpdate, accountId) => {
        let currentCache = await CacheService.Get(cache, accountId);

        if (forceUpdate || currentCache === null) {
            if (forceUpdate) localStorage.getItem("ajflkasSA09fdkl") === "8ads09ASLKAD_2" ? localStorage.setItem("ajflkasSA09fdkl", "8ads09ASLKAD_1") : localStorage.removeItem("ajflkasSA09fdkl");

            let all = [];
            let cursor = "";
            let consultAlerts = true;
            while (consultAlerts) {
                let result = await NerdGraphQuery.query({ query: ALERTS_QUERY(cursor, accountId) });

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

                await CacheService.Set(cache, allJson, accountId);

                return true;
            } else {
                return false;
            }
        } else {
            currentCache = SecurityService.Decode(currentCache);
            localStorage.setItem('anr18DAKdanas_afdds231',  btoa(unescape(encodeURIComponent(currentCache))));

            return true;
        }
    }
}