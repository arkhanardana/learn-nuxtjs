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
    const posts = await db.post.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
    });

    if (!posts) {
      throw createError({
        statusCode: 404,
        message: "Posts not found",
      });
    }
    return posts;
  } catch (error) {
    console.log(error);
    throw createError({ statusCode: 500, message: "Internal Server Error" });
  }
});
