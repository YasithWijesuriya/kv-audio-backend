import crypto from "crypto";
import {
  S3Client,
  PutObjectCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY
  }
});

export async function createPresignedUpload(req, res) {
  try {
    if (req.user == null || req.user.role !== "admin") {
      res.status(403).json({ message: "Unauthorized" });
      return;
    }

    const { contentType, folder } = req.body;
    if (!contentType) {
      res.status(400).json({ message: "contentType is required" });
      return;
    }

    const fileKey = `${folder ? folder.replace(/\/+$/,'') + '/' : ''}${Date.now()}-${crypto.randomBytes(8).toString("hex")}`;

    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
      Key: fileKey,
      ContentType: contentType,
      ACL: "public-read"
    });

    const expiresIn = 60 * 5; // 5 minutes
    const uploadUrl = await getSignedUrl(r2Client, command, { expiresIn });

    const publicUrl = `https://${process.env.CLOUDFLARE_PUBLIC_DOMAIN}/${fileKey}`;

    res.json({ uploadUrl, publicUrl, key: fileKey, expiresIn });
  } catch (e) {
    res.status(500).json({ message: "Failed to create presigned URL" });
  }
}



