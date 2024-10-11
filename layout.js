// app/layout.js

import './globals.css';

export const metadata = {
  title: 'Dashboard App',
  description: 'A simple dashboard app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-yellow-500">
        {children}
      </body>
    </html>
  );
}