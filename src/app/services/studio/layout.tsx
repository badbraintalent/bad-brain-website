import { pageMetadata } from '@/lib/site'

/* The page itself is a client component and so cannot export metadata — this
   layout carries it instead. It renders nothing of its own.
   The description is the Studio card's copy in ServicesOverview, verbatim.
  */
export const metadata = pageMetadata({
  title: 'Studio',
  description:
    'Turn your organic social strategy into content that holds attention rather than chases it. Creator content. Live production. Watch Time over View Count.',
  path: '/services/studio',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
