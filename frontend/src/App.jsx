import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [content, setContent] = useState([]);
  const [search, setSearch] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({
    word_first_lang: "",
    word_second_lang: "",
    sentence_first_lang: "",
    sentence_second_lang: "",
    example: "",
  });

  const fetchContent = async (query) => {
    const response = await axios.get(
      `http://localhost:9000/api/${query ? `search?query=${query}` : "content"}`
    );
    setContent(response.data);
    console.log(response.data);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setForm(item);
  };

  const handleSave = async () => {
    await axios.put(`http://localhost:9000/api/content/${editItem.id}`, form);
    setEditItem(null);
    fetchContent();
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return (
    <div>
      <h1>Content Management System</h1>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => fetchContent(search)}>Search</button>
      <table>
        <thead>
          <tr>
            <th>First Word</th>
            <th>Sentence</th>
            <th>Second Word</th>
            <th>Sentence</th>
          </tr>
        </thead>
        <tbody>
          {content.map((item) => (
            <tr key={item.id}>
              <td>{item.word_first_lang}</td>
              <td>{item.sentence_first_lang}</td>
              <td>{item.word_second_lang}</td>
              <td>{item.sentence_second_lang}</td>
              <td>{item.example}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editItem && (
        <div>
          <h2>Edit Content</h2>
          <input
            type="text"
            placeholder="First Word"
            value={form.word_first_lang}
            onChange={(e) =>
              setForm({ ...form, word_first_lang: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="First Sentence"
            value={form.sentence_first_lang}
            onChange={(e) =>
              setForm({ ...form, sentence_first_lang: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Second Word"
            value={form.word_second_lang}
            onChange={(e) =>
              setForm({ ...form, word_second_lang: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Second Sentence"
            value={form.sentence_second_lang}
            onChange={(e) =>
              setForm({ ...form, sentence_second_lang: e.target.value })
            }
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditItem(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default App;
