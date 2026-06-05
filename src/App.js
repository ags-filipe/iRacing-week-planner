// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import DateSlider from './components/DateSlider';
import GlobalModals from './components/GlobalModals';
import Navbar from './components/Navbar';

import RaceListing from './components/RaceListing';
import Filters from './components/Filters';

import styles from './styles/main.module.scss';

import '@blueprintjs/core/lib/css/blueprint.css';
import './styles/fonts.css';

export default function App(): React.Node {
  const { t, i18n } = useTranslation();

  React.useEffect(() => {
    document.body.dir = i18n.dir();
    document.documentElement.setAttribute('lang', i18n.language);

    return () => {};
  }, [i18n.language]);

  return (
    <div>
      <Navbar />
      <GlobalModals />
      <div className={styles['container-fluid']}>
        <div className={styles.row}>
          <div className={styles['col-md-2']}>
            <h3>{t('Filters')}</h3>
            <Filters />
          </div>
          <div className={styles['col-md-10']}>
            <DateSlider />
            <RaceListing />
          </div>
        </div>
      </div>
    </div>
  );
}
