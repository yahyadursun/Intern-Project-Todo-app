import { Router } from "express";
import { addOrUpdateTodo,removeTodo,getTodoById, getAllTodos, deletedTodos } from "../controllers/to-do.controller";

const todoRouter = Router()

todoRouter.post('/', addOrUpdateTodo);
todoRouter.delete('/:id', removeTodo);
todoRouter.get('/:id', getTodoById);
todoRouter.get('/', getAllTodos);
todoRouter.post('/deleted', deletedTodos);
export default todoRouter