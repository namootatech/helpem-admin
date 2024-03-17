import { useState, useEffect } from 'react';
import axios from 'axios';
import { BiMoney } from 'react-icons/bi';
import Layout from '@/components/layout';
import Datepicker from 'react-tailwindcss-datepicker';
const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    console.log('newValue:', newValue);
    setValue(newValue);
  };

  useEffect(() => {
    // Fetch transactions from /api/transaction/list
    axios
      .get('/api/transactions/list')
      .then((response) => {
        setTransactions(response.data.transactions);
      })
      .catch((error) => {
        console.error('Error fetching transactions:', error);
      });
  }, []);

  const handleRefund = (id) => {
    // Handle refund action for the transaction with the specified ID
    console.log('Refunding transaction with ID:', id);
  };

  const handleSearch = () => {
    // Handle search action with the specified date range
    console.log('Searching transactions with date range:', value);
    fetch(`/api/transactions/find-by-date-range?start=${value.startDate}&end=${value.endDate}`)
        .then((response) => response.json())
        .then((data) => {
            console.log('Fetched transactions:', data);
            setTransactions(data.transactions);
        })
        .catch((error) => {
            console.error('Error fetching transactions:', error);
        });
  }

  return (
    <Layout>
      <div className='min-h-screen bg-gray-50 p-8'>
        <div className='container mx-auto'>
          <h1 className='text-3xl font-semibold mb-4'>Transactions</h1>
          <div className='flex flex-col md:flex-row items-center justify-center mb-4 w-1/4'>
          <Datepicker
            value={value}
            onChange={handleValueChange}
            showShortcuts={true}
          />
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ml-4'
            onClick={handleSearch}
          >
            Search
          </button>
          </div>
          <table className='w-full bg-gray-100 rounded-lg overflow-hidden mb-4'>
            <thead className='bg-gray-200 text-gray-700'>
              <tr>
                <th className='px-4 py-2 text-left'>Transaction ID</th>
                <th className='px-4 py-2 text-left'>User</th>
                <th className='px-4 py-2 text-left'>Amount</th>
                <th className='px-4 py-2 text-left'>Date</th>
                <th className='px-4 py-2 text-left'>Refund</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction) => (
                <tr key={transaction.id} className='hover:bg-gray-200'>
                  <td className='px-4 py-2 text-left'>
                    {transaction.pf_payment_id}
                  </td>
                  <td className='px-4 py-2 text-left'>
                    {transaction.name_first} {transaction.name_last}
                  </td>
                  <td className='px-4 py-2 text-left'>
                    {transaction.amount_gross}
                  </td>
                  <td className='px-4 py-2 text-left'>
                    {transaction.billing_date}
                  </td>
                  <td className='px-4 py-2 text-left'>
                    <button
                      className='bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-lg'
                      onClick={() => handleRefund(transaction.id)}
                    >
                      <BiMoney className='inline-block mr-1' />
                      Refund
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default TransactionsPage;
