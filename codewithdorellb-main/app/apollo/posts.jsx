import { gql } from "@apollo/client/core";

export const GET_POSTS = gql`
query Query {
  getAllPosts {
    id
    title
    sourceCode
    videoLink
    imgLink
  }
}
`;

export const GET_ONE_POST = gql`
query GetPost($getPostId: ID) {
  getPost(id: $getPostId) {
    id
    title
    sourceCode
    videoLink
    imgLink
    updatedAt
  }
}
`

export const DELETE_POST = gql`
mutation Mutation($deletePostId: ID) {
    deletePost(id: $deletePostId)
}
`

export const CREATE_POST = gql`
mutation CreatePost($post: PostInput) {
  createPost(post: $post) {
    id
    title
    sourceCode
    videoLink
    imgLink
  }
}
`

export const GET_LAST_VIDEO = gql`
query Query {
  getLastVideo
}
`

export const CHANGE_LAST_VIDEO = gql`
mutation Mutation($text: String) {
  lastVideo(text: $text)
}
`