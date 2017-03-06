/* eslint-disable react/jsx-indent-props */

import React from 'react'
import Head from 'next/head'
import {
  Column,
  Columns,
  Container,
  Content,
  Footer,
  Hero,
  HeroBody,
  Icon,
  NavToggle,
  Subtitle,
  Title
} from 're-bulma'

export default () => (
  <div>
    <Head>
      <title>Merchant.GG: Dashboard</title>
      <link rel='stylesheet' type='text/css'
            href='//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' />
      <link rel='stylesheet' type='text/css'
            href='//cdnjs.cloudflare.com/ajax/libs/bulma/0.3.1/css/bulma.min.css' />
      <style>{`
        body {
          font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';
          height: 100%;
        }
        .button.is-success {
          background-color: #2EB398;
        }
        .nav.is-dark {
          background-color: #232B2D;
          color: #F6F7F7;
        }
        .nav.is-dark .nav-item a, .nav.is-dark a.nav-item {
            color: #F6F7F7;
        }
        .nav.is-dark .nav-item a.button.is-default {
            color: #F6F7F7;
            background-color: transparent;
            border-width: 2px;
        }
        .aside {
          background-color: #354052;
          margin-right: -10px;
        }
        .aside .main {
          padding: 40px;
          color: #6F7B7E;
        }
        .aside .title {
          color: #6F7B7E;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
        }
        .aside .main .item {
          display: block;
          padding: 10px 0;
          color: #6F7B7E;
        }
        .aside .main .item.active {
          color: #F6F7F7;
        }
        .aside .main .icon {
          font-size: 19px;
          padding-right: 30px;
        }
        .aside .main .name {
          font-size: 16px;
          font-weight: bold;
        }
        .admin-panel {
          padding-bottom: 0;
        }
        .content {
          display: block;
          background-color: #fff;
          padding: 40px 20px;
        }
        .hero .tabs ul {
            border-bottom: 1px solid #d3d6db;
        }
      `}</style>
    </Head>
    <Columns>
      <aside className='column is-2 aside hero is-fullheight is-hidden-mobile'>
        <div>
          <div className='main'>
            <div className='title'>Menu</div>
            <a href='#' className='item active'><span className='name'>Dashboard</span></a>
            <a href='#' className='item'><span className='name'>Activity</span></a>
            <a href='#' className='item'><span className='name'>Timeline</span></a>
            <a href='#' className='item'><span className='name'>Folders</span></a>
            <a href='/logout' className='item'><span className='name'>Logout</span></a>
          </div>
        </div>
      </aside>
      <Column size='is10' className='admin-panel'>
        <nav className='nav has-shadow'>
          <div className='container'>
            <div className='nav-left'>
              <a href='/' className='nav-item'><Icon icon='fa fa-credit-card' /> Merchant.GG</a>
            </div>
            <NavToggle>
              <span />
              <span />
              <span />
            </NavToggle>
            <div className='nav-right nav-menu is-hidden-tablet'>
              <a href='#' className='nav-item is-active'>Dashboard</a>
              <a href='#' className='nav-item'>Activity</a>
              <a href='#' className='nav-item'>Timeline</a>
              <a href='#' className='nav-item'>Folders</a>
              <a href='/logout' className='nav-item'>Logout</a>
            </div>
          </div>
        </nav>
        <Hero size='isSmall' style={{paddingLeft: '5px'}}>
          <HeroBody>
            <Container>
              <Title size='is3'><Icon icon='fa fa-credit-card' /> Merchant.GG: Dashboard</Title>
              <Subtitle size='is5'>A simple admin.</Subtitle>
            </Container>
          </HeroBody>
        </Hero>
      </Column>
    </Columns>
    <Footer style={{marginBottom: '5px'}}>
      <Container hasTextCentered>
        <Content>
          <p>
            <strong>&copy; Merchant.GG</strong> &nbsp; <a href='#'>Privacy</a> &nbsp; <a
            href='#'>Terms</a> &nbsp; <a href='mailto:support@merchant.gg'>Contact</a>
          </p>
        </Content>
      </Container>
    </Footer>
  </div>
)
