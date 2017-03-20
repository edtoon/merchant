/* eslint-disable react/jsx-indent-props */

import React from 'react'
import Head from 'next/head'
import {
  Column,
  Columns,
  Container,
  Content,
  Hero,
  HeroBody,
  HeroFoot,
  Icon,
  Title
} from 're-bulma'
import LoginForm from '../components/LoginForm'
import { wwwHost } from 'gg-common/utils/hosts'

export default () => (
  <Hero size='isFullheight' color='isDark' isBold>
    <Head>
      <title>Merchant.GG: Login</title>
      <link rel='stylesheet' type='text/css'
            href='//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css' />
      <link rel='stylesheet' type='text/css' href='//cdnjs.cloudflare.com/ajax/libs/bulma/0.3.1/css/bulma.css' />
      <style>{`
        body {
          font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';
        }
      `}</style>
    </Head>
    <HeroBody>
      <Container>
        <Columns className='is-vcentered'>
          <Column size='is4' offset='isOffset4'>
            <Title size='is3'><Icon icon='fa fa-credit-card' /> Merchant.GG: Login</Title>
            <LoginForm />
            <Container hasTextCentered>
              <a href='/register'>Register</a> | <a href='#'>Forgot Password</a>
            </Container>
          </Column>
        </Columns>
      </Container>
    </HeroBody>
    <HeroFoot style={{marginBottom: '5px'}}>
      <Container hasTextCentered>
        <Content>
          <p>
            <strong>&copy; <a href={'//' + wwwHost()}>Merchant.GG</a></strong> &nbsp; <a href='#'>Privacy</a> &nbsp; <a
            href='#'>Terms</a> &nbsp; <a href='mailto:support@merchant.gg'>Contact</a>
          </p>
        </Content>
      </Container>
    </HeroFoot>
  </Hero>
)
