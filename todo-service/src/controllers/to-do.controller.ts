import { Request, Response, NextFunction } from "express";
import { Todo } from "../@types";
import { getUserById, saveUser } from "../services/to-do.service";
import APIError from "../errors/APIError";


export const addOrUpdateTodo = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, id, text, isCompleted, expireDate } = req.body;
    
    try {
        const user_content = await getUserById(userId);
        // Checking user data
        if (!user_content) {
            return next(new APIError(404,'DATA_NOT_FOUND','USER NOT FOUND'))
        }
        // Array configuration
        if (!Array.isArray(user_content.todos)) {
            user_content.todos = [];
        }
        

        let todoExists = false;

        user_content.todos = user_content.todos.map((todo: Todo) => {
            if (todo.id === id) {
                todoExists = true; 
                if(isCompleted){
                    return null;
                    //todo.isCompleted===true
                    // next(new APIError(400,'TODO_ERROR','TODO ID IS BELONG TO A DELETED(COMPLETED) TODO'));
                    // if todo is mark as deleted, and when I throw errorr in couchbase doc. turning a null value, todo.id === id is not workining becouse of a null value
    
                } else {
                    return { id, text, isCompleted, expireDate };
                }
            }
            return todo;
        }).filter((todo: Todo | null): todo is Todo => todo !== null);
        //`(todo: Todo | null): todo is Todo => todo !== null expression provides type guard in TypeScript and null values ​​are removed from the array. 
        //only items of type Todo are returned.
        
        if (!todoExists && !isCompleted) {
            user_content.todos.push({ id, text, isCompleted, expireDate });
        }

        await saveUser(user_content);

        res.status(200).json({ message: "Todo item added or updated successfully", todos: user_content.todos });
    } catch (err) {
        next(err);
    }
};


export const removeTodo = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body; 
    const { id } = req.params;

    try {
        const user_content = await getUserById(userId);

        if (!user_content) {
            return next(new APIError(400,'TODO_ERROR','TODO ID IS BELONG TO A DELETED(COMPLETED) TODO'));
        
        }

        if (!Array.isArray(user_content.todos)) {
            return next(new APIError(400,'TODO_ERROR','USER HAS NO TODO'))
        }

        let todoFound = false;
        user_content.todos = user_content.todos.map((todo: Todo) => {
            if (String(todo.id) === String(id)) {
                todoFound = true;
                return { ...todo, isCompleted: true, updatedAt: new Date() }; // Mark as deleted
            }
            return todo;
        });

        if (!todoFound) {  
            return next(new APIError(404,'TODO_ERROR','TODO NOT FOUND'));
        }

        await saveUser(user_content);

        res.status(200).json({ message: "Todo item marked as completed successfully", todos: user_content.todos });
    } catch (err) {
        next(err);
    }
};

export const getTodoById =async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body; 
    const { id } = req.params;

    try {
        const user_content = await getUserById(userId);

        if (!user_content) {
            return next(new APIError(404,'DATA_NOT_FOUND','USER NOT FOUND'))
        }

        if (!Array.isArray(user_content.todos)) {
            return next(new APIError(400,'TODO_ERROR','USER HAS NO TODO'))
        }
        user_content.todos = user_content.todos.filter((todo: Todo) => String(todo.id) === String(id));

        res.status(200).json({ message: "geting todo by id successfuly", todos: user_content.todos });
    } catch (err) {
        console.log("Error in GetTodoById:", err);
        next(err);
    }
};



export const getAllTodos =async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body; // Eğer userId URL'den geliyorsa, req.params.userId olarak alın.


    try {
        const user_content = await getUserById(userId);

        if (!user_content) {
            return next(new APIError(404,'DATA_NOT_FOUND','USER NOT FOUND'))

        }

        if (!Array.isArray(user_content.todos)) {
            return next(new APIError(400,'TODO_ERROR','USER HAS NO TODO'))
        }
        res.status(200).json({ message: "geting All todos successfuly", todos: user_content.todos });
    } catch (err) {
        console.log("Error in GetTodoById:", err);
        next(err);
    }
};


export const deletedTodos = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body; // Eğer userId URL'den geliyorsa, req.params.userId olarak alın.

    try {
        const user_content = await getUserById(userId);

        if (!user_content) {
            return next(new APIError(404,'DATA_NOT_FOUND','USER NOT FOUND'))
        }

        if (!Array.isArray(user_content.todos)) {
            return next(new APIError(400,'TODO_ERROR','USER HAS NO TODO'))
        }

        // Filter
        const deletedTodos = user_content.todos.filter((todo: Todo) => todo.isCompleted === true);

        if (deletedTodos.length === 0) {
            return next(new APIError(404,'DOTO_ERROR','DELETED TODOS NOT FOUND'))
        }

        res.status(200).json({ message: "Deleted todos retrieved successfully", todos: deletedTodos });
    } catch (err) {
        console.error("Error in deletedTodos:", err);
        next(err);
    }
};

