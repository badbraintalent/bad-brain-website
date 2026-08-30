import { pageMetadata } from '@/lib/site'

/* The page itself is a client component and so cannot export metadata — this
   layout carries it instead. It renders nothing of its own.
   The description is the Resonate card's copy in ServicesOverview, verbatim.
  */
export const metadata = pageMetadata({
  title: 'Resonate',
  description:
    'Get discovered on your own terms. Co-founded by music insider Jen Long (Radio 1, NME, DICE), Resonate builds fans who\'ll follow you off the app and into the room.',
  path: '/services/resonate',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
