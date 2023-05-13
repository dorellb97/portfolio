// import { bucket, s3 } from "./bucket.js";
// import stream from "stream";
// import { Upload } from "@aws-sdk/lib-storage";
// export const createUploadStream = (key) => {
//   const pass = new stream.PassThrough();
//   return {
//     writeStream: pass,
//     promise: new Upload({
//         client: s3,
//         params: {
//           Bucket: bucket,
//           Key: key,
//           Body: pass,
//         }
//       }),
//   };
// };
import { S3Client } from "@aws-sdk/client-s3";
import { fromUtf8 } from "@aws-sdk/util-utf8-node";
import { Upload } from "@aws-sdk/lib-storage";

export const bucket = process.env.BUCKET_NAME;

export const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.ACCESS_KEY_SECRET,
  },
});

export const createUploadStream = (key) => {
  const pass = new stream.PassThrough();
  return {
    writeStream: pass,
    promise: new Upload({
        client: s3,
        params: {
          Bucket: bucket,
          Key: key,
          Body: pass.pipe(fromUtf8()), // note that we need to convert to utf-8
        }
      }),
  };
};
