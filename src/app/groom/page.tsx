import type { Metadata } from 'next'
import PersonWikiPage from '@/components/wiki/PersonWikiPage'
import { weddingConfig } from '@/config/wedding'

export const metadata: Metadata = {
	title: `${weddingConfig.groom.name} - 나무위키`,
	description: `${weddingConfig.groom.name}에 대한 인물 문서`,
}

export default function GroomPage() {
	const wiki = weddingConfig.wiki?.groom
	if (!wiki) return null
	return <PersonWikiPage wiki={wiki} />
}
