<h1 align="center">CMS Task: Content Management System</h1>

<p align="center">
  A simple Content Management System (CMS) built with <strong>Express.js</strong> for the backend, <strong>React.js</strong> for the frontend, and <strong>SQLite</strong> for the database. This application allows administrators to manage words and phrases effectively.
</p>

---

<h2>Features</h2>

<ul>
  <li><strong>View Words and Phrases:</strong> Paginated list of words and phrases stored in the local SQLite database.</li>
  <li><strong>Edit Words and Phrases:</strong> Update word, translation, and example sentence via an editable form.</li>
  <li><strong>Search:</strong> Filter words and phrases by keywords.</li>
  <li><strong>Pagination:</strong> Navigate through pages of data.</li>
  <li><strong>Load Initial Data:</strong> Load content from a JSON file into the SQLite database.</li>
</ul>

---

<h2>Technologies Used</h2>

<ul>
  <li><strong>Backend:</strong> Node.js with Express.js</li>
  <li><strong>Frontend:</strong> React.js</li>
  <li><strong>Database:</strong> SQLite</li>
  <li><strong>Other Tools:</strong> Axios, Nodemon</li>
</ul>

---

<h2>Setup Instructions</h2>

<h3>Backend</h3>
<ol>
  <li>Navigate to the backend directory:
    <pre><code>cd backend</code></pre>
  </li>
  <li>Install dependencies:
    <pre><code>npm install</code></pre>
  </li>
  <li>Start the server:
    <pre><code>npm run start</code></pre>
  </li>
</ol>

<h3>Frontend</h3>
<ol>
  <li>Navigate to the frontend directory:
    <pre><code>cd frontend</code></pre>
  </li>
  <li>Install dependencies:
    <pre><code>npm install</code></pre>
  </li>
  <li>Start the development server:
    <pre><code>npm start</code></pre>
  </li>
</ol>

---

<h2>Endpoints</h2>

<h3>Content</h3>
<pre>
<code>GET /api/content?page=<page>&limit=<limit></code>
</pre>
<p>Fetch paginated words and phrases.</p>

<h3>Search</h3>
<pre>
<code>GET /api/search?query=<query>&page=<page>&limit=<limit></code>
</pre>
<p>Search for words and phrases by keyword.</p>

---

<h2>Database Initialization</h2>

<p>The initial data is loaded from the following JSON file:</p>
<pre><code>https://pecto-content-f2egcwgbcvbkbye6.z03.azurefd.net/language-data/language-data/russian-finnish/cards/curated_platform_cards/sm1_new_kap1.json</code></pre>

<p>Run the following script to populate the database:</p>
<pre><code>node loadData.js</code></pre>

---

<h2>Project Structure</h2>

<pre>
<strong>backend/</strong>
├── routes/
│   ├── content.js
│   ├── search.js
├── db/
│   ├── database.sqlite
├── loadData.js
├── server.js

<strong>frontend/</strong>
├── src/
│   ├── pages/
├── App.js
├── index.js
</pre>

---

<h2>License</h2>

<p>This project is licensed under the MIT License. Feel free to use, modify, and distribute it.</p>
