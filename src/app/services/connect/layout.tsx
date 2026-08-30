import { pageMetadata } from '@/lib/site'

/* The page itself is a client component and so cannot export metadata — this
   layout carries it instead. It renders nothing of its own.
   The description is the first sentence of this page's own hero copy, verbatim.
  */
export const metadata = pageMetadata({
  title: 'Connect',
  description:
    'Over a decade in this industry has shown us the same thing again and again: the numbers are always best when the campaign lands the brand brief and still protects the creator’s own style.',
  path: '/services/connect',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
