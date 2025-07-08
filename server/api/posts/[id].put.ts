import db from "~/lib/db";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id;
    const body = await readBody(event);

    if (!id) {
      throw createError({
        statusCode: 400,
        message: "Post not found",
      });
    }

    if (!body) {
      throw createError({
        statusCode: 400,
        message: "Request body is empty",
      });
    }

    const updatedPost = db.post.update({
      where: {
        id: id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return updatedPost;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: "Internal server error",
    });
  }
});
