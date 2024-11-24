'use client';

import Link from 'next/link';
import { logout } from '@/app/(pages)/login/actions';
import { DashboardCircleIcon, CourseIcon, Notebook01Icon, Task01Icon, Files02Icon, Settings02Icon, CustomerService01Icon, Logout03Icon, CrownIcon, HelpCircleIcon, ArrowLeft01Icon, ArrowRight01Icon, NoteIcon } from "hugeicons-react";
import { useState } from 'react';
import { usePathname } from 'next/navigation';



const Sidebar = () => {
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(true);

  function toggleShowHideSidebar () {
    setShowSidebar(!showSidebar)
  }

  return (
    <div className=" bg-slate-200 text-slate-500 flex flex-col m-2 rounded-lg p-4">
      <div className={`flex gap-2 items-center h-20 text-slate-700 text-xl font-semibold ${showSidebar ? 'justify-start' : 'justify-center'}`}>
        <NoteIcon size={24}/>
        <span>{showSidebar ? 'StudentApp' : ''}</span>
      </div>
      <div className={`flex ${showSidebar ? 'justify-end' : 'justify-center'}`}>
        <button className='bg-slate-300 hover:bg-blue-200 rounded-lg' onClick={toggleShowHideSidebar}>
          {showSidebar ? <ArrowLeft01Icon size={24}/> : <ArrowRight01Icon size={24}/>}
        </button>
        
      </div>
      <div className="flex-grow overflow-y-auto flex flex-col justify-between">
        <div>
          <div className='py-4'>
            <h3 className="text-slate-500 text-m font-medium uppercase py-2" >{showSidebar ? 'General' : ''}</h3>
            <ul className="space-y-2 text-slate-700 ">
              <li>
                <Link
                  href="/dashboard"
                  className={`block w-full text-left p-3 rounded-lg flex gap-2 focus:outline-none ${pathname === '/dashboard' ? 'bg-blue-300' : 'hover:bg-slate-300'} ${showSidebar ? 'justify-start' : 'justify-center'}`}
                >
                  <DashboardCircleIcon size={24}/>
                  {showSidebar ? 'Dashboard' : ''}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/courses"
                  className={`block w-full text-left p-3 rounded-lg flex gap-2 focus:outline-none ${pathname === '/dashboard/courses' ? 'bg-blue-300' : 'hover:bg-slate-300'} ${showSidebar ? 'justify-start' : 'justify-center'}`}
                >
                  <CourseIcon size={24}/>
                  {showSidebar ? 'Courses' : ''}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/notebooks"
                  className={`block w-full text-left p-3 rounded-lg flex gap-2 focus:outline-none ${pathname === '/dashboard/notebooks' ? 'bg-blue-300' : 'hover:bg-slate-300'} ${showSidebar ? 'justify-start' : 'justify-center'}`}
                >
                  <Notebook01Icon size={24}/>
                  {showSidebar ? 'Notebooks' : ''}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/tasks"
                  className={`block w-full text-left p-3 rounded-lg flex gap-2 focus:outline-none ${pathname === '/dashboard/tasks' ? 'bg-blue-300' : 'hover:bg-slate-300'} ${showSidebar ? 'justify-start' : 'justify-center'}`}
                >
                  <Task01Icon size={24}/>
                  {showSidebar ? 'Tasks' : ''}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/resources"
                  className={`block w-full text-left p-3 rounded-lg flex gap-2 focus:outline-none ${pathname === '/dashboard/resources' ? 'bg-blue-300' : 'hover:bg-slate-300'} ${showSidebar ? 'justify-start' : 'justify-center'}`}
                >
                  <Files02Icon size={24}/>
                  {showSidebar ? 'Resources' : ''}
                </Link>
              </li>
            </ul>
          </div>
          
          <div className='py-4'>
            <h3 className="text-slate-500 text-m font-medium uppercase py-2" >{showSidebar ? 'More' : ''}</h3>
            <ul className="space-y-2 text-slate-700 ">
              <li>
                <Link
                  href="/dashboard/settings"
                  className={`block w-full text-left p-3 rounded-lg flex gap-2 focus:outline-none ${pathname === '/dashboard/settings' ? 'bg-blue-300' : 'hover:bg-slate-300'} ${showSidebar ? 'justify-start' : 'justify-center'}`}
                >
                  <Settings02Icon size={24}/>
                  {showSidebar ? 'Settings' : ''}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/support"
                  className={`block w-full text-left p-3 rounded-lg flex gap-2 focus:outline-none ${pathname === '/dashboard/support' ? 'bg-blue-300' : 'hover:bg-slate-300'} ${showSidebar ? 'justify-start' : 'justify-center'}`}
                >
                  <CustomerService01Icon size={24}/>
                  {showSidebar ? 'Support' : ''}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/support"
                  className={`block w-full text-left p-3 rounded-lg flex gap-2 focus:outline-none ${pathname === '/dashboard/help' ? 'bg-blue-300' : 'hover:bg-slate-300'} ${showSidebar ? 'justify-start' : 'justify-center'}`}
                >
                  <HelpCircleIcon size={24}/>
                  {showSidebar ? 'Help' : ''}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className='self-end'>
          
          <button className={`block w-full text-left p-3 my-4 text-slate-200 rounded-lg flex gap-2 bg-blue-400 hover:bg-blue-500 focus:outline-none ${showSidebar ? 'justify-start' : 'justify-center'}`}>
            <CrownIcon size={24}/>
            {showSidebar ? 'Upgrade to pro' : ''}
          </button>

          <button className={`block w-full text-left p-3 text-slate-500 rounded-lg flex gap-2 hover:bg-slate-300 focus:outline-none ${showSidebar ? 'justify-start' : 'justify-center'}`} onClick={() => logout()}>
            <Logout03Icon size={24}/>
            {showSidebar ? 'Logout' : ''}
          </button>

          <div className={`flex gap-2 py-4 ${showSidebar ? 'justify-start' : 'justify-center'}`}>
            <div className='w-12 h-12 bg-blue-400 rounded-full flex justify-end' >
              <div className='w-4 h-4 bg-green-500 rounded-full border-2 border-slate-200'></div>
            </div>
            <div>
              <p className='text-slate-500 text-s font-medium'>{showSidebar ? 'Elina Rosato' : ''}</p>
              <p className='text-slate-400 text-s'>{showSidebar ? 'rosatoelina@gmail.com' : ''}</p>
            </div>
          </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default Sidebar;
