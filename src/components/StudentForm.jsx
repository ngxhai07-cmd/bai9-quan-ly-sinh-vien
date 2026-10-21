import { useState, useEffect, useRef } from "react";

const emptyForm = {
  maSV: "",
  name: "",
  email: "",
  major: "CNTT",
  gpa: ""
};

export default function StudentForm({ editingStudent, onSave, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (editingStudent) {
      setForm(editingStudent);
      setError("");
      inputRef.current.focus();
    } else {
      setForm(emptyForm);
    }
  }, [editingStudent]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.maSV || !form.name || !form.email || form.gpa === "") {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const gpaNum = parseFloat(form.gpa);
    if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) {
      setError("GPA phải từ 0 đến 4");
      return;
    }

    setError("");
    onSave({ ...form, gpa: gpaNum });
    if (!editingStudent) {
      setForm(emptyForm);
      inputRef.current.focus();
    }
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h3>{editingStudent ? "Sửa sinh viên" : "Thêm sinh viên"}</h3>
      {error && <p className="error">{error}</p>}

      <div className="form-row">
        <input
          name="maSV"
          placeholder="Mã SV"
          value={form.maSV}
          onChange={handleChange}
        />
        <input
          ref={inputRef}
          name="name"
          placeholder="Họ tên"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <select name="major" value={form.major} onChange={handleChange}>
          <option value="CNTT">CNTT</option>
          <option value="ATTT">ATTT</option>
          <option value="VT">Viễn thông</option>
          <option value="ĐPT">Đa phương tiện</option>
        </select>
        <input
          name="gpa"
          type="number"
          step="0.1"
          placeholder="GPA (0-4)"
          value={form.gpa}
          onChange={handleChange}
        />
      </div>

      <div className="form-btns">
        <button type="submit">
          {editingStudent ? "Cập nhật" : "Thêm"}
        </button>
        {editingStudent && (
          <button type="button" onClick={onCancel}>
            Hủy
          </button>
        )}
      </div>
    </form>
  );
}
