import { pageMetadata } from '@/lib/site'

/* The page itself is a client component and so cannot export metadata — this
   layout carries it instead. It renders nothing of its own.
   The description is this page's own hero copy, verbatim.
  */
export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Good to have you here. Wherever you\'re up to - a rough idea or a firm brief - we\'d love to hear about it.',
  path: '/contact',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
