import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '@/components/layout';
import { Dropdown } from 'flowbite-react';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import { RiUserUnfollowLine, RiUserFollowLine } from 'react-icons/ri';
import { Button, Spinner } from 'flowbite-react';

export default function PartnersPage() {
  const [partners, setPartners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newPartnerData, setNewPartnerData] = useState({
    name: '',
    slug: '',
    link: '',
  });
  const [selectedPartner, setSelectedPartner] = useState(null);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    console.log('fetching partners');
    setLoading(true);
    try {
      const response = await axios.get('/api/partners/list');
      console.log('response:', response.data.partners);
      setPartners(response.data.partners);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching partners:', error);
    }
  };

  const saveEdit = async () => {
    try {
      setLoading(true);
      await axios.post('/api/partners/edit', selectedPartner);
      fetchPartners();
      handleCloseModal();
      setLoading(false);
    } catch (error) {
      console.error('Error editing partner:', error);
    }
  };

  const handleAddPartner = async () => {
    try {
      setLoading(true);
      const endpoint = newPartnerData._id
        ? `/api/partners/edit`
        : '/api/partners/add';
      await axios.post(endpoint, newPartnerData);
      fetchPartners();
      handleCloseModal();
    } catch (error) {
      console.error('Error adding partner:', error);
    }
  };

  const handleEditPartner = (partner) => {
    setSelectedPartner(partner);
    setNewPartnerData(partner);
    setShowModal(true);
  };

  const handleSuspendPartner = async (partnerId) => {
    try {
      setLoading(true);
      console.log('supsneing partner', partnerId);
      await axios.get(`/api/partners/suspend?id=${partnerId}`);
      console.log('suspended success:', partnerId);
      fetchPartners();
    } catch (error) {
      console.error('Error suspending partner:', error);
    }
  };

  const handleDeletePartner = async (partnerId) => {
    try {
      setLoading(true);
      await axios.get(`/api/partners/delete?id=${partnerId}`);
      console.log('deleted success:', partnerId);
      fetchPartners();
    } catch (error) {
      console.error('Error suspending partner:', error);
    }
  };

  const handleActivatePartner = async (partnerId) => {
    try {
      setLoading(true);
      axios.get(`/api/partners/activate?id=${partnerId}`);
      console.log('deleted success:', partnerId);
      fetchPartners();
    } catch (error) {
      console.error('Error suspending partner:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPartnerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewPartnerData({
      name: '',
      slug: '',
      link: '',
    });
  };

  return (
    <Layout>
      <div className='min-h-screen bg-gray-100 p-8'>
        <h1 className='text-3xl font-semibold mb-4'>Partners</h1>
        <div className='mb-4'>
          <div className='flex flex-row gap-3'>
            <Button color="failure" onClick={()=> setShowModal(true)}>
              {loading && (
                <Spinner
                  aria-label='Alternate spinner button example'
                  size='sm'
                />
              )}
              <span className='pl-3 pr-3'>
                {loading ? 'Loading...' : 'Add New Partner'}
              </span>
            </Button>
          </div>
        </div>
        <table className='w-full bg-gray-200 rounded-md'>
          <thead>
            <tr>
              <th className='text-left py-4 border border-gray-100 px-4'>
                Name
              </th>
              <th className='text-left py-4 border border-gray-100 px-4'>
                Slug
              </th>
              <th className='text-left py-4 border border-gray-100 px-4'>
                Link
              </th>
              <th className='text-left py-4 border border-gray-100 px-4'>
                Suspended
              </th>
              <th className='text-left py-4 border border-gray-100 px-4'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner) => (
              <tr key={partner.id} className='hover:bg-gray-300'>
                <td className='py-2 border border-gray-100 px-4'>
                  {partner.name}
                </td>
                <td className='py-2 border border-gray-100 px-4'>
                  {partner.slug}
                </td>
                <td className='py-2 border border-gray-100 px-4 text-blue-500'>
                  <a href={partner.link} target='_blank'>
                    {partner.link}
                  </a>
                </td>
                <td className='py-2 border border-gray-100 px-4'>
                  {partner.status === 'suspended' ? 'Yes' : 'No'}
                </td>
                <td className='py-2 border border-gray-100 px-4'>
                  <Dropdown label='Actions'>
                    <Dropdown.Item
                      icon={
                        partner.status === 'suspended'
                          ? RiUserFollowLine
                          : RiUserUnfollowLine
                      }
                      onClick={
                        partner.status === 'suspended'
                          ? () => handleActivatePartner(partner._id)
                          : () => handleSuspendPartner(partner._id)
                      }
                    >
                      {partner.status === 'suspended' ? 'Activate' : 'Suspend'}
                    </Dropdown.Item>
                    <Dropdown.Item
                      icon={AiFillEdit}
                      onClick={() => handleEditPartner(partner)}
                    >
                      Edit{' '}
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      icon={AiOutlineDelete}
                      onClick={() => handleDeletePartner(partner._id)}
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
          <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'>
            <div className='bg-white p-8 rounded-md shadow-md w-96'>
              <h2 className='text-xl font-semibold mb-4'>Add New Partner</h2>
              <div className='mb-4'>
                <label className='block mb-2'>Name</label>
                <input
                  type='text'
                  name='name'
                  value={newPartnerData.name}
                  onChange={handleInputChange}
                  className='w-full border rounded-md py-2 px-3 text-sm'
                  placeholder='Enter partner name e.g Example Donations'
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-2'>Slug</label>
                <input
                  type='text'
                  name='slug'
                  value={newPartnerData.slug}
                  onChange={handleInputChange}
                  className='w-full border rounded-md py-2 px-3 text-sm'
                  placeholder='Enter partner slug e.g example-donations'
                />
              </div>
              <div className='mb-4'>
                <label className='block mb-2'>Link</label>
                <input
                  type='text'
                  name='link'
                  value={newPartnerData.link}
                  onChange={handleInputChange}
                  placeholder='Enter partner link e.g example.com'
                  className='w-full border rounded-md py-2 px-3 text-sm'
                />
              </div>
              <div className='flex justify-end'>
                <button
                  onClick={handleAddPartner}
                  className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2'
                >
                  Save
                </button>
                <button
                  onClick={handleCloseModal}
                  className='bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-md'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
