export interface UserForm {
    username : string;
    email : string;
    password : string;
}
export interface LoginForm{
    userName : string;
    password : string;
}
export interface LoginResponse{
    statusCode : string;
    statusMessage : string;
    token : string;
}
export interface UserData{
    id : string;
    userName : string;
    email : string;
    roleName : string;
}
export interface Column {
    field: string;
    header: string;
}