# 📡 YouTube Channel Checker API (Backend)

This is a Node.js + Express backend that checks whether a YouTube channel exists by name using the **YouTube Data API v3**. It returns the **top 5 matching channels** (if any), along with their **subscriber count**.

---

## 🚀 Features

- Search YouTube channels by name
- Return top 5 matches
- Show subscriber counts (or "Hidden")
- Handle cases where no channel is found

---

## 📁 Folder Structure

```
backend/
├── index.js         # Main Express server file
├── .env             # API key (excluded from Git)
├── package.json     # Node dependencies
```

---

## 🔧 Technologies Used

- **Node.js**
- **Express.js**
- **Axios** (for YouTube API requests)
- **dotenv** (for API key)

---

## 🛠️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/youtube-checker-backend.git
cd youtube-checker-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your API key to `.env`

```
YOUTUBE_API_KEY=your_api_key_here
```

### 4. Start the server

```bash
node index.js
```

Server runs at:  
🔗 `http://localhost:3000`

---

## 🔍 API Usage

### Endpoint:

```
GET /api/check-channel?name=<channel_name>
```

### Example:

```
GET /api/check-channel?name=mrbeast
```

---

## 🧠 Backend Flowchart

```
User requests:
  /api/check-channel?name=mrbeast
           │
           ▼
[1] Express server receives GET request
           │
           ▼
[2] Extract 'name' from req.query
    └──> If missing → return 400: "Channel name required"
           │
           ▼
[3] Call YouTube Search API:
    https://www.googleapis.com/youtube/v3/search
    → with query = name
    → type = channel
    → maxResults = 5
           │
           ▼
[4] YouTube returns matching channels
    └──> If 0 results → return JSON: "No channels found"
           │
           ▼
[5] Extract channelIds from search results
           │
           ▼
[6] Call YouTube Channels API:
    https://www.googleapis.com/youtube/v3/channels
    → Pass all channelIds
    → Request parts: statistics, snippet
           │
           ▼
[7] YouTube returns detailed channel data
           │
           ▼
[8] Format each result:
    - title
    - id
    - subscriberCount (or 'Hidden')
           │
           ▼
[9] Return JSON:
    {
      matches: [
        { title: "MrBeast", id: "...", subscribers: "266,000,000" },
        ...
      ]
    }
```

---

## 📌 Example Response

```json
{
  "matches": [
    {
      "title": "MrBeast",
      "id": "UCX6OQ3DkcsbYNE6H8uQQuVA",
      "subscribers": "266,000,000"
    }
  ]
}
```

Or if none found:

```json
{
  "message": "No channels found for 'xyzabc123'"
}
```

---
