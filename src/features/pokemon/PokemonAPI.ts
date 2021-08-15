import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

// GraphQL Client
const pokeClient = new ApolloClient({
  // uri: 'https://beta.pokeapi.co/graphql/v1beta',
  uri: "https://graphql-pokeapi.vercel.app/api/graphql",
  cache: new InMemoryCache(),
});

// const QUERY_ALL = gql`
//     query QueryAll {
//         pokemon_v2_pokemon(limit: 10) {
//             id
//             name
//             height
//             weight
//         }
//     }
// `

const QUERY_ALL = gql`
  query QueryAll {
    pokemons(limit: 10) {
      results {
        id
        name
        image
        artwork
        url
      }
    }
  }
`;

const QUERY_ONE = gql`
  query QueryOne($name: String!) {
    pokemon(name: $name) {
      height
      weight
      types {
        type {
          name
        }
      }
    }
  }
`;

export { pokeClient, QUERY_ALL, QUERY_ONE };
