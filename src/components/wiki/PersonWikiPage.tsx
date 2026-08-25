'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { PersonWiki, WikiSlug } from '@/types'
import ImageWithFallback from '@/components/ui/ImageWithFallback'
import { withBasePath } from '@/config/basePath'
import { WikiInline, WikiText, type WikiFootnote } from './WikiText'
import NamuLogo from './NamuLogo'
import './namu.css'

function IconClock() {
	return (
		<svg viewBox="0 0 20 20" aria-hidden="true">
			<circle cx="10" cy="10" r="7.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
			<path d="M10 6.2v4.1l2.6 1.7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
		</svg>
	)
}

function IconChat() {
	return (
		<svg viewBox="0 0 20 20" aria-hidden="true">
			<path
				d="M4 5.2h8.2a2 2 0 0 1 2 2v3.4a2 2 0 0 1-2 2H9.1L6.2 15.4V12.6H4a2 2 0 0 1-2-2V7.2a2 2 0 0 1 2-2z"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
			/>
			<circle cx="15.4" cy="6.2" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.4" />
		</svg>
	)
}

function IconToolbox() {
	return (
		<svg viewBox="0 0 20 20" aria-hidden="true">
			<rect x="2.4" y="7.2" width="15.2" height="9" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.5" />
			<path d="M7 7.2V5.6A1.6 1.6 0 0 1 8.6 4h2.8A1.6 1.6 0 0 1 13 5.6v1.6M2.4 11h15.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
		</svg>
	)
}

