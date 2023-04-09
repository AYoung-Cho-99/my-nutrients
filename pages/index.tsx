import type { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

import Head from 'next/head';
import DashboardHospitalViewContent from 'src/content/DashboardPages/healthcare/hospital';

function Overview() {
  return (
    <>
      <Head>
        <title>메인</title>
      </Head>
      <DashboardHospitalViewContent />
    </>
  );
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
