import { Contact } from "../db/models/Contacts.js";


export const getAllContacts = async ({ page, perPage, sortBy, sortOrder, filter}) => {
    const limit = perPage;
    const skip = page > 0 ? ((page - 1) * perPage) : 0;

    const contactQuery = Contact.find();

    if (filter.contactType) {
        contactQuery.where('contactType').equals(filter.contactType);
    }

    if (filter.isFavourite) {
        contactQuery.where('isFavourite').equals(filter.isFavourite);
    }

    const [contacts, count] = await Promise.all([
        contactQuery.sort({[sortBy]: sortOrder}).skip(skip).limit(limit).exec(),
        Contact.find().merge(contactQuery).countDocuments()
    ]);
    const totalPages = Math.ceil(count / perPage);
    return {
        data: contacts,
        page,
        perPage,
        totalItems: count,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: Boolean(totalPages - page),
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



