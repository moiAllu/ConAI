import openAIClient from '../config/open-ai';

export const getGPTResponse = async (prompt: string) => {
  try {
    const chatCompletion = await openAIClient.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5',
      stream: false,
    });

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.log('getGPTResponse ', error);
    return 'Error generating AI response';
  }
};
