import type { Metadata } from 'next'
import type { PersonWiki } from '@/types'
import { weddingConfig } from '@/config/wedding'

export function createWikiMetadata(wiki: PersonWiki): Metadata {
	const title = `${wiki.title} - 나무위키`
	const description =
		wiki.categories.find((category) => category.includes('예비')) ??
		`${wiki.title}에 대한 인물 문서`
	const imageUrl = `${weddingConfig.siteUrl}${wiki.photo}`
	const pageUrl = `${weddingConfig.siteUrl}/${wiki.slug}/`

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url: pageUrl,
			images: [
				{
					url: imageUrl,
					alt: wiki.photoCaption ? `${wiki.title} ${wiki.photoCaption}` : wiki.title,
				},
			],
			type: 'article',
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [imageUrl],
		},
	}
}
