import { Contact } from "../db/models/Contacts.js";


export const getAllContacts = () => Contact.find();

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
