import { Grid } from '@mui/material';
import router from "next/router";

import OverallStatus from 'src/content/Dashboards/Healthcare/hospital/OverallStatus';

function DashboardHospitalViewContent() {
  return (
    <>
      <Grid
        sx={{ px: 4 }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
      <Grid item lg={8} xs={12}>
          <OverallStatus />
        </Grid>
      </Grid>
      <button type="button" onClick={() => router.push('/dashboards/sub/')}>서브</button>
    </>
  );
}

export default DashboardHospitalViewContent;
