import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Student App',
  description: 'The number one tool for students. Created by students, for students.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Student App</title>
      </head>
      <body className={`root-body`}>
        {children}
      </body>
    </html>
  );
}
