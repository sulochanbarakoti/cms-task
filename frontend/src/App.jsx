import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
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

  const handleEdit = (item) => {
    setEditItem(item);
    setForm(item);
  };

  const fetchData = async (page, query = "") => {
    setLoading(true);
    try {
      const endpoint = query
        ? `http://localhost:9000/api/search?query=${encodeURIComponent(
            query
          )}&page=${page}&limit=10`
        : `http://localhost:9000/api/content?page=${page}&limit=10`;
      const response = await axios.get(endpoint);

      setContent(response.data.data);
      console.log(response.data);
      setPage(response.data.page);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    await axios.put(`http://localhost:9000/api/content/${editItem.id}`, form);
    setEditItem(null);
    fetchData();
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div>
      <h1>Content Management System</h1>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => fetchData(page, search)}>Search</button>
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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="bordered-table">
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
                <td>
                  <button onClick={() => handleEdit(item)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
