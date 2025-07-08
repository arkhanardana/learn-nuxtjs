import { auth } from "~/lib/auth";
import db from "~/lib/db";

export default defineEventHandler(async (event) => {
  try {
    const session = await auth.api.getSession({
      headers: event.headers,
    });

    const userId = session?.user?.id;
    const id = event.context.params?.id;

    const post = await db.post.findFirst({
      where: {
        id: id,
        userId: userId,
      },
      include: {
        user: true,
      },
    });

    if (!post) {
      throw createError({
        statusCode: 404,
        message: "Post not found",
      });
    }

    return post;
  } catch (error) {
    console.log(error);

    throw createError({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});
