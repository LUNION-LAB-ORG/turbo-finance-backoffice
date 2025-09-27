import { parseAsString, parseAsInteger } from "nuqs/server";

export const recouvrementFiltersClient = {
    filter: {
        search: parseAsString.withDefault(''),
        factureId: parseAsString.withDefault(''),
        dateRecouvrement: parseAsString.withDefault(''),
        restaurantId: parseAsString.withDefault(''),
        montant: parseAsInteger.withDefault(0),
        page: parseAsInteger.withDefault(1),
        limit: parseAsInteger.withDefault(10),
    },
    option: {
        clearOnDefault: true,
        throttleMs: 500,
    }
}
