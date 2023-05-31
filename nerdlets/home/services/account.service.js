import { NerdGraphQuery } from 'nr1';
import { ACCOUNTS_QUERY } from '../constants/queries';

export default class AccountService {
    static GetAll = async () => {
        const accounts = [];
        const result = await NerdGraphQuery.query({ query: ACCOUNTS_QUERY });

        if (result.data.actor.accounts !== undefined) {
            result.data.actor.accounts.forEach(account => {
                accounts.push({
                    value: account.id,
                    label: account.name
                });
            });
        }

        return accounts;
    }
}