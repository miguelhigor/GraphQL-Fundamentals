import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/User";
import { v4 as uuidV4 } from 'uuid';

@Resolver()
export class UserResolver {
    private data: User[] = [];

    @Query(() => [User])
    async users() {
        return this.data;
    }

    @Mutation(() => User)
    async createUser(
        @Arg('name') name: string,
    ) {
        const id = uuidV4();
        const user = {
            id,
            name
        }

        this.data.push(user);
        return user;
    }

}