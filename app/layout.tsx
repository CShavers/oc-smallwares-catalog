import './globals.css';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from '@/lib/useCart';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Toaster position="top-right" />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
