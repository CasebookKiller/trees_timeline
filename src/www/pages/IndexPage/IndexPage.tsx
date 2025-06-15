import * as packageJson from '../../../../package.json';
const version = packageJson.version;

import { type FC } from 'react';

import { Panel } from 'primereact/panel';

import { Link } from '@/components/Link/Link.tsx';

import './IndexPage.css';

export const IndexPage: FC = () => {

  return (
    <>
      <div className='app p-0'/>
      <Panel
        className='shadow-5 mx-1'
        header={'Договор № 12 от 29 апреля 2021 года'}
        footer={'Эти страницы созданы для визуализации существенных событий и фактов по договору № 12 от 29.04.2021'}
      >
        {/*
        <Link to='/timeline'>
          <div className='flex flex-wrap app p-2 align-items-center gap-4 item-border-bottom'>
            <div className='flex-1 flex flex-column gap-1 xl:mr-8'>
              <span
                className='app font-size-subheading'
              >
                Хронология событий (временная шкала)
              </span>
              <div className='flex align-items-center gap-2'>
                <span
                  className='app font-size theme-hint-color font-weight-content nowrap overflow-ellipsis'
                >
                  Существенные события изложены в графическом виде
                </span>
              </div>
            </div>
          </div>
        </Link>
        */}
        <Link to='/table'>
          <div className='flex flex-wrap app p-2 align-items-center gap-4 item-border-bottom'>
            <div className='flex-1 flex flex-column gap-1 xl:mr-8'>
              <span
                className='app font-size-subheading'
              >
                Хронология событий (таблица)
              </span>
              <div className='flex align-items-center gap-2'>
                <span
                  className='app font-size theme-hint-color font-weight-content nowrap overflow-ellipsis'
                >
                  Существенные события изложены в табличном виде
                </span>
              </div>
            </div>
          </div>
        </Link>
      </Panel>

      <div
        className='my-5 mx-2 app theme-hint-color theme-bg-secondary text-xs'
      >
        {/*<div className='block text-center mb-2'>
          <Chip className='text-2xs shadow-3' label={'UId: ' + userId}/>
        </div>*/}
        {/*<div className='block text-center mb-1'>
          <span>Шаблон мини-приложения Telegram</span>
        </div>*/}
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
