// Import the necessary modules
import {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
  } from "@aws-sdk/client-s3";
  import { Jimp ,JimpMime} from "jimp"; // Correct import
  
  // Create an S3 client
  const s3 = new S3Client({ region: "ap-southeast-2" }); // Adjust the region as necessary
  
  export const handler = async (event) => {
    // Get the bucket name and object key from the event
    const sourceBucket = event.Records[0].s3.bucket.name;
    const imageKey = event.Records[0].s3.object.key;
  
    // Define the destination bucket
    const destinationBucket = "tfdemo-dest-bkt";
  
    try {
      // Fetch the image from S3
      const getObjectParams = {
        Bucket: sourceBucket,
        Key: imageKey,
      };
      const getObjectCommand = new GetObjectCommand(getObjectParams);
      const s3Object = await s3.send(getObjectCommand);
  
      // Convert the image to 256x256 using Jimp
      const imageBuffer = await streamToBuffer(s3Object.Body);
      console.log(imageBuffer);
      const image = await Jimp.read(imageBuffer);
  
      // Ensure valid values for resize
      const width = 256;
      const height = 256;
  
      // Resize the image to 256x256
      const resizedImage = await image
        .resize({w: width, h:height }).getBuffer(JimpMime.png);
  
      // Define a new key for the resized image (prefixing with 'resized/')
      const resizedImageKey = `resized/${imageKey}`;
  
      // Upload the resized image to the destination bucket
      const putObjectParams = {
        Bucket: destinationBucket,
        Key: resizedImageKey,
        Body: resizedImage,
        ContentType: "image/png", // Jimp always outputs PNG by default
      };
      const putObjectCommand = new PutObjectCommand(putObjectParams);
      await s3.send(putObjectCommand);
  
      return {
        statusCode: 200,
        body: JSON.stringify(
          `Successfully resized ${imageKey} to 256x256 and uploaded to ${resizedImageKey}`
        ),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify(`Error: processing ${imageKey}: ${error.message}`),
      };
    }
  };
  
  // Helper function to convert a stream to a buffer
  const streamToBuffer = (stream) => {
    return new Promise((resolve, reject) => {
      const chunks = [];
      stream.on("data", (chunk) => chunks.push(chunk));
      stream.on("end", () => resolve(Buffer.concat(chunks)));
      stream.on("error", reject);
    });
  };
  