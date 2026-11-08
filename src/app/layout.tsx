import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/context';
import { ThemeProvider } from '@/lib/theme/ThemeContext';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'ShikhoPath | Master English & Excel in IELTS',
  description:
    'Comprehensive English learning platform and IELTS preparation ecosystem from Foundations to Band 8.5+ mastery.',
  keywords: ['English learning', 'IELTS preparation', 'Grammar Academy', 'Vocabulary Builder', 'AI English Tutor'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var saved = localStorage.getItem('shikhopath-theme') || 'system';
                var isDark = saved === 'dark' || (saved === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (isDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-[#F8FAFC] dark:bg-[#0B0F19] text-[#0F172A] dark:text-[#F8FAFC] text-[16px] transition-colors duration-200">
        <ThemeProvider>
          <LanguageProvider initialLanguage="en">
            {children}
            <Toaster position="top-right" richColors />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
