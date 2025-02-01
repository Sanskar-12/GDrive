"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appWriteConfig } from "../appwrite/config";
import { avatarPlaceholderUrl } from "@/constants";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appWriteConfig.databaseId,
    appWriteConfig.usersCollectionId,
    [Query.equal("email", [email])]
  );

  return result.total > 0 ? result.documents[0] : null;
};

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const sendEmailOTP = async (email: string) => {
  const { account } = await createAdminClient();

  try {
    const sessionToken = await account.createEmailToken(ID.unique(), email);

    return sessionToken.userId;
  } catch (error) {
    handleError(error, "Failed to send OTP");
  }
};

export const createAccount = async ({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) => {
  const existingUser = await getUserByEmail(email);

  const userId = await sendEmailOTP(email);

  if (!userId) {
    throw new Error("Failed to send an OTP");
  }

  if (!existingUser) {
    const { databases } = await createAdminClient();

    await databases.createDocument(
      appWriteConfig.databaseId,
      appWriteConfig.usersCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        avatar: avatarPlaceholderUrl,
        accountId: userId,
      }
    );
  }

  return parseStringify({ userId });
};

export const verifySecret = async ({
  userId,
  password,
}: {
  userId: string;
  password: string;
}) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createSession(userId, password);

    const cookie = await cookies();

    cookie.set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Failed to verify OTP");
  }
};
