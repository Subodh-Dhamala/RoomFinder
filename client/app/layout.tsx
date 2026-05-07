import { ClerkProvider} from '@clerk/nextjs';
import QueryProvider from './QueryProvider';
import {Toaster} from 'react-hot-toast';
import './globals.css';

export const metadata = {
  title: "RoomFinder",
  description: "Find your perfect room",
}

export default function RootLayout({children}:{children: React.ReactNode}){
  return(
    <ClerkProvider>
      <html lang='en'>
        <body>
          <QueryProvider>
            {children}
            <Toaster position='top-right' />
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}