//gateway\src\@types\index.d.ts
declare global {
  namespace Express {
    interface Request {
      validatedUser?: SafeUser
    }
  }
}

export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    lastname: string;
    todos: Todo[];
  }
  
export interface Todo {
    id: number;
    text: string;
    author: string;
    isCompleted: boolean;
    expireDate: Date;
    createdAt: Date;
    updatedAt: Date;
  }

export type SafeUser = Omit<User,'password'>