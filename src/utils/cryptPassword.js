import bcrypt from 'bcrypt';

export const createHash = password => {
    const salt = bcrypt.genSaltSync(10);
    const passwordHashed = bcrypt.hashSync(password, salt);

    return passwordHashed;
}

export const isValidPassword = (password,user) => {
    const isValid = bcrypt.compareSync(password, user.password);
    return isValid;
}  