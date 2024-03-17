'use client';

import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { Breadcrumb } from 'flowbite-react';
import { HiHome } from 'react-icons/hi';

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function Navigation({ user }) {
  const router = useRouter();

  const performLogout = () => {
    Cookies.remove('user');
    router.push('/login');
  };

  return (
    <>
      <Navbar fluid rounded>
        <Navbar.Brand href='https://flowbite-react.com'>
          <img
            src='/logo.png'
            className='mr-3 h-6 sm:h-9'
            alt='Flowbite React Logo'
          />
          <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
            Helpem
          </span>
        </Navbar.Brand>
        <div className='flex md:order-2'>
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt='User settings' img={user?.image} rounded />}
          >
            <Dropdown.Header>
              <span className='block text-sm'>
                {user?.firstName} {user?.lastName}
              </span>
              <span className='block truncate text-sm font-medium'>
                {user?.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={performLogout}>Sign out</Dropdown.Item>
          </Dropdown>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href='/dashboard' active>
            Home
          </Navbar.Link>
          <Navbar.Link href=''>Company</Navbar.Link>
          <Navbar.Link href='#'>Team</Navbar.Link>
          <Navbar.Link href='#'>Management</Navbar.Link>
          <Navbar.Link href='#'>Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <Breadcrumb
        aria-label='Solid background breadcrumb example'
        className='bg-gray-50 px-5 py-3 dark:bg-gray-800'
      >
        {router.pathname.split('/').map((item, index) => {
          if (item !== '' && item !== 'dashboard') {
            return (
              <Breadcrumb.Item href={`dashboard/${item}`} key={index}>
                {capitalize(item)}
              </Breadcrumb.Item>
            );
          }
          if (item === 'dashboard') {
            return (
              <Breadcrumb.Item href='/dashboard' icon={HiHome}>
                Dashboard
              </Breadcrumb.Item>
            );
          }
        })}
      </Breadcrumb>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(Navigation);
