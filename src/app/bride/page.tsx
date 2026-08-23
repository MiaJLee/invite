import type { Metadata } from 'next'
import PersonWikiPage from '@/components/wiki/PersonWikiPage'
import { weddingConfig } from '@/config/wedding'

export const metadata: Metadata = {
	title: `${weddingConfig.bride.name} - 나무위키`,
	description: `${weddingConfig.bride.name}에 대한 인물 문서`,
}

export default function BridePage() {
	const wiki = weddingConfig.wiki?.bride
	if (!wiki) return null
	return <PersonWikiPage wiki={wiki} />
}
