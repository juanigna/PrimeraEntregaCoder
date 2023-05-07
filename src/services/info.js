export const generateUserInfo = (user) => {
    return `
        One or more properties were incomplete or not valid!
        List of required Properties:
        * first_name: needs to be a String, received: ${user.firs_name}
        * last_name: needs to be a String, received: ${user.last_name}
        * email: needs to be a String, received: ${user.email}
        * age: needs to be a Number, received: ${user.age}
        * password: needs to be a String, received: ${user.password}`    
}

export const userAlredyExists = (user) => {
    return `
        The user with the email ${user.email} already exists!`  
}