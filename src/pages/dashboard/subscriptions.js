import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';
import FreeModal from '@/components/free-modal';
import { keys, set } from 'ramda';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { Dropdown } from 'flowbite-react';
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from 'react-icons/hi';

const levelPrices = {
  Nourisher: 50,
  CaringPartner: 100,
  HarmonyAdvocate: 200,
  UnitySupporter: 300,
  HopeBuilder: 500,
  CompassionAmbassador: 1000,
  LifelineCreator: 2000,
  EmpowermentLeader: 3000,
  SustainabilityChampion: 5000,
  GlobalImpactVisionary: 10000,
};

const PAYFAST_URL = process.env.NEXT_PUBLIC_PAYFAST_URL;
const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL;
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const MERCHANT_ID = process.env.NEXT_PUBLIC_MERCHANT_ID;
const MERCHANT_KEY = process.env.NEXT_PUBLIC_MERCHANT_KEY;

const Subscriptions = () => {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showAddSubscriptionModal, setShowAddSubscriptionModal] =
    useState(false);
  const [showSubscriptionTierModal, setShowSubscriptionTierModal] =
    useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState('Nourisher');
  const [partners, setPartners] = useState([]);
  const [showSelectPartnerModal, setShowSelectPartnerModal] = useState(false);
  const [showCongratulationsModal, setShowCongratulationsModal] =
    useState(false);
  const [query, setQuery] = useState('');
  const [findingUser, setFindingUser] = useState(false);

  useEffect(() => {
    // Fetch subscriptions from /api/subscriptions/list
    fetch('/api/subscriptions/list')
      .then((res) => res.json())
      .then((data) => {
        console.log('Success:', data);
        setSubscriptions(data.subscriptions);
      });
  }, []);

  const fetchAllSubscriptions = () => {
    fetch('/api/subscriptions/list')
      .then((res) => res.json())
      .then((data) => {
        console.log('Success:', data);
        setSubscriptions(data.subscriptions);
      });
  };

  const handleAddSubscription = () => {
    setShowAddSubscriptionModal(true);
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setShowSelectPartnerModal(true);
    // Fetch partners from /api/partners/list
    fetch('/api/partners/list')
      .then((res) => res.json())
      .then((data) => {
        console.log('Success:', data);
        setPartners(data.partners);
      });
  };

  const handleFindUser = () => {
    setFindingUser(true);
    // Make API request to /api/subscriptions/add with selectedUser and selectedPartner
    fetch(`/api/users/find?query=${query}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Success:', data);
        // Update subscriptions state with new subscription
        setUsers(data.users);
        setFindingUser(false);
      });
  };

  const handleSelectPartner = (partner) => {
    setSelectedPartner(partner);
    setShowSelectPartnerModal(false);
  };

  const viewPartner = (partner) => {
    console.log('view', partner);
    window.open(partner.link, '_newtab');
  };

  const subscribeToPartner = (partner) => {
    console.log('subscribe', partner);
    setShowSubscriptionTierModal(true);
    setSelectedPartner(partner);
  };

  const closeAllModals = () => {
    setShowAddSubscriptionModal(false);
    setShowSelectPartnerModal(false);
    setShowSubscriptionTierModal(false);
    setShowCongratulationsModal(false);
  };

  const suspendSubscription = (id) => {
    fetch(`/api/subscriptions/suspend?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Success:', data);
        fetchAllSubscriptions();
      });
  };
  const activateSubscription = (id) => {
    fetch(`/api/subscriptions/activate?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Success:', data);
        fetchAllSubscriptions();
      });
  };

  const subscribeUser = () => {
    const data = {
      user: selectedUser,
      partner: selectedPartner,
      tier: {
        level: selectedPartner.level,
        tier: subscriptionTier,
        amount: levelPrices[subscriptionTier],
      },
    };
    fetch('/api/subscriptions/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Success:', data);
        fetchAllSubscriptions();
        setShowCongratulationsModal(true);
      });
  };

  const deleteSubscription = (id) => {
    fetch(`/api/subscriptions/delete?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Success:', data);
        console.log('Success:', data.data.subscriptions);
        setSubscriptions(data.data.subscriptions);
      });
  };

  const findAllSubscritionsWhereUserIsTheSame = (id) => {   
    fetch(`/api/subscriptions/findall?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log('Success:', data);
      setSubscriptions(data.subscriptions);
    });
  }

  return (
    <Layout>
      <div className='min-h-screen bg-gray-50 p-8'>
        <div className='container mx-auto'>
          <h1 className='text-3xl font-semibold mb-4'>Subscriptions</h1>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mb-4'
            onClick={handleAddSubscription}
          >
            Add New Subscription
          </button>
          <table className='w-full bg-gray-100 rounded-lg overflow-hidden mb-4'>
            {/* Table headers */}
            <thead className='bg-gray-200 text-gray-700'>
              <tr>
                <th className='text-left px-4 py-4'>User</th>
                <th className='text-left px-4 py-4'>Subscription Tier</th>
                <th className='text-left px-4 py-4'>Partner</th>
                <th className='text-left px-4 py-4'>Amount</th>
                <th>Suspended</th>
                <th className='text-left px-4 py-4'>Actions</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {/* Loop over subscriptions and render each row */}
              {subscriptions?.map((subscription) => (
                <tr key={subscription.id} className='hover:bg-gray-200'>
                  <td className='px-4 py-4'>
                    {subscription.firstName + ' ' + subscription.lastName}
                  </td>
                  <td className='px-4 py-4'>{subscription.subscriptionTier}</td>
                  <td className='px-4 py-4'>{subscription.partner.name}</td>
                  <td className='px-4 py-4'>R{subscription.amount}</td>
                  <td className='px-4 py-4'>
                    {subscription.status === 'suspended' ? 'Yes' : 'No'}
                  </td>
                  <td>
                    <Dropdown label='Actions'>
                      <Dropdown.Header>
                        <span className='block text-sm'>{subscription?.firstName}{" "}{subscription?.lastName}</span>
                        <span className='block truncate text-sm font-medium'>
                        {subscription?.email}
                        </span>
                      </Dropdown.Header>
                      <Dropdown.Item
                        icon={subscription.status === 'suspended'
                        ? AiOutlineCheckCircle
                        : AiOutlineCloseCircle}
                        onClick={
                          subscription.status === 'suspended'
                            ? () => activateSubscription(subscription._id)
                            : () => suspendSubscription(subscription._id)
                        }
                      >
                        {subscription.status === 'suspended'
                          ? 'Activate'
                          : 'Suspend'}
                      </Dropdown.Item>
                      <Dropdown.Item icon={BiSearch} onClick={()=> findAllSubscritionsWhereUserIsTheSame(subscription.userid)}>
                        Find all for user
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item icon={AiOutlineDelete} onClick={()=>deleteSubscription(subscription._id)}>Delete</Dropdown.Item>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add Subscription Modal */}
          <FreeModal
            showModal={showAddSubscriptionModal}
            setShowModal={() => setShowAddSubscriptionModal(false)}
            title='Add subscription'
          >
            <div className='bg-white p-4 rounded-lg'>
              <h2 className='text-xl font-semibold mb-4'>Find User</h2>
              {/* Search for user */}
              <div className='mb-4'>
                <input
                  type='text'
                  className='w-full border rounded-md px-3 py-2 mt-1'
                  value={query}
                  placeholder='Enter name or email'
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <button
                className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg'
                onClick={handleFindUser}
              >
                Search
              </button>
              {/* List users with button to select */}
              {findingUser && <p className='p-6 bg-gray-50'>Searching...</p>}
              {users?.map((user) => (
                <div
                  key={user.id}
                  className='flex items-center justify-between mb-2 bg-gray-50 py-2 mt-4 px-4'
                >
                  <p className='grid grid-cols-1 text-xs'>
                    <span>{user.firstName + ' ' + user.lastName}</span>
                    <span className='text-blue-500'>{user.email}</span>
                  </p>
                  <button
                    className='bg-red-500 hover:bg-blue-600 text-white py-2 text-sm px-4 rounded-lg'
                    onClick={() => handleSelectUser(user)}
                  >
                    Select
                  </button>
                </div>
              ))}
              {/* Open Select Partner Modal on user selection */}
              {/* Update selectedUser state on selection */}
            </div>
          </FreeModal>

          <FreeModal
            showModal={showSelectPartnerModal}
            setShowModal={setShowSelectPartnerModal}
            title='Add New Subscription'
          >
            {partners.map((partner) => (
              <div key={partner._id}>
                <div className='grid grid-cols-3 gap-2 bg-gray-50 border  p-4 flex items-center justify-center rounded rounded-lg shadow-lg my-2'>
                  <h1 className='text-sm font-bold'>{partner.name}</h1>
                  <button
                    onClick={() => subscribeToPartner(partner)}
                    class='text-sm rounded rounded-md text-gray-100 bg-red-800 flex items-center justify-center me-2 mb-2 py-2 px-4'
                  >
                    Subscribe
                  </button>
                  <button
                    onClick={() => viewPartner(partner)}
                    class='text-sm rounded rounded-md text-gray-100 bg-gray-800 flex items-center justify-center me-2 mb-2 p-2'
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </FreeModal>
          <FreeModal
            showModal={showSubscriptionTierModal}
            setShowModal={setShowSubscriptionTierModal}
            title='Select Subscription Tier'
          >
            <div className='grid grid-cols-1 gap-2 bg-gray-50 border  p-4 flex items-center justify-center rounded rounded-lg shadow-lg my-2'>
              <div className='mb-4'>
                <label
                  htmlFor='subscriptionTier'
                  className='text-xl block font-semibold'
                >
                  Select Your Subscription Tier:
                </label>
                <select
                  id='subscriptionTier'
                  name='subscriptionTier'
                  className='rounded border p-2 w-full'
                  onChange={(e) => setSubscriptionTier(e.target.value)}
                >
                  {levelPrices &&
                    keys(levelPrices).map((tier) => (
                      <option
                        key={tier}
                        value={tier}
                        selected={subscriptionTier === tier}
                      >
                        {tier} (R{levelPrices[tier]}/month)
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <button
              onClick={subscribeUser}
              class='rounded rounded-md text-gray-100 bg-red-800 flex items-center justify-center me-2 mb-2 p-2'
            >
              Subscribe to {selectedPartner?.name}
            </button>
          </FreeModal>
          <FreeModal
            showModal={showCongratulationsModal}
            setShowModal={setShowCongratulationsModal}
            title='Congratulations'
          >
            <div className='grid grid-cols-1 gap-2 bg-gray-50 border  p-4 flex items-center justify-center rounded rounded-lg shadow-lg my-2'>
              <h1 className='text-sm font-bold'>Subscription Created</h1>
              <div className='grid grid-cols-2 gap-2 bg-gray-50 border flex items-center justify-center rounded rounded-lg shadow-lg my-2'>
                <p className='h-full w-full bg-red-800  p-4 text-white rounded-l-lg text-left'>
                  User
                </p>
                <p className='h-full w-full  text-left flex flex-col justify-center'>
                  {selectedUser?.firstName + ' ' + selectedUser?.lastName}
                </p>
              </div>
              <div className='grid grid-cols-2 gap-2 bg-gray-50 border flex items-center justify-center rounded rounded-lg shadow-lg my-2'>
                <p className='h-full w-full bg-red-800  p-4 text-white rounded-l-lg text-left'>
                  Partner
                </p>
                <p className='h-full w-full  text-left flex flex-col justify-center'>
                  {selectedPartner?.name}
                </p>
              </div>
              <div className='grid grid-cols-2 gap-2 bg-gray-50 border   flex items-center justify-center rounded rounded-lg shadow-lg my-2'>
                <p className='h-full w-full bg-red-800  p-4 text-white rounded-l-lg text-left'>
                  Tier
                </p>
                <p className='h-full w-full  text-left flex flex-col justify-center'>
                  {subscriptionTier}
                </p>
              </div>
              <button
                onClick={() => closeAllModals()}
                class='rounded rounded-md text-gray-100 bg-gray-800 flex items-center justify-center me-2 mb-2 p-2'
              >
                close
              </button>
            </div>
          </FreeModal>
        </div>
      </div>
    </Layout>
  );
};

export default Subscriptions;
