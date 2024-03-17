import Link from 'next/link';
import Layout from '@/components/layout';
const Custom404 = () => {
  return (
    <Layout>
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
      <div className='w-64 h-64 mb-8 flex flex-col items-center justify-center'>
        <div className='text-6xl font-bold text-red-500'>404</div>
      </div>
      <h1 className='text-3xl font-semibold mb-4'>Oops! Page Not Found</h1>
      <p className='text-gray-600 text-lg mb-8'>
        The page you are looking for might have been removed or doesn't exist.
      </p>
      <Link href='/dashboard' className='text-blue-500 hover:underline'>
      Go back to home
        
      </Link>
    </div>
    </Layout>
  );
};

export default Custom404;
