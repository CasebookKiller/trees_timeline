import React from 'react';
import { FC } from 'react';

import 'normalize.css';
import './TimelinePage.css';

import { DATA } from '@/www/data';

interface TLDescProps {
  id?: string;
  children?: any;
  className?: string;
}

const TLDesc: FC<TLDescProps> = ({ id, children, className }) => {
  return (
    <div id={id} className={className || 'p'}>{children}</div>
  );
}

interface TLItemProps {
  id?: string;
  key?: string;
  children?: string | JSX.Element | JSX.Element[];
  flag: string;
  time: string;
  abnormal?: boolean | string;
  desc?: string;
  direction: string | "l" | "r";
}

const TLItem: FC<TLItemProps> = ({id, children, flag, time, abnormal, desc, direction }) => {
  return (
    <li id={id}>
    <div className={'direction-' + direction}>
      <div className='flag-wrapper'>
        <span className={abnormal ? 'hexa-red' : 'hexa'}></span>
        <span className='flag'>{flag}</span>
        <span className='time-wrapper'><span className={abnormal ? 'time-red' : 'time'}>{time}</span></span>
      </div>
      {
        desc && <div className='desc'>{desc}</div>
      }
      <div className='desc'>{children}</div>
    </div>
  </li>
  );
}

export const TimelinePage: FC = () => {
  const parts = DATA.events.map((value, idx)=>{
    const timeline = () => {
      const events = value?.items?.map((item)=>{
        const desc = item?.desc?.map((item, idx)=>{
          const inner = React.createElement('div', {dangerouslySetInnerHTML: {__html: item.inner}});
          return (
            <TLDesc 
              key={idx}
              id={item.id}
            >
              {inner}
            </TLDesc>
          );
        })
        return (
          <TLItem 
            id={item.id}
            key={item.id}
            flag={item.flag}
            time={item.time}
            abnormal={item.abnormal}
            direction={item.direction}
          >
            {desc}
          </TLItem>
        );
      })
      return (
        <ul className='timeline'>
          {events}
        </ul>
      );
    }
    return (
      <div key={idx}>
        <center>
          <p></p>
          <h3 id={value.year}>{value.year}</h3>
        </center>
        {timeline()}
      </div>
    );
  });

  const args = DATA.case.arguments.map((item, idx)=>{
    const inner = React.createElement('div', {dangerouslySetInnerHTML: {__html: item.inner}});
    return (
      <div className='p' key={idx}>
        {inner}
      </div>
    );
  });

  const casedesc = () => {
    return (
      <center>
        <p></p>
        <h3>Рассмотрение дела в Арбитражном суде Московской области</h3>
        <div className='case-time-desc'>
          <div className='desc'>
            {args}
          </div>
        </div>
      </center>
    );
  }  

  return (
    <>
      <header>
        <p></p>
        <h1>{DATA.header}</h1>
        <p>{DATA.description}</p>
      </header>
      {parts}

      {casedesc()}
    </>
  );
};