import { pageMetadata } from '@/lib/site'

/* The page itself is a client component and so cannot export metadata — this
   layout carries it instead. It renders nothing of its own.
   The description is the Blueprint card's copy in ServicesOverview, verbatim.
  */
export const metadata = pageMetadata({
  title: 'Blueprint',
  description:
    'Get your creator and social strategy working as one. Blueprint is where most Bad Brain clients start - audits, workshops and programme design that everything else builds from.',
  path: '/services/blueprint',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
