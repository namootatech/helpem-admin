import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '@/components/layout';

export default function PartnersPage() {
  const [partners, setPartners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPartnerData, setNewPartnerData] = useState({
    name: '',
    slug: '',
    link: '',
  });

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await axios.get('/api/partners/list');
      setPartners(response.data.partners);
    } catch (error) {
      console.error('Error fetching partners:', error);
    }
  };

  const handleAddPartner = async () => {
    try {
      await axios.post('/api/partners/add', newPartnerData);
      fetchPartners();
      handleCloseModal();
    } catch (error) {
      console.error('Error adding partner:', error);
    }
  };

  const handleEditPartner = (partnerId) => {
    // Implement edit functionality
  };

  const handleSuspendPartner = (partnerId) => {
    // Implement suspend functionality
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
        <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-semibold mb-4">Partners</h1>
      <div className="mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md"
        >
          Add New Partner
        </button>
      </div>
      <table className="w-full bg-gray-200 rounded-md">
        <thead>
          <tr>
            <th className="py-4 border border-gray-100 px-4">Name</th>
            <th className="py-4 border border-gray-100 px-4">Slug</th>
            <th className="py-4 border border-gray-100 px-4">Link</th>
            <th className="py-4 border border-gray-100 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {partners.map((partner) => (
            <tr key={partner.id} className="hover:bg-gray-300">
              <td className="py-2 border border-gray-100 px-4">{partner.name}</td>
              <td className="py-2 border border-gray-100 px-4">{partner.slug}</td>
              <td className="py-2 border border-gray-100 px-4">{partner.link}</td>
              <td className="py-2 border border-gray-100 px-4">
                <button onClick={() => handleEditPartner(partner.id)} className="mr-2 bg-red-800 py-1 px-4 white-text text-white rounded rounded-lg">
                  Edit
                </button>
                <button onClick={() => handleSuspendPartner(partner.id)} className='bg-gray-800 py-1 px-4 white-text text-white rounded rounded-lg'>Suspend</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add New Partner</h2>
            <div className="mb-4">
              <label className="block mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={newPartnerData.name}
                onChange={handleInputChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Slug:</label>
              <input
                type="text"
                name="slug"
                value={newPartnerData.slug}
                onChange={handleInputChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Link:</label>
              <input
                type="text"
                name="link"
                value={newPartnerData.link}
                onChange={handleInputChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleAddPartner}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2"
              >
                Save
              </button>
              <button onClick={handleCloseModal} className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded-md">
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
