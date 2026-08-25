import PersonWikiPage from '@/components/wiki/PersonWikiPage'
import { weddingConfig } from '@/config/wedding'
import { createWikiMetadata } from '@/lib/wikiMetadata'

export const metadata = createWikiMetadata(weddingConfig.wiki!.bride)

export default function BridePage() {
	const wiki = weddingConfig.wiki?.bride
	if (!wiki) return null
	return <PersonWikiPage wiki={wiki} />
}
