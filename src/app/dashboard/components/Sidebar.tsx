'use client';

import Link from 'next/link';
import { logout } from '@/app/(pages)/login/actions';
import { DashboardCircleIcon, CourseIcon, Notebook01Icon, Task01Icon, Files02Icon, Settings02Icon, CustomerService01Icon, Logout03Icon, CrownIcon, HelpCircleIcon } from "hugeicons-react";



const Sidebar = () => {

  return (
    <div className="w-64 bg-gray-200 text-white flex flex-col m-2 rounded-lg p-4">
      <div className="flex justify-start items-center h-20 text-gray-700 text-xl font-semibold">
        <span>My Platform</span>
      </div>
      <div className="flex-grow overflow-y-auto flex flex-col justify-between">
        <div>
          <div className='py-4'>
            <h3 className="text-gray-500 text-m font-medium uppercase py-2" >General</h3>
            <ul className="space-y-2 text-gray-700 ">
              <li>
                <Link
                  href="/dashboard"
                  className="block w-full text-left p-3 rounded-lg flex justify-start gap-2 hover:bg-gray-300 focus:outline-none"
                >
                  <DashboardCircleIcon size={24}/>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/courses"
                  className="block w-full text-left p-3 rounded-lg flex justify-start gap-2 hover:bg-gray-300 focus:outline-none"
                >
                  <CourseIcon size={24}/>
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/notebooks"
                  className="block w-full text-left p-3 rounded-lg flex justify-start gap-2 hover:bg-gray-300 focus:outline-none"
                >
                  <Notebook01Icon size={24}/>
                  Notebooks
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/tasks"
                  className="block w-full text-left p-3 rounded-lg flex justify-start gap-2 hover:bg-gray-300 focus:outline-none"
                >
                  <Task01Icon size={24}/>
                  Tasks
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/resources"
                  className="block w-full text-left p-3 rounded-lg flex justify-start gap-2 hover:bg-gray-300 focus:outline-none"
                >
                  <Files02Icon size={24}/>
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          
          <div className='py-4'>
            <h3 className="text-gray-500 text-m font-medium uppercase py-2" >More</h3>
            <ul className="space-y-2 text-gray-700 ">
              <li>
                <Link
                  href="/dashboard/settings"
                  className="block w-full text-left p-3 rounded-lg flex justify-start gap-2 hover:bg-gray-300 focus:outline-none"
                >
                  <Settings02Icon size={24}/>
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/support"
                  className="block w-full text-left p-3 rounded-lg flex justify-start gap-2 hover:bg-gray-300 focus:outline-none"
                >
                  <CustomerService01Icon size={24}/>
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/support"
                  className="block w-full text-left p-3 rounded-lg flex justify-start gap-2 hover:bg-gray-300 focus:outline-none"
                >
                  <HelpCircleIcon size={24}/>
                  Help
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className='self-end'>
          
          <button className="block w-full text-left p-3 my-4 text-gray-700 rounded-lg flex justify-start gap-2 bg-blue-300 hover:bg-blue-400 focus:outline-none">
            <CrownIcon size={24}/>
            Upgrade to pro
          </button>

          <button className="block w-full text-left p-3 text-gray-700 rounded-lg flex justify-start gap-2 hover:bg-gray-300 focus:outline-none" onClick={() => logout()}>
            <Logout03Icon size={24}/>
            Logout
          </button>

          <div className='flex gap-2 py-4'>
            <div className='w-12 h-12 bg-blue-400 rounded-full flex' style={{ justifySelf: 'end' }} >
              <div className='w-4 h-4 bg-green-500 rounded-full border-2 border-gray-200'></div>
            </div>
            <div>
              <p className='text-gray-500 text-s font-medium'>Elina Rosato</p>
              <p className='text-gray-400 text-s'>rosatoelina@gmail.com</p>
            </div>
          </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default Sidebar;
