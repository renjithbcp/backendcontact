import express from 'express';
const router = express.Router();
import { getContacts , createContact, getContact, updateContact, deleteContact} from '../controllers/contactController.js'
import validateToken from '../middleware/validateTokenHandler.js';

router.use(validateToken);
router.route('/').get(getContacts).post(createContact);
router.route('/:id').put(updateContact).get(getContact).delete(deleteContact);
export default router;