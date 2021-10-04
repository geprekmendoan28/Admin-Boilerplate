import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';

interface MetaTypes {
  children: ReactNode;
  title: string;
}
function Meta(props: MetaTypes) {
  const { children, title } = props;
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#4F72FF" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="icon" href="./favicon.ico" />
        <meta name="description" content="Meja Cerita Admin" />
        <meta name="image" content="https://www.Filantropid.com/assets/img/page/top_pc_ad202011_1.jpg" />
        <meta name="msapplication-TileColor" content="#4F72FF" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Meja Cerita Admin" />
        <meta name="twitter:description" content="Meja Cerita Admin" />
        <meta name="twitter:image:src" content="https://www.Filantropid.com/assets/img/page/top_pc_ad202011_1.jpg" />
        <meta name="og:title" content="Meja Cerita Admin" />
        <meta name="og:description" content="Meja Cerita Admin" />
        <meta name="og:image" content="https://www.Filantropid.com/assets/img/page/top_pc_ad202011_1.jpg" />
        {/* <meta name="og:url" content="https://haidafam.com" /> */}
        <meta name="og:site_name" content="Meja Cerita Admin" />
        <meta name="og:type" content="website" />
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
}
export default Meta;
