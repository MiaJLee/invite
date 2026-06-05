'use client'

import { useState, useEffect, useCallback } from 'react'
import { DateTime } from 'luxon'
import type { WeddingConfig } from '@/types'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import { fetchGuestbook, submitGuestbookEntry, type GuestbookEntry } from '@/lib/guestbook'

function parseDate(value: string): DateTime {
	// 우선 ISO 형식으로 파싱 (클라이언트가 만든 낙관적 항목)
	const iso = DateTime.fromISO(value, { zone: 'Asia/Seoul' })
	if (iso.isValid) return iso
	// 서버(Apps Script)가 JS Date.toString() 형식("Fri Jun 05 2026 ...")으로 내려주는 경우 폴백
	const js = new Date(value)
	if (!Number.isNaN(js.getTime())) {
		return DateTime.fromJSDate(js).setZone('Asia/Seoul')
	}
	return DateTime.invalid('unparseable')
}

function formatDate(value: string, locale: 'ko' | 'en'): string {
	const dt = parseDate(value)
	if (!dt.isValid) return ''
	return locale === 'en' ? dt.toFormat('MMM d, yyyy') : dt.toFormat('yyyy.MM.dd')
}

export default function GuestbookSection({ config }: { config: WeddingConfig }) {
	const { labels } = config
	const scriptUrl = config.guestbookScriptUrl ?? ''

	const [entries, setEntries] = useState<GuestbookEntry[]>([])
	const [listState, setListState] = useState<'loading' | 'ready' | 'error'>('loading')
	const [name, setName] = useState('')
	const [message, setMessage] = useState('')
	const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
	const [showAll, setShowAll] = useState(false)

	const PREVIEW_COUNT = 5
	const visibleEntries = showAll ? entries : entries.slice(0, PREVIEW_COUNT)
	const hasMore = entries.length > PREVIEW_COUNT

	const load = useCallback(async () => {
		if (!scriptUrl) return
		try {
			const data = await fetchGuestbook(scriptUrl)
			setEntries(data)
			setListState('ready')
		} catch {
			setListState('error')
		}
	}, [scriptUrl])

	useEffect(() => {
		// 다음 틱에 실행해 이펙트 내 동기 setState로 인한 연쇄 렌더 방지
		const id = setTimeout(load, 0)
		return () => clearTimeout(id)
	}, [load])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!name.trim() || !message.trim() || status === 'loading') return

		setStatus('loading')
		const optimistic: GuestbookEntry = {
			name: name.trim().slice(0, 50),
			message: message.trim().slice(0, 500),
			createdAt: DateTime.now().toISO() ?? '',
		}

		const result = await submitGuestbookEntry(scriptUrl, {
			name: optimistic.name,
			message: optimistic.message,
		})

		if (result.success) {
			setEntries((prev) => [optimistic, ...prev])
			setName('')
			setMessage('')
			setStatus('success')
			// 서버 반영분으로 동기화 (Apps Script appendRow 직후 약간의 지연 고려)
			setTimeout(() => {
				load()
			}, 1200)
			setTimeout(() => setStatus('idle'), 2500)
		} else {
			setStatus('error')
		}
	}

	return (
		<section id="guestbook" className="w-full max-w-[430px] mx-auto px-6 py-12">
			<AnimateOnScroll>
				<h2 className="font-serif text-xl text-brown-dark text-center mb-2">{labels.guestbookTitle}</h2>
				<p className="text-xs text-warm-gray text-center mb-6">{labels.guestbookSubtitle}</p>
			</AnimateOnScroll>

			{/* 작성 폼 */}
			<AnimateOnScroll delay={50}>
				<form
					onSubmit={handleSubmit}
					className="bg-warm-white rounded-2xl p-5 border border-beige/50 mb-6 space-y-3"
				>
					<div>
						<label className="text-xs text-brown-dark font-medium mb-1 block">
							{labels.guestbookNameLabel}
						</label>
						<input
							type="text"
							required
							maxLength={50}
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full bg-cream border border-beige rounded-xl px-4 py-2.5 text-sm text-brown-dark outline-none focus:border-sage-400 focus:ring-1 focus:ring-sage-400"
							placeholder={labels.guestbookNamePlaceholder}
						/>
					</div>

					<div>
						<label className="text-xs text-brown-dark font-medium mb-1 block">
							{labels.guestbookMessageLabel}
						</label>
						<textarea
							required
							maxLength={500}
							rows={3}
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							className="w-full bg-cream border border-beige rounded-xl px-4 py-2.5 text-sm text-brown-dark outline-none focus:border-sage-400 focus:ring-1 focus:ring-sage-400 resize-none"
							placeholder={labels.guestbookMessagePlaceholder}
						/>
					</div>

					<button
						type="submit"
						disabled={status === 'loading'}
						className="w-full py-3 bg-sage-500 text-white text-sm rounded-xl hover:bg-sage-600 transition-colors disabled:opacity-50"
					>
						{status === 'loading' ? labels.guestbookSubmitting : labels.guestbookSubmit}
					</button>

					{status === 'success' && (
						<p className="text-xs text-sage-600 text-center">{labels.guestbookThankYou}</p>
					)}
					{status === 'error' && (
						<p className="text-xs text-red-500 text-center">{labels.guestbookError}</p>
					)}
				</form>
			</AnimateOnScroll>

			{/* 목록 */}
			<AnimateOnScroll delay={100}>
				{listState === 'loading' && (
					<p className="text-xs text-warm-gray text-center py-6 animate-pulse">
						{labels.guestbookLoading}
					</p>
				)}

				{listState === 'error' && (
					<p className="text-xs text-warm-gray text-center py-6">{labels.guestbookLoadError}</p>
				)}

				{listState === 'ready' && entries.length === 0 && (
					<p className="text-xs text-warm-gray text-center py-6 whitespace-pre-line">
						{labels.guestbookEmpty}
					</p>
				)}

				{listState === 'ready' && entries.length > 0 && (
					<>
						<ul className="divide-y divide-beige/40 border-t border-beige/40">
							{visibleEntries.map((entry, idx) => (
								<li key={`${entry.createdAt}-${idx}`} className="py-4">
									<p className="text-[15px] text-brown-dark whitespace-pre-line break-words leading-relaxed mb-2">
										{entry.message}
									</p>
									<div className="flex items-baseline justify-between">
										<span className="text-xs text-warm-gray">{entry.name}</span>
										<span className="text-[11px] text-warm-gray/80 shrink-0 ml-2">
											{formatDate(entry.createdAt, labels.locale)}
										</span>
									</div>
								</li>
							))}
						</ul>

						{hasMore && (
							<button
								type="button"
								onClick={() => setShowAll((v) => !v)}
								className="w-full mt-4 py-2.5 text-xs text-brown border border-beige/60 rounded-xl hover:bg-sage-50 transition-colors"
							>
								{showAll
									? labels.guestbookShowLess
									: `${labels.guestbookShowAll} (${entries.length})`}
							</button>
						)}
					</>
				)}
			</AnimateOnScroll>
		</section>
	)
}
