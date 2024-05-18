import bcrypt from 'bcryptjs';

export const encrypt = (string) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(string, salt);
};

export const compare = (string, hash) => {
    return bcrypt.compareSync(string, hash);
};