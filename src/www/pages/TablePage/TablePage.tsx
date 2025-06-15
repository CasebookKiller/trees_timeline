import React, { FC, JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from 'react';

//import 'normalize.css';
import './TablePage.css';

import { DataView } from 'primereact/dataview';
import { DATA } from '@/www/data';
import { Panel } from 'primereact/panel';
//import { Button } from 'primereact/button';

//https://www.npmjs.com/package/react-scroll#introduction
import { Link, Element} from 'react-scroll';

interface DescProps {
  id?: string;
  children?: any;
  className?: string;
}

const Desc: FC<DescProps> = ({ id, children, className }) => {
  return (
    <div id={id} className={className || 'p'}>{children}</div>
  );
}

interface SpanProps {
  id?: string;
  children?: any;
  className?: string;
}

const Span: FC<SpanProps> = ({id, children, className}) => {
  return (
    <span id={id} className={className||''}>{children}</span>
  )
}

interface TBLEvent {
  id?: string;
  key?: string;
  children?: string | JSX.Element | JSX.Element[];
  flag: string;
  time: string;
  abnormal?: boolean | string;
  desc?: string | any;
  direction: string | "l" | "r";
  updated?: string
}

export const TablePage: FC = () => {
  const years = DATA.events.map((value, idx) => {
    const table = () => {
      const rows = value.items;
            
      const itemTemplate = (event: TBLEvent, idx: number) => {
        console.log(event);

        const headerTemplate = (options: { 
          className: any;
          togglerElement: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
        }) => {
          const color = event.abnormal ? 'bg-red-700 text-100': 'bg-blue-500 text-100';
          const className = `${options.className} ${color}`;
          const eventName = event.id || '';
          return (
            <Element name={eventName} >
              <div className={className}>
                <div className="flex gap-1">
                  
                  <span className="" style={{textAlign: 'start'}}>{event.flag}</span>
                </div>
                <div>
                
                  {options.togglerElement}
                </div>
              </div>
            </Element>
          );
        };

        const footerTemplate = (options: { className: any; }) => {
          const className = `${options.className} flex flex-wrap align-items-center justify-content-between gap-2`;

          return (
            <div className={className}>
              <div className="flex align-items-center gap-2">
                
              </div>
              <span className="p-text-secondary text-xs">Обновлено 05.06.2025</span>
            </div>
          );
        };
        
        const textcolor = event.abnormal ? 'text-red-700':'text-blue-500';
        const bordercolor = event.abnormal ? 'border-red-700':'border-blue-500';

        const desc = event.desc.map((item: any, idx: number)=>{
          console.log(item);
          const children = item.children.map((child: any, idx: number)=>{
            const text = child.text;
            const inner = React.createElement('span', {dangerouslySetInnerHTML: {__html: text}});
          
            const link = child.link && child.link.toString().replace('#','');
            child.link && console.log('link: ',link)
            if (!child.link) {
              return (
                <Span key={idx}>{inner}</Span>
              );
            } else {
              return (
                <Link
                  key={idx}
                  to={child.link.replace('#','')}
                  smooth={true}
                  duration={200}
                  className='u'
                >
                  {text}
                </Link>
              );
            }
            //<A href={child.link} key={idx} text={text} className='u'/>
          });
          return (
            <Desc 
              key={idx}
              id={item.id}
            >
              {children}
            </Desc>
          );
        });

        return (
          <div className="flex" id={event.id} key={idx} style={{width: '100%'}}>
            <div
              className={`flex-initial flex align-items-center justify-content-center bg-white font-bold m-2 px-4 py-3 border-round-xs border-solid border-2 ${bordercolor}`}
              style={{maxWidth: '110px'}}
            >
              <span className={`${textcolor}`}>{event.time}</span>
            </div>
            <div
              className="flex-auto flex bg-white font-bold m-1 border-round-xs"
              style={{width: '100%'}}
            >
              <div className="flex" style={{width: '100%'}}>
                { 
                  event.abnormal && <Panel
                    headerTemplate={headerTemplate}
                    footerTemplate={footerTemplate}
                    header={event.flag}
                    className='font-bold m-1 border-round-xs text-left'
                    style={{width: '50%'}}
                    id={event.id}
                  >
                    <div className='text-900'>{desc}</div>
                  </Panel> }
                { 
                  !event.abnormal && <div
                    className="flex-auto flex bg-white text-100 font-bold m-1 px-3 py-3 border-round-xs"
                    style={{width:'50%'}}
                  ></div>
                }
                { 
                  !event.abnormal && <Panel
                    headerTemplate={headerTemplate}
                    footerTemplate={footerTemplate}
                    header={event.flag}
                    className='font-bold m-1 border-round-xs text-left'
                    style={{width: '50%'}}
                    id={event.id}
                  >
                    <div className='text-900'>{desc}</div>
                  </Panel> }
                { 
                  event.abnormal && <div
                    className="flex-auto flex bg-white text-100 font-bold m-1 px-3 py-3 border-round-xs"
                    style={{width:'50%'}}
                  ></div>
                }
              </div>
            </div>
        </div>
        );
      };

      const listTemplate = (items: TBLEvent[]) => {
        if (!items || items.length === 0) return null;

        let list = items.map((event, index) => {
            return itemTemplate(event, index);
        });

        return <div className="grid grid-nogutter" style={{width: '100%'}}>{list}</div>;
      };

      return (
        <center>
          <div className="card m-2 shadow-3" style={{maxWidth:'800px'}}>
            <div className='flex align-items-center justify-content-center bg-primary' style={{width: '100%'}}>
              <DataView value={rows} listTemplate={listTemplate} style={{width: '100%'}}/>
            </div>
          </div>
        </center>
      );
    }
    return (
      <div key={idx}>
        <center>
          <p></p>
          <h3 id={value.year}>{value.year}</h3>
        </center>
        {table()}
      </div>
    );
  });

  const args = DATA.case.arguments.map((item)=>{
    //const inner = React.createElement('div', {dangerouslySetInnerHTML: {__html: item.inner}});
    
    const children = item.children.map((child: any, idx: number)=>{
      const text = child.text;
      const inner = React.createElement('span', {dangerouslySetInnerHTML: {__html: text}});
    
      const link = child.link && child.link.toString().replace('#','');
      child.link && console.log('link: ',link)
      if (!child.link) {
        return (
          <Span key={idx}>{inner}</Span>
        );
      } else {
        return (
          <Link
            key={idx}
            to={child.link.replace('#','')}
            smooth={true}
            duration={200}
            className='u'
          >
            {text}
          </Link>
        );
      }
      
    });
    
    return (
      <div className='p text-justify'>
        {children}
      </div>
    );
  });
  
  const casedesc = () => {
    return (
      <center>
        <div className='p-2'></div>
        <h3>Рассмотрение дела в Арбитражном суде Московской области</h3>
        <div className='case-time-desc'>
          <div className='desc shadow-2 p-2'>
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
      
      <div className="card">
        {years}
      </div>

      {casedesc()}

    </>
  );
}