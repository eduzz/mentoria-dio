import '@eduzz/houston-forms/yupLocale';

import * as ReactDOM from 'react-dom';

import setHoustonHooksConfig from '@eduzz/houston-hooks/config';

import App from './App';

import logService from '@/services/log';

setHoustonHooksConfig({
  onUnhandledError: err => logService.handleError(err)
});

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(registration => {
    registration.unregister();
  });
}
