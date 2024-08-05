import { getCouchbaseConnection } from "../db";
import { User } from "../@types";

const addUser = async (user:User) => {
    const {users} =await getCouchbaseConnection()

    await users.insert(user.id,user)
    
    const createdUser = await getUserById(user.id)
    return createdUser 
}

const getUserById = async (id:string) => {
    const {users}= await getCouchbaseConnection()
    const user = await users.get(id)

    return user.content 
}

const getByEmail = async (email:string) => {
    const {cluster}= await getCouchbaseConnection()

    const queryResult = await cluster.query(
        'SELECT id, email,`password` FROM `travel-sample`.`_default`.`users` where email = $email;',
        {
            parameters:{
                email,
            }
        }
    )
    return queryResult.rows[0]
    
}

const UserService = {
    addUser,
    getUserById,
    getByEmail
}
export default UserService