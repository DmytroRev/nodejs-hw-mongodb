import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { createContactController, deleteContactController, getAllContactsController, getStudentByIdController, upsertContactController } from "../controllers/contacts.js";
import { validateBody } from "../utils/validateBody.js";
import { createContactSchema } from "../validation/createContactSchema.js";
import { updateContactSchema } from "../validation/updateContactSchema.js";
import { isValidId } from "../middlewares/isValidId.js";

const router = Router();

router.get('/contacts', ctrlWrapper(getAllContactsController));

router.get('/contacts/:contactId', isValidId, ctrlWrapper(getStudentByIdController));

router.post('/contacts', validateBody(createContactSchema),ctrlWrapper(createContactController));

router.patch('/contacts/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(upsertContactController));

router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;
