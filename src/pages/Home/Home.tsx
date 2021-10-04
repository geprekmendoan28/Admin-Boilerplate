import React from 'react';
import Layout from '@components/Layout';
import Meta from '@components/Meta';
import { useTranslation } from 'react-i18next';
function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Meta title={t('title')}>
        <Layout>
          <div>test</div>
        </Layout>
      </Meta>
    </>
  );
}
export default Home;
