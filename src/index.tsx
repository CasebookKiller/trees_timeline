import ReactDOM from 'react-dom/client';

// old version
// import { Root } from '@/components/Root';

// new web version
import { Root } from './www/components/Root';

// Раскомментируйте этот импорт на случай, если вы захотите разрабатывать приложение за пределами
// приложения Telegram в вашем браузере.

// old version
// import './mockEnv.ts';

//import 'primereact/resources/themes/lara-dark-cyan/theme.css';
import 'primereact/resources/themes/lara-light-teal/theme.css'

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<Root/>);
