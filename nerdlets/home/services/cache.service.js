import { AccountStorageMutation, AccountStorageQuery } from 'nr1';

export default class CacheService {
    static Get = async (name, accountId) => {
        let index = 1, next = true, content = "";

        while (next) {
            let response = await AccountStorageQuery.query({
                accountId: accountId,
                collection: "queries_scan_ageri_" + index,
                documentId: name,
            });

            if (response.data != null) {
                content += response.data.content;
                next = response.data.next;
                index++;
            } else next = false;
        }   

        return content === "" ? null : content;
    }

    static Set = async (name, value, accountId) => {
        let mutates = [], mb = value.length / 1000000;

        for (let i = 1; i <= Math.ceil(mb, 1); i++) {
            let next = !(i >= Math.ceil(mb, 1)),
                start = i === 1 ? 0 : (i - 1) * 1000000,
                end = i >= Math.ceil(mb, 1) ? (1000000 * i) - value.length : 1000000,
                content = value.substr(start, end);

            mutates.push({
                accountId: accountId,
                actionType: AccountStorageMutation.ACTION_TYPE.WRITE_DOCUMENT,
                collection: "queries_scan_ageri_" + i,
                documentId: name,
                document: { content, next }
            });
        }

        await Promise.all(mutates.map(async mutate => {
            await AccountStorageMutation.mutate(mutate);
        }));
    }
}