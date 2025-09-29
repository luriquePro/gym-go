export interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface ICreatedUserResponse {
  id: string;
  name: string;
  email: string;
}
