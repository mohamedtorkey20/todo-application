import express from 'express';
const router = express.Router();
import * as todo_con from '../controllers/TodoControllers';

router.get('/', todo_con.GetAllTodos);
router.get('/:id', todo_con.GetTodoByID);
router.post('/', todo_con.AddTodo);
router.put('/:id', todo_con.UpdateTodo);
router.delete('/:id', todo_con.DeleteTodo);

export default router;
