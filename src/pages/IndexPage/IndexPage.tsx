import * as packageJson from '../../../package.json';
const version = packageJson.version;

import { useState, type FC } from 'react';

import { retrieveLaunchParams } from '@telegram-apps/bridge';

import { Panel } from 'primereact/panel';
import { Chip } from 'primereact/chip';

import { Link } from '@/components/Link/Link.tsx';

import './IndexPage.css';

import tonSvg from './ton.svg';

export const IndexPage: FC = () => {
  const LP = retrieveLaunchParams(true);
  const tgWebAppData = LP?.tgWebAppData;
  console.log ("%cretrieveLaunchParams(): %o", 'color: cyan', LP);
  console.log ("%ctgWebAppData: %o", 'color: cyan', tgWebAppData);

  const [userId] = useState<string>(tgWebAppData?.user?.id.toString() || '');
  return (
    <>
      <div className='app p-0'/>
      <Panel
        className='shadow-5 mx-1'
        header={'Особенности'}
        footer={'Вы можете воспользоваться этими страницами, чтобы узнать больше о функциях, предоставляемых мини-приложениями Telegram и другими полезными проектами'}
      >
        <Link to='/ton-connect'>
          <div className='flex flex-wrap app p-2 align-items-center gap-4'>
            <img
              className='w-2-5rem shadow-2 flex-shrink-0 border-round'
              style={{ backgroundColor: '#007AFF' }}
              src={tonSvg}
              alt='TON Connect'
            />
            <div className='flex-1 flex flex-column gap-1 xl:mr-8'>
              <span
                className='app font-size-subheading'
              >TON Connect</span>
              <div className='flex align-items-center gap-2'>
                <span
                  className='app font-size theme-hint-color font-weight-content'
                >
                  Подключите свой кошелек TON
                </span>
              </div>
            </div>
          </div>
        </Link>
      </Panel>
      <div className='app p-0'/>
      <Panel
        className='shadow-5 mx-1'
        header={'Данные о запуске приложения'}
        footer={'Эти страницы помогают разработчикам узнать больше о текущей информации о запуске'}
      >
        <Link to='/init-data'>
          <div className='flex flex-wrap app p-2 align-items-center gap-4 item-border-bottom'>
            <div className='flex-1 flex flex-column gap-1 xl:mr-8'>
              <span
                className='app font-size-subheading'
              >
                Данные инициализации
              </span>
              <div className='flex align-items-center gap-2'>
                <span
                  className='app font-size theme-hint-color font-weight-content nowrap overflow-ellipsis'
                >
                  Пользовательские данные, информация о чате, технические данные
                </span>
              </div>
            </div>
          </div>
        </Link>
        <Link to='/launch-params'>
          <div className='flex flex-wrap app p-2 align-items-center gap-4 item-border-bottom'>
            <div className='flex-1 flex flex-column gap-1 xl:mr-8'>
              <span
                className='app font-size-subheading'
              >
                Параметры запуска
              </span>
              <div className='flex align-items-center gap-2'>
                <span
                  className='app font-size theme-hint-color font-weight-content nowrap overflow-ellipsis'
                >
                  Идентификатор платформы, версия мини-приложения и т.д.
                </span>
              </div>
            </div>
          </div>
        </Link>
        <Link to='/theme-params'>
          <div className='flex flex-wrap app p-2 align-items-center gap-4'>
            <div className='flex-1 flex flex-column gap-1 xl:mr-8'>
              <span
                className='app font-size-subheading'
              >
                Параметры темы
              </span>
              <div className='flex align-items-center gap-2'>
                <span
                  className='app font-size theme-hint-color font-weight-content nowrap overflow-ellipsis'
                >
                  Информация о палитре приложений Telegram
                </span>
              </div>
            </div>
          </div>
        </Link>
      </Panel>
      <div className='app p-0'/>
      <Panel
        className='shadow-5 mx-1'
        header='База данных и задания'
        footer='Этот раздел помогает разработчикам настроить подключение supabase к своему мини-приложению и организовать подписку на чаты и каналы'
      >
        <Link to='/supabase'>
          <div className='flex flex-wrap app p-2 align-items-center gap-4 item-border-bottom'>
            <div className='flex-1 flex flex-column gap-1 xl:mr-8'>
              <span
                className='app font-size-subheading'
              >
                База данных
              </span>
              <div className='flex align-items-center gap-2'>
                <span
                  className='app font-size theme-hint-color font-weight-content nowrap overflow-ellipsis'
                >
                  Идентификаторы пользователей приложения
                </span>
              </div>
            </div>
          </div>
        </Link>
        <Link to='/missions'>
          <div className='flex flex-wrap align-items-center gap-4 app p-2'>
            <div className='flex-1 flex flex-column gap-1 xl:mr-8'>
              <span
                className='app font-size-subheading'
              >
                Задания
              </span>
              <div className='flex align-items-center gap-2'>
                <span
                  className='app font-size theme-hint-color font-weight-content nowrap overflow-ellipsis'
                >
                  Задания для пользователей, проверка подписки на чаты и каналы
                </span>
              </div>
            </div>
          </div>
        </Link>
      </Panel>
      <div
        className='my-5 mx-2 app theme-hint-color theme-bg-secondary text-xs'
      >
        <div className='block text-center mb-2'>
          <Chip className='text-2xs shadow-3' label={'UId: ' + userId}/>
        </div>
        <div className='block text-center mb-1'>
          <span>Шаблон мини-приложения Telegram</span>
        </div>
        <div className='block text-center mb-1'>
          <span>Версия {version}</span>
        </div>
        <div className='block text-center mb-3'>
          <span>@2024-2025</span>
        </div>

      {
      }
    </div>
    </>
  );
};
