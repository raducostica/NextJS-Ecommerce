import "../styles/globals.css";
import UserProvider from "../context/UserContext";
import { GetServerSideProps, NextPageContext } from "next";
import type { AppProps } from "next/app";
import cookie from "cookie";
import App from "next/app";

function MyApp(props: any) {
  const { Component, pageProps, authenticated } = props;
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

MyApp.getInitialProps = async (appContext: any) => {
  let authenticated = false;
  const request = appContext.ctx.req;
  if (request) {
    request.cookies = cookie.parse(request.headers.cookie || "");
    authenticated = !!request.cookies.session;
  }

  // Call the page's `getInitialProps` and fill `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, authenticated };
};

export default MyApp;
