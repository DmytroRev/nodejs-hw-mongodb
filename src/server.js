import express from 'express';
// import pino from 'pino-http';
import cors from 'cors';
import { getAllContacts, getContactById } from './services/contacts.js';


const PORT = process.env.PORT || 3000;

export const setupServer = () => {
    const app = express();
       app.use(cors());

    // app.use(pino({
    //     transport: {
    //         target: 'pino-http'
    //     }
    // }));

    app.get('/contacts', async (req, res) => {
        try {
            const contacts = await getAllContacts();
            res.status(200).json({
                message: "Successfully found contacts!",
                data: contacts
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error retrieving contacts',
                error: error.message
            });
}
    });

    app.get('/contacts/:contactId', async (req, res) => {
        try {
            const { contactId } = req.params;
            const contact = await getContactById(contactId);

            if (!contact) {
                res.status(404).json({
                    message: 'Contact not found'
                });
                return;
            }
            res.status(200).json({
                status: 200,
                massage: `Successfully found contact with id ${contactId}`,
                data: contact,
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error retrieving contacts',
                error: error.message
            });
        }
     });

    app.use('*', (req, res, next) => {
        res.status(404).send('Not found');
    });
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

