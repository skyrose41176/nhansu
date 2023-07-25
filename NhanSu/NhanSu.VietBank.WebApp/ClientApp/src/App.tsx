import {
  CssVarsProvider,
  shouldSkipGeneratingVar as joyShouldSkipGeneratingVar,
} from '@mui/joy/styles';
import {shouldSkipGeneratingVar as muiShouldSkipGeneratingVar} from '@mui/material/styles';
import {SnackbarProvider} from 'notistack';
import {QueryClient, QueryClientProvider} from 'react-query';
import './App.css';
import {mergedTheme} from './assets/styles';
import Routes from './routes';
const client = new QueryClient();

function App() {
  return (
    // <CssVarsProvider
    //   theme={mergedTheme}
    //   shouldSkipGeneratingVar={(keys: string[]) =>
    //     muiShouldSkipGeneratingVar(keys) || joyShouldSkipGeneratingVar(keys)
    //   }
    // >
    <QueryClientProvider client={client}>
      <SnackbarProvider maxSnack={3}>
        <Routes />
      </SnackbarProvider>
    </QueryClientProvider>
    // </CssVarsProvider>
  );
}

export default App;
