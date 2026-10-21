export default function StudentList({ list, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Mã SV</th>
          <th>Họ tên</th>
          <th>Email</th>
          <th>Ngành</th>
          <th>GPA</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {list.map((sv) => (
          <tr key={sv.id}>
            <td>{sv.maSV}</td>
            <td>{sv.name}</td>
            <td>{sv.email}</td>
            <td>{sv.major}</td>
            <td>{sv.gpa}</td>
            <td>
              <button onClick={() => onEdit(sv)}>Sửa</button>
              <button onClick={() => onDelete(sv.id)}>Xóa</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
