// =============================================
// 🔹 Auto Twitter Bot — Random Tweet Poster
// =============================================

import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Initialize Twitter client
const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_KEY_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET
});

// Load tweets from JSON file
const rawData = fs.readFileSync('./data/tweets.json');
const tweetsData = JSON.parse(rawData);
const tweets = tweetsData.tweets;

// Select a random tweet
function getRandomTweet() {
  const index = Math.floor(Math.random() * tweets.length);
  return tweets[index];
}

// Post tweet
async function postTweet() {
  try {
    const tweetText = getRandomTweet();
    const response = await client.v2.tweet(tweetText);
    console.log('✅ Tweet posted successfully!');
    console.log('📝 Text:', tweetText);
    console.log('🔗 Link: https://x.com/your_username/status/' + response.data.id);
  } catch (error) {
    console.error('❌ Error posting tweet:', error);
  }
}

// Run the bot
postTweet();
