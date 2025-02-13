import { Rewrite } from "../mongodb/models";
export const storeAiGeneratedRewrite = async (
  intensity: string,
  mode: string,
  inputLanguage: string,
  content: string,
  userId: string,
  model: string,
  output: string
) => {
  try {
    if (!content || !output || !userId) {
      throw new Error("Missing required fields");
    }
    const rewrite = await Rewrite.findOne({
      userId,
    });

    if (rewrite) {
      rewrite.rewrites.push({
        input: content,
        output,
        created_at: new Date(),
        intensity,
        mode,
        inputLanguage,
      });
      await rewrite.save();
      return rewrite.rewrites.at(-1);
    }
    const newRewrite = new Rewrite({
      userId: userId,
      rewrites: [
        {
          input: content,
          output,
          created_at: new Date(),
          intensity,
          mode,
          inputLanguage,
        },
      ],
    });
    await newRewrite.save();
    return newRewrite.rewrites.at(-1);
  } catch (e) {
    throw e;
  }
};
export const getAiGeneratedRewriteHistory = async (userId: string) => {
  try {
    if (!userId) {
      throw new Error("Missing required fields");
    }
    return await Rewrite.find({ userId });
  } catch (e) {
    throw e;
  }
};
export const getAiGeneratedRewriteById = async (
  docId: string,
  userId: string
) => {
  try {
    if (!docId || !userId) {
      throw new Error("Missing required fields");
    }
    return await Rewrite.findOne(
      { userId },
      { rewrites: { $elemMatch: { _id: docId } } }
    );
  } catch (e) {
    throw e;
  }
};
export const deleteAiGeneratedRewriteById = async (
  docId: string,
  userId: string
) => {
  try {
    if (!docId || !userId) {
      throw new Error("Missing required fields");
    }
    const rewrite = await Rewrite.findOne({ userId });
    if (!rewrite) {
      throw new Error("Document not found");
    }
    const index = rewrite.rewrites.findIndex(
      (doc) => doc._id.toString() === docId.toString()
    );
    if (index === -1) {
      throw new Error("Document not found");
    }

    rewrite.rewrites.splice(index, 1);
    await rewrite.save();

    return true;
  } catch (e) {
    throw e;
  }
};
