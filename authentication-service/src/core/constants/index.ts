import { UserService } from "../../application/services";
import { SignupUserUseCase } from "../../application/use-cases";
import { MongoUserRepository } from "../../infrastructure/database";

export const userService = new UserService(new MongoUserRepository());
export const signupUser = new SignupUserUseCase(userService);
