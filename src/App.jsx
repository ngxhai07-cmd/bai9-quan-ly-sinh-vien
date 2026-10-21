import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import useFetch from "./hooks/useFetch";
import Clock from "./components/Clock";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./App.css";

const API = "https://6716abcd1234567890mock.mockapi.io/students";

export default function App() {
  const { theme, toggle } = useContext(ThemeContext);
  const { data: list, setData: setList, loading, error } = useFetch(API);

  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    document.title = `Quản lý sinh viên (${list.length})`;
  }, [list.length]);

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(keyword);
    }, 400);
    return () => clearTimeout(t);
  }, [keyword]);

  const handleSave = (sv) => {
    if (editing) {
      setList((prev) =>
        prev.map((item) => (item.id === editing.id ? { ...sv, id: editing.id } : item))
      );
      setEditing(null);
    } else {
      setList((prev) => [...prev, { ...sv, id: Date.now().toString() }]);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sinh viên này?")) {
      setList((prev) => prev.filter((sv) => sv.id !== id));
    }
  };

  const filtered = list.filter((sv) =>
    sv.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <header className="header">
          <h2>Quản lý sinh viên</h2>
          <div className="header-right">
            <Clock />
            <button onClick={toggle}>
              Theme: {theme === "light" ? "Sáng" : "Tối"}
            </button>
          </div>
        </header>

        <StudentForm
          editingStudent={editing}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />

        <div className="search-box">
          <input
            placeholder="Tìm kiếm theo tên..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        {loading && <p>Đang tải...</p>}
        {error && <p className="error">Lỗi: {error}</p>}
        {!loading && !error && (
          <StudentList
            list={filtered}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
