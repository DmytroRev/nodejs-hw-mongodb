import { Contact } from "../db/models/Contacts.js";


export const getAllContacts = async ({ page, perPage }) => {
    const limit = perPage;
    const skip = page > 0 ? ((page - 1) * perPage) : 0;
    const [contacts, count] = await Promise.all([
        Contact.find().skip(skip).limit(limit).exec(),
        Contact.countDocuments()
    ]);
    const totalPages = Math.ceil(count / perPage);
    return {
        data: contacts,
        page,
        perPage,
        totalItems: count,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: Boolean(totalPages - page)
    };
};

export const getContactById = (contactId) => Contact.findById(contactId);

export const createContact = (contactData) => Contact.create(contactData);

export const updateContact = async (contactId, payload, options) => {
    const rawResult = await Contact.findOneAndUpdate({
        _id: contactId
    },
        payload, {
            new: true,
            includeResultMetadata: true,
            ...options
    });

    if (!rawResult || !rawResult.value) return null;

    return {
        contact: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted)
    };
};


export const deleteContact = async (contactId) => {
    const contact = await Contact.findOneAndDelete({
        _id: contactId
    });
    return contact;
};
