const natural = require('natural');
const use = require('@tensorflow-models/universal-sentence-encoder');
const tf = require('@tensorflow/tfjs-node');
const nlp = require('compromise'); 
const TextStatistics = require('text-statistics');


export const getEmbeddings = async (sentences) =>  {
  const model = await use.load();
  const embeddings = await model.embed(sentences);
  return embeddings;
}

export const cosineSimilarity = (vecA, vecB)=> {
    const dotProduct = tf.dot(vecA, vecB).dataSync()[0];
    const magnitudeA = tf.norm(vecA).dataSync()[0];
    const magnitudeB = tf.norm(vecB).dataSync()[0];
    return dotProduct / (magnitudeA * magnitudeB);
  }
  
export const calculateSimilarities= async (embeddings)=> {
    const embeddingsArray = embeddings.arraySync();
    const similarities = [];
  
    for (let i = 0; i < embeddingsArray.length; i++) {
      for (let j = i + 1; j < embeddingsArray.length; j++) {
        const sim = cosineSimilarity(
          tf.tensor(embeddingsArray[i]),
          tf.tensor(embeddingsArray[j])
        );
        similarities.push(sim);
      }
    }
  
    return similarities;
  }

  const  calculateStatistics = (similarities) => {
    const sum = similarities.reduce((a, b) => a + b, 0);
    const average = sum / similarities.length;
  
    const variance =
      similarities.reduce((a, b) => a + Math.pow(b - average, 2), 0) /
      similarities.length;
    const standardDeviation = Math.sqrt(variance);
  
    return { average, standardDeviation };
  }

function getNGrams(tokens, n) {
  const ngrams = [];
  for (let i = 0; i <= tokens.length - n; i++) {
    ngrams.push(tokens.slice(i, i + n).join(' '));
  }
  return ngrams;
}



export const similarityCheck = async ()=>{
    const tokenizer = new natural.SentenceTokenizer();
    const text = "A typical essay follows a clear structure of introduction, body paragraphs, and a conclusion. The introduction provides a brief overview of the topic and states the thesis statement. The thesis should clearly state the main argument or point of view the author will be discussing in the essay.Following the introduction, the body paragraphs should provide evidence, examples, and analysis that support the thesis statement. Each paragraph should focus on a specific point or idea related to the main argument. It's important to provide strong evidence and examples to support your claims, whether that be through research, personal experience, or expert opinions.Transitional phrases should be used to connect paragraphs and ideas smoothly throughout the essay. This helps the reader follow the logical flow of the argument and allows for a cohesive and well-structured piece of writing."
    // const text="This inconsistency is visible in the revenue screenshot I provided. While I continue receiving payments, the static balance in the dashboard could create confusion or concern for users, leading them to believe their funds haven’t been paid out or that there’s an issue, such as a ban.I’ve attached a screenshot of the email I sent, which may help illustrate the communication gap some users might experience. Improved support responsiveness would greatly enhance the user experience.While I’m certainly happy with the increased revenue, I’ve noticed a few potential areas of concern for users, especially those new to the platform. One of the most common issues I’ve encountered revolves around trust and security. Hydro.Online has many users and proponents, but like any emerging platform, it’s crucial that it earns and maintains user trust over time."
    const nlpText = nlp(text);
    const tokens = nlpText.terms().out('array');
    const sentences = tokenizer.tokenize(text);
    const embeddings= await getEmbeddings(sentences);
    const similarities = await calculateSimilarities(embeddings);
    const stats = calculateStatistics(similarities);
    const bigrams = getNGrams(tokens, 2,);
    const textStats = new TextStatistics(text);
    const readingEase = textStats.fleschKincaidReadingEase();
    const bigramFreq = bigrams.reduce((acc, bigram) => {
     acc[bigram] = (acc[bigram] || 0) + 1;
    return acc;
    }, {});

    const result = {
        averageSimilarity: stats.average,
        standardDeviation: stats.standardDeviation,
        sentenceCount: sentences.length,
        readingEase: readingEase,
        // Add more analysis results as needed
      };
      return result;
}
