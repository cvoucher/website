import { Button, Divider, Grid } from "@mui/material";
import VoucherCreateWidget from "./VoucherCreateWidget/VoucherCreateWidget";
import { Stack } from "@mui/system";
import VoucherRedeemWidget from "./VoucherRedeemWidget/VoucherRedeemWidget";
import React from "react";


const VoucherPanel = () => {
  const [voucherGenerationVisible, setVoucherGenerationVisible] = React.useState(true);



  return (
    <Stack spacing={1}>
      { voucherGenerationVisible && 
        <>
          <VoucherCreateWidget />
          <Button variant="contained" onClick={() => setVoucherGenerationVisible(false)} style={{backgroundColor: "#e580b3e0"}}>Want to redeem a voucher instead?</Button> 
        </>
      }
      { !voucherGenerationVisible && 
        <>
          <VoucherRedeemWidget />
          <Button variant="contained" onClick={() => setVoucherGenerationVisible(true)} style={{backgroundColor: "#4e9cc9"}}>Want to generate a voucher instead?</Button> 
        </>
      }
    </Stack>
  )
};

export default VoucherPanel;