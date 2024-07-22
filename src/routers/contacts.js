import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { createContactController, deleteContactController, getAllContactsController, getStudentByIdController, upsertContactController } from "../controllers/contacts.js";

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get('/contacts/:contactId', ctrlWrapper(getStudentByIdController));

router.post('/contacts', ctrlWrapper(createContactController));

router.patch('/contacts/:contactId', ctrlWrapper(upsertContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default router;
