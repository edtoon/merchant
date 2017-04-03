/* eslint-disable react/jsx-indent-props */

import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import RegisterForm from '../components/RegisterForm'
import { wwwHost } from 'gg-common/utils/hosts'

export default () => (
  <section className='hero is-fullheight is-dark is-bold'>
    <Head>
      <title>Merchant.GG: Register</title>
      <link rel='stylesheet' type='text/css'
            href='//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css' />
      <link rel='stylesheet' type='text/css' href='//cdnjs.cloudflare.com/ajax/libs/bulma/0.4.0/css/bulma.css' />
      <style>{`
        body {
          font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';
        }
      `}</style>
    </Head>
    <div className='hero-body'>
      <div className='container'>
        <div className='columns is-vcentered'>
          <div className='column is-4 is-offset-4'>
            <h1 className='title is-3'><span className='icon'><i className='fa fa-credit-card' /></span> Merchant.GG: Register</h1>
            <RegisterForm />
            <div className='has-text-centered'>
              <Link href='/'><a>Login</a></Link> | <a href='#'>Forgot Password</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='hero-foot' style={{marginBottom: '5px'}}>
      <div className='has-text-centered'>
        <div className='content'>
          <p>
            <strong>&copy; <a href={'//' + wwwHost()}>Merchant.GG</a></strong> &nbsp; <a href='#'>Privacy</a> &nbsp; <a
            href='#'>Terms</a> &nbsp; <a href='mailto:support@merchant.gg'>Contact</a>
          </p>
        </div>
      </div>
    </div>
  </section>
)
