/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Fade from '@mui/material/Fade';

// Material Dashboard 2 PRO React TS Base Styles
import colors from 'src/mui/assets/theme/base/colors';
import typography from 'src/mui/assets/theme/base/typography';
import borders from 'src/mui/assets/theme/base/borders';

// Material Dashboard 2 PRO React TS Helper Functions
import pxToRem from 'src/mui/assets/theme/functions/pxToRem';

const { black, light } = colors;
const { size, fontWeightRegular } = typography;
const { borderRadius } = borders;

// types
type Types = any;

const tooltip: Types = {
  defaultProps: {
    arrow: true,
    TransitionComponent: Fade,
  },

  styleOverrides: {
    tooltip: {
      maxWidth: pxToRem(160),
      backgroundColor: black.main,
      color: light.main,
      fontSize: size.sm,
      fontWeight: fontWeightRegular,
      textAlign: 'center',
      borderRadius: borderRadius.md,
      opacity: 0.7,
      padding: `${pxToRem(4)} ${pxToRem(6.4)} ${pxToRem(
        3.2,
      )}`,
    },

    arrow: {
      color: black.main,
    },
  },
};

export default tooltip;
