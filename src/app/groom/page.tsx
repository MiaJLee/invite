import PersonWikiPage from '@/components/wiki/PersonWikiPage'
import { weddingConfig } from '@/config/wedding'
import { createWikiMetadata } from '@/lib/wikiMetadata'

export const metadata = createWikiMetadata(weddingConfig.wiki!.groom)

export default function GroomPage() {
	const wiki = weddingConfig.wiki?.groom
	if (!wiki) return null
	return <PersonWikiPage wiki={wiki} />
}
