import express from 'express';
const router = express.Router();
import * as user_con from '../controllers/UserController';

// GET all users
router.get('/', user_con.GetAllUsers);

// GET user by ID
router.get('/:id', user_con.GetUserByEmail);

// PUT (update) user by ID
router.put('/:id', user_con.UpdateUser);

// DELETE user by ID
router.delete('/:id', user_con.DeleteUser);

// POST (signup) new user
router.post('/signup', user_con.Register);

// POST (login) user
router.post('/login', user_con.Login);

export default router;
