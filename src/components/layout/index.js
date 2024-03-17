import Navigation from "../navigation";
import Footer from "@/components/footer";

import Head from 'next/head'
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

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
            </Head>
          <Navigation />
          <main>{children}</main>
          <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveUser: (user) => dispatch({ type: 'LOGIN', payload: user })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
