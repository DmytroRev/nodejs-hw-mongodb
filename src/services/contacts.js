import mongoose, { Schema } from "mongoose";

const contactsShema = new Schema({
    name: {
        type: String,
        required: true,
    },
 phoneNumber: {
            type: String,
            require: true
    },
 email: {

         type: String,
         require: false,

    },
    isFavourite: {
        type: Boolean,
        default: false,
    },
    contactType: {
        type: String,
        enum: ['work', 'home', 'personal'],
        require: true,
        default: 'personal',
    }
},
    {
        timestamps: true

});

export const Contact = mongoose.model('Contact', contactsShema);

export const getAllContacts = async () => {
    const contacts = await Contact.find();
    return contacts;
};

export const getContactById = async (contactId) => {
    const contact = await Contact.findById(contactId);
    return contact;
};
