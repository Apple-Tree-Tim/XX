// components/Layout.js
import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';

export default function Layout({ children, pageTitle, pageDescription }) {
  return (
    <>
      <Head>
        <title>{pageTitle ? `${pageTitle} | OnlyHub` : 'OnlyHub'}</title>
        <meta
          name="description"
          content={pageDescription || 'Default description for OnlyHub website.'}
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <Navbar />
      <div className="main-content">
        {children}
      </div>
      <Footer />
      <FloatingButtons />
    </>
  );
}
