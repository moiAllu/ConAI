import { IChat } from '@/app/dashboard/ai-chat/store';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isDev() {
  return process.env.NODE_ENV === 'development';
}

interface IndexedChatMessages {
  category: string;
  chats: IChat[];
}
export function categorizeChatMessages(
  chatMessages: IChat[]
): IndexedChatMessages[] {
  const categorizedMessages: { [key: string]: IChat[] } = {};

  const now = new Date(); // Current date and time

  // Iterate through each chat message
  chatMessages.forEach((message) => {
    const messageDate = message.createdAt;
    const diffTime = now.getTime() - new Date(messageDate).getTime();
    // Convert difference to days
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24) - 1);

    // Determine category based on days difference
    let category: string;
    if (diffDays === 0) {
      category = 'Today';
    } else if (diffDays === 1) {
      category = 'Yesterday';
    } else if (diffDays <= 7) {
      category = `${diffDays} days ago`;
    } else if (diffDays <= 14) {
      category = '1 week ago';
    } else if (diffDays <= 30) {
      category = '2 weeks ago';
    } else {
      category = '1 month ago';
    }

    // Initialize category array if not exists
    if (!categorizedMessages[category]) {
      categorizedMessages[category] = [];
    }

    // Push the message to the respective category
    categorizedMessages[category].push(message);
  });

  // Convert categorizedMessages into an array of IndexedChatMessages
  const indexedCategories: IndexedChatMessages[] = Object.keys(
    categorizedMessages
  ).map((category) => ({
    category,
    chats: categorizedMessages[category],
  }));

  return indexedCategories;
}
