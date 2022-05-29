// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

// Components
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store'
import './i18n';
import i18next from 'i18next';

// CSS
import './index.css';
import 'react-notifications/lib/notifications.css';
import '@influxdata/clockface/dist/index.css';
import './style/SignInForm.scss';
import './style/SignUpForm.scss';
import './style/ImportOverlay.scss';
import './style/responsive.scss';

const lang = localStorage.getItem('lang') || 'en';
i18next.changeLanguage(lang);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
