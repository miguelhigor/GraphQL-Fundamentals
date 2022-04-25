import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { GET_USERS } from "../App";
import { client } from "../lib/apollo";

const CREATE_USER = gql`
    mutation($name: String!){
        createUser(name: $name){
            id,
            name
        }
    }
`;

export function NewUserForm() {
    const [name, setName] = useState('');
    const [
        createUser,
        { data, loading, error }
    ] = useMutation(CREATE_USER);

    async function handleCreateUser(event: FormEvent) {
        event.preventDefault();

        if (!name) return;

        await createUser({
            variables: {
                name,
            },
            // Creates another request
            // refetchQueries: [GET_USERS],
            // Don't create new requests
            update: (cache, { data: { createUser } }) => {
                // Get all data from specified query
                const { users } = client.readQuery({
                    query: GET_USERS,
                });
                // update cache from specified query
                cache.writeQuery({
                    query: GET_USERS,
                    data: {
                        users: [
                            ...users,
                            createUser,
                        ],
                    },
                });
            },
        });
    }

    return (
        <form onSubmit={handleCreateUser}>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <button type="submit">Send</button>
        </form>
    );
}