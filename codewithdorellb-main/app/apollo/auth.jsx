import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation Mutation($loginUserId: ID, $about: LoginInput) {
  loginUser(id: $loginUserId, about: $about) {
    user {
      id
      fullname
      email
    }
    token
  }
}
`