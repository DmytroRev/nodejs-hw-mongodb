import { SORT_ORDER } from "../constants/index.js";

const parseSortBy = (sortBy) => {
    const keys = [
        'name'
    ];
    if (keys.includes(sortBy)) return sortBy;
    return 'name';
};

const parseSortOrder = (sortOrder) => {
    if ([SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder)) return sortOrder;
    return SORT_ORDER.ASC;
};

export const parseSortParams = (query) => {
    const { sortBy, sortOrder } = query;

    const parsedSortBy = parseSortBy(sortBy);
    const parsedSortOrder = parseSortOrder(sortOrder);

    return {
        sortBy: parsedSortBy,
        sortOrder: parsedSortOrder
    };
};

