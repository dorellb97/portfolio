// import singleTypeDefs from ''

const typeDefs = `#graphql
  type Post {
    id: ID
    title: String
    sourceCode: String
    videoLink: String
  }

  type User{
    id: ID
    fullname: String
    email: String
  }
  type AuthPayload {
    user: User
    token: String
  }
  type Query {
    getAllPosts: [Post]
    getLastVideo: String
  }

  type Image {
  id: ID!
  filename: String!
  url: String!
}

  input PostInput {
    title: String
    sourceCode: String
    videoLink: String
  }

  input LoginInput{
    email: String
    password: String!
  }

  input RegisterInput{
    fullname: String!
    email: String!
    password: String!
  }

  type Mutation {
    createPost(post: PostInput): Post
    deletePost(id: ID): String
    loginUser(id: ID, about: LoginInput): AuthPayload
    registerUser(id: ID, about: RegisterInput): AuthPayload
    lastVideo(text: String) : String
  }
`;


export default typeDefs