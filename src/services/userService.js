import User from "../models/userModel.js"

//Creo nuevo usuario
export const createUserService = async (userData) => {
    // Valido si ya existe el usuario
    const userExists = await User.findOne({ email: userData.email })

    if(userExists){
        throw new Error("User with this email already exists")
    }

    const newUser = new User(userData)

    await newUser.save()

    return { message: "User created", user: newUser }
}

//Obtengo todos los usuarios 
export const getUsersService = async () => {
  const users = await User.find()
  //Valido por si no hay usuarios
  if (!users.length) {
    const error = new Error("No users found")
    error.statusCode = 204
    throw error
  }
  return users
}

//Obtengo un usuario por id
export const getUserByIdService = async (userId) => {
  const user = await User.findById({_id: userId})
  //Valido por si no hay usuarios
  if (!user) {
    const error = new Error(`User with ${userId} id not found`)
    error.statusCode = 204
    throw error
  }
  return user
}


//Actualizo un usuario 
export const updateUserService = async (userId, updateData) => {
  const userExists = await  User.findOne({ _id: userId })

  //Valido si existe
  if (!userExists) {
    const error = new Error("User not found")
    error.statusCode = 404
    throw error
  }
  
    const updatedUser = await User.findByIdAndUpdate({ _id: userId }, updateData, { new: true })

    return updatedUser;
}

//Elimino un uduario
export const deleteUserService = async (userId) => {
  const userExists = await User.findOne({ _id: userId })

  if (!userExists) {
    const error = new Error("User not found")
    error.statusCode = 404
    throw error
  }
    await User.findByIdAndDelete({ _id: userId})

    return { message: "User deleted successfully" }
}





