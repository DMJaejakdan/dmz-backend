import App, { AppContext, AppProps } from 'next/app';

function MyApp() {
  return (
    <>
      <span>404</span>
    </>
  );
}
MyApp.getInitialProps = async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx);
  return appProps;
};

export default MyApp;
