import createHttpError from "http-errors";
import { createContact, deleteContact, getAllContacts, getContactById, updateContact } from "../services/contacts.js";

export const getAllContactsController = async (_, res, next) => {
    try {
        const contacts = await getAllContacts();
        res.json({
            status: 200,
            message: 'Successfully found contacts',
            data: contacts
        });
    } catch (err) {
        next(err);
    }
};


export const getStudentByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    };
    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}`,
        data: contact
    });
};


export const createContactController = async (req, res) => {
    const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: 'Successfully create contact',
        data: contact
    });
};

export const upsertContactController = async (req, res, next) => {
    const { contactId } = req.params;

    const result = await updateContact(contactId, req.body, {
        upsert: true
    });

    if (!result) {
        next(createHttpError(404, "Contact not found"));
        return;
    }

    const status = result.isNew ? 201 : 200;

    res.status(status).json({
    status,
	message: "Successfully patched a contact!",
    data: result.contact
});
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;

    const contact = await deleteContact(contactId);

    if (!contact) {
        next(createHttpError(404, "Contact not found"));
        return;
    }
    res.status(204).send();
};
