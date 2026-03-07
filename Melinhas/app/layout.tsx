import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/contexts/cart-context'
import { ProductsProvider } from '@/contexts/products-context'
import { SalesProvider } from '@/contexts/sales-context'
import { Cart } from '@/components/cart'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Melinhas | Tradição e Sabor desde 1986',
  description: 'A melhor pastelaria da cidade. Pastéis crocantes, recheios generosos e caldo de cana fresquinho. Venha nos visitar!',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <SalesProvider>
          <ProductsProvider>
            <CartProvider>
              {children}
              <Cart />
            </CartProvider>
          </ProductsProvider>
        </SalesProvider>
        <Analytics />
      </body>
    </html>
  )

}
