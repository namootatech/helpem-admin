import Navigation from '../navigation';
import Footer from '@/components/footer';

import Head from 'next/head';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Layout = ({ children, saveUser }) => {
  useEffect(() => {
    const user = Cookies.get('user');
    if (user) {
      const data = JSON.parse(user);
      saveUser(data);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Helpem Admin | Home</title>

        <meta
          name='description'
          content="Welcome to Help'em Admin System, where we harness the power of generosity and financial sustainability to empower non-profit organizations and individuals alike. Our mission is to create a vibrant community dedicated to making a meaningful difference in the world. Join us as we strive to build a brighter future by providing innovative solutions that enable non-profits to thrive while offering individuals the opportunity to contribute and earn simultaneously. Discover how you can be part of our journey towards transformative impact and social change."
        />
        <meta
          name='keywords'
          content="Help'em, Adminn system, non-profit, community, generosity, financial sustainability, empowerment, social impact, philanthropy, making a difference, community building, innovative solutions, social change, brighter future, earn while contributing, join us"
        />
        <meta property="og:site_name" content="Helpem Admin" />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='og:image' content='https://admin.helpem.co.za/logo.png' />
        <meta name="og:image:secure_url"  content='https://admin.helpem.co.za/logo.png' />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://admin.helpem.co.za" />
        <meta name='og:title' content='Helpem Admin' />
        <meta name='og:description' content='Helpem Admin Dashboard' />
        <meta name='robots' content='follow' />
        <meta http-equiv='refresh' content='5' />
        <meta charset="UTF-8"/>
        <meta http-equiv="content-language" content="en"/>
        <meta property='og:url' content='https://admin.helpem.co.za' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='icon' href={`/apple-touch-icon.png`} sizes='any' />
        <link rel='icon' href={`/favicon-32x32.png`} sizes='any' />
        <link rel='icon' href={`/favicon-16x16.png`} sizes='any' />
        <link
          rel='icon'
          href={`/android-chrome-512x512.png`}
          sizes='any'
        />
        <link
          rel='icon'
          href={`/android-chrome-192x192.png`}
          sizes='any'
        />
      </Head>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveUser: (user) => dispatch({ type: 'LOGIN', payload: user }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
