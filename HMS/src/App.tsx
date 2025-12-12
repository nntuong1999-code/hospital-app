
import './App.css';
import '@mantine/core/styles.css';
import { Button, createTheme, MantineProvider } from '@mantine/core';
import AppRoutes from './Routes/AppRoutes';
import { Notifications } from '@mantine/notifications';

const theme = createTheme({
  /** Put your mantine theme override here */
  focusRing:"never",
  fontFamily:"Poppins, Roboto",
  headings:{fontFamily:"Merriweather,serif"},
  colors: {
    primary: ['#eefaff',
      '#ddf6ff',
      '#b3eeff',
      '#70e3ff',
      '#636363',
      '#00c2ff',
      '#009bdb',
      '#007cb1',
      '#006892',
      '#02587b',
      '#013650',],
    neutral: ['#f6f6f6', '#e7e7e7', '#d1d1d1', '#b0b0b0', '#888888', '#6d6d6d', '#5d5d5d', '#4f4f4f', '#454545', '#3d3d3d', '000000'],
  },
  primaryColor:"primary",
  primaryShade:4,
  defaultGradient:{
    from:"primary.4",
    to:"primary.8",
    deg:132
  }
});
function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications position='top-right'/>
      <AppRoutes/>
    </MantineProvider>
  );
}

export default App;
