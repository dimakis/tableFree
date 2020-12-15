import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';
import colors from '@material-ui/core'

export const WhiteTextTypography = withStyles({
  root: {
    color: "#FFFFFF"
  }
})(Typography);


 export const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#673ab7',
            dark: '#002884',
            contrastText: '#fff',
          },
          secondary: {
            light: '#ff7961',
            main: '#ffc400',
            dark: '#ba000d',
            contrastText: '#000',
          },
      
    },
    typography: {
        fontFamily: [
          'Courier New',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
       color:"white"
      },
  });

function WhiteNavFont(inputText) {
  return (
    <div className="WhiteNavFont" style={{ backgroundColor: "black" }}>
      <WhiteTextTypography variant="h1">
        {inputText}
      </WhiteTextTypography>
    </div>
  );
}
export default theme;




// const theme = createMuiTheme({
//     typography: {
//       fontFamily: [
//         '-apple-system',
//         'BlinkMacSystemFont',
//         '"Segoe UI"',
//         'Roboto',
//         '"Helvetica Neue"',
//         'Arial',
//         'sans-serif',
//         '"Apple Color Emoji"',
//         '"Segoe UI Emoji"',
//         '"Segoe UI Symbol"',
//       ].join(','),
//     },
//   });