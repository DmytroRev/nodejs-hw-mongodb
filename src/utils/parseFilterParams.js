

const parseType = (contactType) => {
    const isString = typeof contactType === 'string';
    if (!isString) return;
    const isContactType = (contactType) => ['home', 'personal'].includes(contactType);
    if (isContactType(contactType)) return contactType;
};

const parseBool = (bool) => {
    const isBool = typeof bool === 'boolean';
    if (!isBool) return;
    return bool;
};

export const parseFilterParams = (query) => {
    const { contactType, isFavourite } = query;

    const parsedType = parseType(contactType);
    const parsedBool = parseBool(isFavourite);

    return {
        contactType: parsedType,
        isFavourite: parsedBool
    };
};
