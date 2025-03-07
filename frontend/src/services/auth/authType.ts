export interface MessageResponseProps {
    message: string;
}

export interface RegistrationInputProps {
    username: string;
    password: string;
    role: 'admin' | 'user';
}

export interface IUser {
    username: string;
    password: string;
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}

export interface ILogin {
    username: string;
    password: string;
}
