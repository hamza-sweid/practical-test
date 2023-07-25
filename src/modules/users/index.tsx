import React, { useEffect, useState } from 'react';
import style from '../../styles/pages/users.module.scss';
import Popup from '../../components/popup';
import inputStyle from '../../styles/common/input.module.scss';
import { getUsers } from '../../services/users';
import { User } from '../../interface/users';
import { getUserRole, logout } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { setMessage } from '../../utils/message';

interface SortConfig {
  key: string | null;
  direction: string;
}
const user = { email: '', fullName: '', age: 0, role: '' };

const TableComponent = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<User[]>([]);
  const [filters, setFilters] = useState({
    name: '',
    age: '',
    email: '',
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'ascending',
  });
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>(user);
  const isUserLoggedIn = localStorage.getItem('isUserLoggedIn');
  const userRole = getUserRole();

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate('/login');
    }
    const fetchUsers = async () => {
      const users = await getUsers();
      setTableData(users as User[]);
    };
    fetchUsers();
  }, []);

  const handleLogout = () => {
    logout();
    setMessage({
      type: 'success',
      content: 'Logout Successful',
    });
    navigate('/login');
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const filteredData = tableData.filter((row) => {
    return (
      row.age.toString().includes(filters.age) &&
      row.fullName.toLowerCase().includes(filters.name.toLowerCase()) &&
      row.email.toLowerCase().includes(filters.email.toLowerCase())
    );
  });

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = () => {
    const sortableData = [...filteredData];
    if (sortConfig.key !== null) {
      sortableData.sort((a: any, b: any) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setShowPopup(true);
  };

  const handleSubmit = async (values: User) => {
    setMessage({
      type: 'success',
      content: 'User Updated Successfully',
    });
    setShowPopup(false);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={style.users}>
      <div className={style.tableContainer}>
        <div className={style.header}>
          <h1>Users List</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className={style.search}>
          <label className={inputStyle.inputContainer}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={filters.name}
              onChange={handleFilterChange}
            />
            <span>Search by Name</span>
          </label>
          <label className={inputStyle.inputContainer}>
            <input
              type="text"
              name="age"
              placeholder="Age"
              value={filters.age}
              onChange={handleFilterChange}
            />
            <span>Search by Age</span>
          </label>
          <label className={inputStyle.inputContainer}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={filters.email}
              onChange={handleFilterChange}
            />
            <span>Search by Email</span>
          </label>
        </div>

        <table className={style.customTable}>
          <thead>
            <tr>
              <th onClick={() => requestSort('name')}>Full Name</th>
              <th onClick={() => requestSort('age')}>Age</th>
              <th onClick={() => requestSort('age')}>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedData().map((row) => (
              <tr key={row.email}>
                <td>{row.fullName}</td>
                <td>{row.age}</td>
                <td>{row.email}</td>
                <td className={style.action}>
                  {userRole === 'admin' && (
                    <button
                      className={style.editButton}
                      onClick={() => handleEditClick(row)}
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <p className={style.noData}>No Data Available</p>
        )}

        {showPopup && (
          <Popup
            user={selectedUser}
            onClose={closePopup}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default TableComponent;
