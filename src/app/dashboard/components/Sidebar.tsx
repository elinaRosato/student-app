'use client';

import Link from 'next/link';
import { logout } from '@/app/(pages)/login/actions';


const Sidebar = () => {

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="flex justify-center items-center h-20 bg-gray-900 text-xl font-semibold">
        <span>My Platform</span>
      </div>
      <div className="flex-grow overflow-y-auto">
        <ul className="space-y-2 p-4">
          <li>
            <Link
              href="/dashboard"
              className="block w-full text-left p-3 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/courses"
              className="block w-full text-left p-3 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              Courses
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/notebooks"
              className="block w-full text-left p-3 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              Notebooks
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/tasks"
              className="block w-full text-left p-3 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              Tasks
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/resources"
              className="block w-full text-left p-3 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              Resources
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              className="block w-full text-left p-3 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              Settings
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/support"
              className="block w-full text-left p-3 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              Support
            </Link>
          </li>
          <li>
            <button
              className="block w-full text-left p-3 rounded-md hover:bg-red-600 focus:outline-none"
              onClick={() => logout()}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
