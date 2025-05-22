const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 3000;
const API_KEY = process.env.YOUTUBE_API_KEY;
const cors = require("cors");
app.use(cors());

app.use(express.static("public"));

app.get("/api/check-channel", async (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ error: "Channel name is required" });

  try {
    // Step 1: Search for channels
    const searchRes = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          key: API_KEY,
          type: "channel",
          part: "snippet",
          q: name,
          maxResults: 5,
        },
      }
    );

    const items = searchRes.data.items;

    if (items.length === 0) {
      return res.json({ message: `No channels found for '${name}'` });
    }

    // Step 2: Get channel details (subscriber counts)
    const channelIds = items.map((i) => i.snippet.channelId).join(",");

    const statsRes = await axios.get(
      "https://www.googleapis.com/youtube/v3/channels",
      {
        params: {
          key: API_KEY,
          id: channelIds,
          part: "snippet,statistics",
        },
      }
    );

    const results = statsRes.data.items.map((ch) => ({
      title: ch.snippet.title,
      id: ch.id,
      subscribers: ch.statistics.hiddenSubscriberCount
        ? "Hidden"
        : Number(ch.statistics.subscriberCount).toLocaleString(),
    }));

    res.json({ matches: results });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch channel data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
