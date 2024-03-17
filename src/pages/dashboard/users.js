import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import { RiUserUnfollowLine, RiUserFollowLine } from 'react-icons/ri';
import Layout from '@/components/layout';
import { Dropdown } from 'flowbite-react';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    cellphoneNumber: '',
    status: 'active',
    bio: '',
    image: '',
  });

  useEffect(() => {
    // Fetch users from /api/users/list
    axios
      .get('/api/users/list')
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleToggleStatus = (id, status) => {
    // Toggle user status (suspend or activate) based on current status
    const endpoint =
      status === 'suspended'
        ? `/api/users/activate?id=${id}`
        : `/api/users/suspend?id=${id}`;
    console.log('Toggling user status:', id, status);
    console.log('endpoint:', endpoint);
    axios
      .get(endpoint)
      .then((response) => {
        // Update user status in the UI
        console.log('response:', response);
        setUsers(response.data.data.users);
      })
      .catch((error) => {
        console.error('Error toggling user status:', error);
      });
  };

  const handleDeleteUser = (id) => {
    // Delete user with the specified ID
    axios
      .get(`/api/users/delete?id=${id}`)
      .then((response) => {
        // Remove the deleted user from the UI
        setUsers(response.data.data.users);
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  const handleAddUser = () => {
    // Open modal to add new user
    setSelectedUser(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      cellphone: '',
      bio: '',
      image: '',
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditUser = (user) => {
    // Open modal to edit user details
    setSelectedUser(user);
    console.log("selecting", user)
    setShowModal(true);
    setFormData(user);
  };

  const handleSaveUser = (e) => {
    // Save user details
    // If user ID exists, it's an edit, otherwise, it's a new user
    e.preventDefault()
    const endpoint = formData._id ? '/api/users/edit' : '/api/users/add';
    console.log('Saving user:', formData);
    console.log('endpoint:', endpoint);
    axios
      .post(endpoint, formData)
      .then((response) => {
        // Update user data in the UI
        console.log('response:', response.data);
        setUsers(
            response.data.data
          );
        setShowModal(false);
        setSelectedUser(null);
      })
      .catch((error) => {
        console.error('Error saving user:', error);
      });
  };
 console.log("selectedUser", selectedUser)
  return (
    <Layout>
      <div className='min-h-screen bg-gray-50 p-8'>
        <div className='container mx-auto'>
          <h1 className='text-3xl font-semibold mb-4'>Users</h1>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mb-4'
            onClick={handleAddUser}
          >
            Add New User
          </button>
          <table className='w-full bg-gray-100 rounded-lg overflow-hidden mb-4'>
            <thead className='bg-gray-200 text-gray-700'>
              <tr>
                <th className='text-left px-4 py-2'>First Name</th>
                <th className='text-left px-4 py-2'>Last Name</th>
                <th className='text-left px-4 py-2'>Email</th>
                <th className='text-left px-4 py-2'>Cellphone</th>
                <th className='text-left px-4 py-2'>Status</th>
                <th className='text-left px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user.id} className='hover:bg-gray-200'>
                  <td className='text-left px-4 py-2'>{user.firstName}</td>
                  <td className='text-left px-4 py-2'>{user.lastName}</td>
                  <td className='text-left px-4 py-2'>{user.email}</td>
                  <td className='text-left px-4 py-2'>
                    {user.cellphoneNumber}
                  </td>
                  <td className='text-left px-4 py-2'>
                    {user.status === 'suspended' ? 'Suspended' : 'Active'}
                  </td>
                  <td className='text-left px-4 py-2'>
                    <Dropdown label='Actions'>
                      <Dropdown.Item
                        icon={
                          user.status === 'suspended'
                            ? RiUserFollowLine
                            : RiUserUnfollowLine
                        }
                        onClick={() =>
                          handleToggleStatus(user._id, user.status)
                        }
                      >
                        {user.status === 'suspended' ? 'Activate' : 'Suspend'}
                      </Dropdown.Item>
                      <Dropdown.Item
                        icon={AiFillEdit}
                        onClick={() => handleEditUser(user)}
                      >
                        Edit{' '}
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        icon={AiOutlineDelete}
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showModal && (
            <div className='w-full fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
              <div className='w-96 bg-white p-4 rounded-lg'>
                <h2 className='text-xl font-semibold mb-4'>
                  {selectedUser ? 'Edit User' : 'Add New User'}
                </h2>
                <form>
                  <div className='mb-4'>
                    <label htmlFor='firstName' className='block text-gray-700'>
                      First Name
                    </label>
                    <input
                      type='text'
                      id='firstName'
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleChange}
                      className='w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                    />
                  </div>
                  <div className='mb-4'>
                    <label htmlFor='lastName' className='block text-gray-700'>
                      Last Name
                    </label>
                    <input
                      type='text'
                      id='lastName'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleChange}
                      className='w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                    />
                  </div>
                  <div className='mb-4'>
                    <label htmlFor='email' className='block text-gray-700'>
                      Email
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      className='w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                    />
                  </div>
                  <div className='mb-4'>
                    <label htmlFor='cellphoneNumber' className='block text-gray-700'>
                      Cellphone
                    </label>
                    <input
                      type='text'
                      id='cellphoneNumber'
                      name='cellphoneNumber'
                      value={formData.cellphoneNumber}
                      onChange={handleChange}
                      className='w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                    />
                  </div>
                  <div className='mb-4'>
                    <label htmlFor='bio' className='block text-gray-700'>
                      Bio
                    </label>
                    <textarea
                      id='bio'
                      name='bio'
                      value={formData.bio}
                      onChange={handleChange}
                      className='w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                    ></textarea>
                  </div>
                  <div className='mb-4'>
                    <label htmlFor='image' className='block text-gray-700'>
                      Image URL
                    </label>
                    <input
                      type='text'
                      id='image'
                      name='image'
                      value={formData.image}
                      onChange={handleChange}
                      className='w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                    />
                  </div>
                 
                </form>
                <div className='flex justify-end'>
                    <button
                      className='bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-lg mr-2'
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className='bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded-lg'
                      onClick={handleSaveUser}
                    >
                      Save
                    </button>
                  </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UsersPage;
