import { gql, useQuery } from "@apollo/client"

type User = {
  id: string;
  name: string;
}

const GET_USERS = gql`
  query {
    users {
      id,
      name
    }
  }
`;

function App() {
  const { data, loading } = useQuery<{ users: User[] }>(GET_USERS);

  if (loading) {
    return <p>Loading...</p>
  }
  return (
    <ul>
      {data?.users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}

export default App
