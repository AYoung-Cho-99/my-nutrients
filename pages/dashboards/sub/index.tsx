import Head from 'next/head';

import { Authenticated } from 'src/components/Authenticated';

import { QueryClient, QueryClientProvider } from 'react-query';
import DashboardAyoungContent from 'src/content/DashboardPages/sub';
const queryClient = new QueryClient();

function DashboardAutomation() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>서브</title>
      </Head>
      <DashboardAyoungContent />
      https://cors-anywhere.herokuapp.com/http://openapi.foodsafetykorea.go.kr/api/76c96a42df6b41f396f6/I2790/json/1/20/FOOD_CD=D000008
    </QueryClientProvider>
    </>
  );
}

DashboardAutomation.getLayout = (page) => (
  <Authenticated>
    {page}
  </Authenticated>
);

export default DashboardAutomation;
