import User from '../models/User.js'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { issueAuthToken, serializeUser } from "../helpers/index.js";
import path from "path";
import fs from  'fs'
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import PostwImg from "../models/PostwImg.js";
import { createUploadStream } from '../modules/streams.js';
import AWS from 'aws-sdk'
const __dirname = path.resolve();
dotenv.config()
import { GraphQLError } from 'graphql';
import LastVideo from '../models/LastVideo.js';


const resolvers = {
    Query: {
        getAllPosts: async () => {
            const sortQuery = { createdAt: -1 };
            return await PostwImg.find().sort(sortQuery)
        },
        getLastVideo: async () => {
            const link = await LastVideo.findOne()
            return link.text
        }
    },
    Mutation: {
        deletePost: async (parent, args, context, info) => {
            const { id } = args
            await PostwImg.findByIdAndDelete(id)
            return "Post deleted"
        },
        createPost: async (parent,{ post }) => {
            const {title, sourceCode, videoLink} = post;
            if (!title) {
                throw new GraphQLError("Input title");
            }
            if (!videoLink) {
                throw new GraphQLError("Input video Link");
            }
            if (!sourceCode) {
                throw new GraphQLError("Input source Code");
            }
            const postwimg = new PostwImg({ title, sourceCode, videoLink })
            await postwimg.save()
            return postwimg;
        },
        registerUser: async(parent, args, context, info) => {
            try {
                const { fullname, email, password } = args.about
            const {id} = args
            const already_exsist = await User.findOne({ email });
            if (already_exsist) {
            throw new GraphQLError("Email already exists");
            }
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);
            const user = new User({ fullname, email, passwordHash, roles:"ADMIN" })
            let result = await user.save()
            result = await serializeUser(result);
            const token = await issueAuthToken({id, email});

            return {token, user}
            } catch (err) {
                throw (err.message);
            } 

        },
        loginUser: async (_, args, context, info) => {
            const { email, password, roles, id } = args.about
            const user = await User.findOne(
            {email}
            );
            if (!user) {
                    throw new GraphQLError("Invalid email given");
            }
            const isValidPass = await bcrypt.compare(password, user.passwordHash);
            if (!isValidPass) {
                throw new GraphQLError("Invalid password given!");
            }
            let result = await user.save()
            result = await serializeUser(result);
            const token = await issueAuthToken({id, email});
            return {user, token}
        },
        lastVideo: async (_, {text}, context, info) => {
            // let number = 6452954934773fbb68651a96
            let id = "6452954934773fbb68651a96"
            const linkchange = await LastVideo.findByIdAndUpdate(
                id,
                {text},
                { new: true }
            );
            console.log(linkchange)
            return "Done"
        }
    }
}

export default resolvers