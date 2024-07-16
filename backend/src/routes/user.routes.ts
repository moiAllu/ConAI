import { login, signup, update_user, delete_user, logout } from '../controllers/user.controller';
import express, { Request, Response } from 'express';

const router = express.Router();

// User login route
router.post('/login', login);

// User login route
router.get('/logout', logout);

// User signup route
router.post('/signup', signup);

// User update route with additional verification middleware
router.put('/update', update_user);

// User delete route with additional verification middleware
router.delete('/delete', delete_user);




export default router;