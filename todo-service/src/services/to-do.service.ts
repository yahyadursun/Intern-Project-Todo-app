import { User } from "../@types"
import { getCouchbaseConnection } from "../db"

 export const getUserById = async (id:string) => {
    try {
        const {users}= await getCouchbaseConnection()
        const user = await users.get(id)
        return user.content 
    
    } catch (error) {
        console.log('Error geting user by id',error)
    }
}
export const saveUser = async (user: User): Promise<void> => {
    try {
        const {users}= await getCouchbaseConnection()
        await users.upsert(user.id, user);
    } catch (error) {
        console.error('Error saving user:', error);
    }
};

