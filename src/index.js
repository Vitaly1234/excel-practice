import './scss/index.scss';

import {DashboardPage} from '@/pages/DashboardPage';
import {ExcelPage} from '@/pages/ExcelPage';
import {Router} from '@core/routes/Router';

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
});
