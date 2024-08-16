import createHttpError from 'http-errors';
// import * as fs from 'node:fs/promises';
// import path from 'node:path';
import {
  // changeContactsPhoto,
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSearchParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { env } from '../utils/env.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  res.send({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contactFields = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    userId: req.user._id,
  };
  const photo = req.file;
  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await uploadToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  contactFields.photo = photoUrl;
  const contact = await createContact(contactFields);
  res.status(200).json({
    status: 200,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await uploadToCloudinary(photo.path);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const result = await updateContact(
    contactId,
    req.user._id,
    {
      ...req.body,
      photoUrl,
    },
    {
      upsert: true,
    },
  );

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId, req.user._id);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(204).send();
};

// export const changeContactAvatarController = async (req, res, next) => {
//   await fs.rename(
//     req.file.path,
//     path.resolve('src', 'uploads', 'photos', req.file.filename),
//   );
//   await changeContactsPhoto(req.user._id, req.file.filename);
//   res.send({
//     status: 200,
//     message: 'Photo changed successfully!',
//   });
// };
// export const patchContactController = async (req, res, next) => {
//   const { contactId } = req.params;
//   const photo = req.file;
//   console.log(photo);
// };
