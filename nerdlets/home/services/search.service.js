import { NerdGraphQuery } from 'nr1';
import { METRIC_KEYS } from "../constants/queries.js";

/**
 * Classe de pesquisa
 * @SearchService
 */
export default class SearchService {

    /**
     * Método responsável por obter todos os atributos de métricas
     * @returns {Array} lista de atributos
     */
    static GetMetricAutocomplete = async () => {
        const result = [];

        const response = await NerdGraphQuery.query({ query: METRIC_KEYS });

        if (response.data.actor.nrql.results != undefined && response.data.actor.nrql.results.length > 0) response.data.actor.nrql.results.map(v => result.push(v.key));

        return result;
    }
}