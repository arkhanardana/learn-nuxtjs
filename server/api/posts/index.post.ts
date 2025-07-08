import { generateId } from "better-auth";
import { auth } from "~/lib/auth";
import db from "~/lib/db";

export default defineEventHandler(async (event) => {
  try {
    const session = await auth.api.getSession({
      headers: event.headers,
    });

    if (!session) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    const userId = session?.user?.id;
    const body = await readBody(event);

    if (!body) {
      throw createError({
        statusCode: 400,
        message: "Request body is empty",
      });
    }

    const newPost = await db.post.create({
      data: {
        id: generateId(),
        title: body.title,
        content: body.content,
        userId: userId,
      },
    });

    return newPost;
  } catch (error) {
    console.log(error);

    throw createError({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});
