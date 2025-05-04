// src/bertAnalyzer.js
import { pipeline } from '@xenova/transformers';

let classifier = null;

export async function analyzeSentiment(text) {
  if (!classifier) {
    classifier = await pipeline('sentiment-analysis');
  }

  const results = await classifier(text);
  return results[0]; // e.g., { label: "POSITIVE", score: 0.98 }
}
