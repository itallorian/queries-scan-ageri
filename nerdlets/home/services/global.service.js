/**
 * Classe de serviços globais, para uso generico
 * @GlobalService
 */
export default class GlobalService {
    /**
     * Método responsável por formatar uma string
     * @param {String} text 
     * @param {Array} argumentsList 
     * @returns {String}
     */
    static FormatString = (text, argumentsList) => {
        for (let i = 0; i < argumentsList.length; i++) {
            let regexp = new RegExp('\\{' + i + '\\}', 'gi');
            text = text.replace(regexp, argumentsList[i]);
        }

        return text;
    }
}