// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { changeModal } from './actions/app';
import DateSlider from './components/DateSlider';
import GlobalModals from './components/GlobalModals';
import Navbar from './components/Navbar';

import RaceListing from './components/RaceListing';
import Filters from './components/Filters';

import styles from './styles/main.module.scss';

import '@blueprintjs/core/lib/css/blueprint.css';
import './styles/fonts.css';
import './styles/dark-global.scss';

export default function App(): React.Node {
  const { t, i18n } = useTranslation();
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const dispatch = useDispatch();
  const openModal = (name) => (e) => { e.preventDefault(); dispatch(changeModal(name)); };

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
            <button
              type="button"
              className={`${styles.btn} ${styles['btn-default']} ${styles['filters-toggle']}`}
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              {filtersOpen ? `▲ ${t('Hide filters')}` : `▼ ${t('Filters')}`}
            </button>
            <div className={`${styles['filters-panel']} ${filtersOpen ? styles['filters-panel-open'] : ''}`}>
              <h3>{t('Filters')}</h3>
              <Filters />
            </div>
          </div>
          <div className={styles['col-md-10']}>
            <DateSlider />
            <RaceListing />
            <div className={styles['page-footer']}>
              <a href="" onClick={openModal('options')}>{t('Options')}</a>
              <a href="" onClick={openModal('about')}>{t('About')}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