function IconShuffle() {
	return (
		<svg viewBox="0 0 20 20" aria-hidden="true">
			<path
				d="M3 6.5h3.2l3.4 7h3.2M3 13.5h3.2l1.2-2.4M13.8 6.5H16.5M13.8 13.5H16.5"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
			/>
			<path d="M14.6 4.8 17 6.5 14.6 8.2M14.6 11.8 17 13.5 14.6 15.2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}

function IconSearch() {
	return (
		<svg viewBox="0 0 20 20" aria-hidden="true">
			<circle cx="8.6" cy="8.6" r="5.1" fill="none" stroke="currentColor" strokeWidth="1.7" />
			<path d="M12.4 12.4 16.2 16.2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
		</svg>
	)
}

function IconGo() {
	return (
		<svg viewBox="0 0 20 20" aria-hidden="true">
			<circle cx="10" cy="10" r="7.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
			<path d="M8.2 6.8 12.6 10 8.2 13.2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}

function IconBell() {
	return (
		<svg viewBox="0 0 20 20" aria-hidden="true">
			<path d="M10 3.4a4.4 4.4 0 0 1 4.4 4.4v3.1l1.3 2.1H4.3L5.6 10.9V7.8A4.4 4.4 0 0 1 10 3.4z" fill="none" stroke="currentColor" strokeWidth="1.5" />
			<path d="M8.2 16.2a1.8 1.8 0 0 0 3.6 0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
		</svg>
	)
}

function IconUser() {
	return (
		<svg viewBox="0 0 20 20" aria-hidden="true">
			<circle cx="10" cy="7.2" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
			<path d="M4.4 16.4c.7-3 2.8-4.4 5.6-4.4s4.9 1.4 5.6 4.4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
		</svg>
	)
}

function ArticleTools() {
	return (
		<div className="namu-article-tools" aria-hidden="true">
			<span>[편집]</span>
			<span>[역사]</span>
			<span>[토론]</span>
			<span>[역링크]</span>
		</div>
	)
}

export default function PersonWikiPage({ wiki }: { wiki: PersonWiki }) {
	const router = useRouter()
	const [query, setQuery] = useState('')
	const [miss, setMiss] = useState('')
	const [tocOpen, setTocOpen] = useState(true)
	const [specialOpen, setSpecialOpen] = useState(false)

	const otherSlug: WikiSlug = wiki.slug === 'groom' ? 'bride' : 'groom'

	const footnotes = useMemo(() => {
		const collected: WikiFootnote[] = []
		for (const section of wiki.sections) {
			WikiTextCollector(section.body, collected)
		}
		return collected
	}, [wiki])

	const footnoteOffsets = useMemo(() => {
		const offsets: number[] = []
		let acc = 0
		for (const section of wiki.sections) {
			offsets.push(acc)
			acc += (section.body.match(/\[\*/g) ?? []).length
		}
		return offsets
	}, [wiki])

	useEffect(() => {
		document.title = `${wiki.title} - 나무위키`
	}, [wiki.title])

	function onSearch(e: FormEvent) {
		e.preventDefault()
		const q = query.trim()
		if (!q) return
		if (/박종혁|종혁|신랑|groom/i.test(q)) {
			setMiss('')
			router.push('/groom')
			return
		}
		if (/이지형|지형|신부|bride/i.test(q)) {
			setMiss('')
			router.push('/bride')
			return
		}
		setMiss(`'${q}'에 대한 문서를 찾을 수 없습니다.`)
	}

	return (
		<div className="namu-root">
			<header className="namu-header">
				<div className="namu-topbar">
					<div className="namu-topbar-inner">
						<Link
							href={wiki.slug === 'groom' ? '/groom' : '/bride'}
							className="namu-logo"
							aria-label="나무위키"
						>
							<NamuLogo />
						</Link>
						<nav className="namu-top-links" aria-label="위키 메뉴">
							<span className="namu-top-link">
								<IconClock />
								최근 변경
							</span>
							<span className="namu-top-link">
								<IconChat />
								최근 토론
							</span>
							<div className="namu-special">
								<button
									type="button"
									className="namu-top-link is-button"
									aria-expanded={specialOpen}
									onClick={() => setSpecialOpen((v) => !v)}
								>
									<IconToolbox />
									특수 기능
									<span className="namu-caret">▾</span>
								</button>
								{specialOpen && (
									<div className="namu-special-menu">
										<Link href="/groom" onClick={() => setSpecialOpen(false)}>
											박종혁
										</Link>
										<Link href="/bride" onClick={() => setSpecialOpen(false)}>
											이지형
										</Link>
										<Link href="/" onClick={() => setSpecialOpen(false)}>
											청첩장
										</Link>
									</div>
								)}
							</div>
						</nav>
						<div className="namu-top-tools">
							<button
								type="button"
								className="namu-random-btn"
								title="아무 문서로 이동"
								aria-label="아무 문서로 이동"
								onClick={() => router.push(`/${otherSlug}`)}
							>
								<IconShuffle />
							</button>
							<form className="namu-search" onSubmit={onSearch}>
								<input
									type="search"
									value={query}
									onChange={(e) => {
										setQuery(e.target.value)
										setMiss('')
									}}
									placeholder="여기에서 검색"
									aria-label="여기에서 검색"
								/>
								<button type="submit" className="namu-search-icon" title="검색" aria-label="검색">
									<IconSearch />
								</button>
								<button type="submit" className="namu-search-icon" title="이동" aria-label="이동">
									<IconGo />
								</button>
							</form>
							<span className="namu-icon-btn" aria-hidden="true">
								<IconBell />
							</span>
							<span className="namu-icon-btn" aria-hidden="true">
								<IconUser />
							</span>
						</div>
					</div>
				</div>
			</header>

			<div className="namu-shell">
				<article className="namu-article">
					<div className="namu-article-meta">
						<span>최근 수정 시각: {wiki.lastModified}</span>
						<ArticleTools />
					</div>

					<h1 className="namu-title">
						{wiki.title}
						{wiki.englishName && <span className="namu-title-en">{wiki.englishName}</span>}
					</h1>
					<CategoryBar categories={wiki.categories} />
					{miss && <p className="namu-search-miss">{miss}</p>}

					{wiki.templateNote && (
						<div className="namu-template">
							<span className="namu-template-title">[틀:패러디]</span>
							<WikiInline text={wiki.templateNote} />
						</div>
					)}

					<table className="namu-infobox">
						<thead>
							<tr>
								<th className="namu-infobox-head" colSpan={2}>
									{wiki.infoboxTitle}
									{wiki.englishName && <span className="namu-infobox-en">{wiki.englishName}</span>}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="namu-infobox-photo" colSpan={2}>
									<div className="namu-infobox-photo-frame">
										<ImageWithFallback
											src={withBasePath(wiki.photo)}
											alt={wiki.title}
											fill
											className="object-cover"
											sizes="270px"
										/>
									</div>
									{wiki.photoCaption && (
										<span className="namu-infobox-caption">{wiki.photoCaption}</span>
									)}
								</td>
							</tr>
							{wiki.infobox.map((row, i) =>
								row.header ? (
									<tr key={`h-${i}`} className="namu-infobox-header">
										<td colSpan={2}>{row.label}</td>
									</tr>
								) : (
									<tr key={`r-${i}`}>
										<th className="namu-infobox-label">{row.label}</th>
										<td>
											<WikiInline text={row.value} />
										</td>
									</tr>
								),
							)}
						</tbody>
					</table>

					<nav className="namu-toc" aria-label="목차">
						<div className="namu-toc-title">
							목차{' '}
							<button type="button" className="namu-toc-toggle" onClick={() => setTocOpen((v) => !v)}>
								[{tocOpen ? '접기' : '펼치기'}]
							</button>
						</div>
						{tocOpen && (
							<ol>
								{wiki.sections.map((section, i) => (
									<li key={section.id}>
										<a href={`#${section.id}`}>
											{i + 1}. {section.title}
										</a>
									</li>
								))}
							</ol>
						)}
					</nav>

					{wiki.sections.map((section, i) => (
						<section key={section.id}>
							<h2 className="namu-heading" id={section.id}>
								<span className="namu-edit">[편집]</span>
								<a className="namu-heading-num" href={`#${section.id}`}>
									{i + 1}.
								</a>
								{section.title}
							</h2>
							<WikiText text={section.body} footnoteOffset={footnoteOffsets[i]} />
						</section>
					))}

					{footnotes.length > 0 && (
						<section className="namu-footnotes" aria-label="각주">
							<div className="namu-footnotes-title">각주</div>
							<ol>
								{footnotes.map((fn) => (
									<li key={fn.n} id={`fn-${fn.n}`}>
										<WikiInline text={fn.text} />
									</li>
								))}
							</ol>
						</section>
					)}

					<CategoryBar categories={wiki.categories} />
				</article>
			</div>

			<footer className="namu-footer">
				<p>이 문서는 청첩장용 비공식 패러디이며, namu.wiki 및 umanle S.R.L.과 무관합니다.</p>
				<p className="namu-footer-credit">
					나무위키 로고 ©{' '}
					<a href="https://namu.wiki/w/%EB%82%98%EB%AC%B4%EC%9C%84%ED%82%A4:%EC%83%81%EC%A7%95" target="_blank" rel="noreferrer">
						kein
					</a>
					,{' '}
					<a href="https://creativecommons.org/licenses/by-nc-sa/2.0/kr/" target="_blank" rel="noreferrer">
						CC BY-NC-SA 2.0 KR
					</a>
				</p>
			</footer>

			<nav className="namu-scroll-nav" aria-label="페이지 이동">
				<button
					type="button"
					className="namu-scroll-btn"
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					aria-label="맨 위로"
				>
					TOP
				</button>
				<button
					type="button"
					className="namu-scroll-btn"
					onClick={() =>
						window.scrollTo({
							top: document.documentElement.scrollHeight,
							behavior: 'smooth',
						})
					}
					aria-label="맨 아래로"
				>
					BOTTOM
				</button>
			</nav>
		</div>
	)
}

function CategoryBar({ categories }: { categories: string[] }) {
	return (
		<div className="namu-category">
			<span className="namu-category-label">분류</span>
			{categories.map((cat, i) => (
				<span key={cat}>
					{i > 0 && <span className="namu-category-sep">|</span>}
					<span className="namu-link">{cat}</span>
				</span>
			))}
		</div>
	)
}

/** WikiText와 동일한 각주 패턴만 모아 하단 목록을 만든다. */
function WikiTextCollector(text: string, footnotes: WikiFootnote[]) {
	const re = /\[\*(.*?)\]/g
	let match: RegExpExecArray | null
	while ((match = re.exec(text)) !== null) {
		footnotes.push({ n: footnotes.length + 1, text: match[1].trim() })
	}
}
