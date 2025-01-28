import { sampleQuestions, Question } from './sampleQuestions';

export function getDailyQuestions(count: number = 3): Question[] {
  // Use the current date as a seed to consistently select the same questions for the day
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  
  // Simple pseudo-random number generator
  const random = (max: number) => {
    let x = Math.sin(seed + max) * 10000;
    return Math.floor((x - Math.floor(x)) * max);
  };

  // Shuffle array using the seeded random function
  const shuffled = [...sampleQuestions].sort(() => random(2) - 1);
  
  // Return the first 'count' questions
  return shuffled.slice(0, count);
}
