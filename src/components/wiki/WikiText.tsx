import { Fragment, type ReactNode } from 'react'
import Link from 'next/link'
import { withBasePath } from '@/config/basePath'

const INLINE_RE = /'''(.+?)'''|\[\[(.+?)\|(.+?)\]\]|\[\*(.*?)\]/g

export interface WikiFootnote {
	n: number
	text: string
}

function isExternal(href: string) {
	return /^https?:\/\//.test(href)
}

function WikiFile({ src, caption }: { src: string; caption: string }) {
	const [label, ...flags] = caption.split('|')
	const wide = flags.includes('wide')
	return (
		<figure className={`namu-file${wide ? ' is-wide' : ''}`}>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img src={withBasePath(src)} alt={label} />
			<figcaption>{label}</figcaption>
		</figure>
	)
}

function WikiCompare({
	leftSrc,
	leftCaption,
	rightSrc,
	rightCaption,
}: {
	leftSrc: string
	leftCaption: string
	rightSrc: string
	rightCaption: string
}) {
	return (
		<div className="namu-file-compare">
			<WikiFile src={leftSrc} caption={leftCaption} />
			<WikiFile src={rightSrc} caption={rightCaption} />
		</div>
	)
}

function WikiLink({ href, children }: { href: string; children: ReactNode }) {
	if (isExternal(href)) {
		return (
			<a href={href} className="namu-link namu-link-ext" target="_blank" rel="noreferrer">
				{children}
			</a>
		)
	}
	return (
		<Link href={href} className="namu-link">
			{children}
		</Link>
	)
}

function renderInline(text: string, footnotes: WikiFootnote[], offset = 0): ReactNode[] {
	const nodes: ReactNode[] = []
	let last = 0
	const re = new RegExp(INLINE_RE.source, 'g')
	let match: RegExpExecArray | null

	while ((match = re.exec(text)) !== null) {
		if (match.index > last) {
			nodes.push(text.slice(last, match.index))
		}

		if (match[1] != null) {
			nodes.push(<strong key={`${match.index}-b`}>{match[1]}</strong>)
		} else if (match[2] != null && match[3] != null) {
			if (match[2].startsWith('비교:')) {
				const [leftCaption, rightSrc, rightCaption] = match[3].split('|')
				if (leftCaption && rightSrc && rightCaption) {
					nodes.push(
						<WikiCompare
							key={`${match.index}-c`}
							leftSrc={match[2].slice(3)}
							leftCaption={leftCaption}
							rightSrc={rightSrc}
							rightCaption={rightCaption}
						/>,
					)
				}
			} else if (match[2].startsWith('파일:')) {
				nodes.push(
					<WikiFile key={`${match.index}-f`} src={match[2].slice(3)} caption={match[3]} />,
				)
			} else {
				nodes.push(
					<WikiLink key={`${match.index}-l`} href={match[3]}>
						{match[2]}
					</WikiLink>,
				)
			}
		} else if (match[4] != null) {
			const n = offset + footnotes.length + 1
			const fnText = match[4].trim()
			footnotes.push({ n, text: fnText })
			nodes.push(
				<sup key={`${match.index}-fn`} className="namu-fn">
					<a href={`#fn-${n}`} aria-label={`각주 ${n}: ${fnText}`}>
						[{n}]
						<span className="namu-fn-tip" role="tooltip">
							{fnText}
						</span>
					</a>
				</sup>,
			)
		}

		last = match.index + match[0].length
	}

	if (last < text.length) {
		nodes.push(text.slice(last))
	}

	return nodes
}

function renderLine(line: string, footnotes: WikiFootnote[], key: string, offset: number): ReactNode {
	const parts = line.split('\n')
	return parts.map((part, i) => (
		<Fragment key={`${key}-${i}`}>
			{i > 0 && <br />}
			{renderInline(part, footnotes, offset)}
		</Fragment>
	))
}

function renderBlocks(text: string, footnotes: WikiFootnote[], offset: number): ReactNode[] {
	const blocks = text.trim().split(/\n{2,}/)
	return blocks.map((block, bi) => {
		const lines = block.split('\n')
		const heading = lines[0].trim().match(/^===\s*(.+?)\s*===$/)
		if (heading) {
			const rest = lines.slice(1).join('\n').trim()
			return (
				<Fragment key={`b-${bi}`}>
					<h3 className="namu-subheading">{heading[1]}</h3>
					{rest ? <p className="namu-p">{renderLine(rest, footnotes, `b-${bi}`, offset)}</p> : null}
				</Fragment>
			)
		}

		const isList = lines.every((line) => line.startsWith('* ') && !line.startsWith('[*'))

		if (isList) {
			return (
				<ul key={`b-${bi}`} className="namu-list">
					{lines.map((line, li) => (
						<li key={`b-${bi}-i-${li}`}>{renderInline(line.slice(2), footnotes, offset)}</li>
					))}
				</ul>
			)
		}

		return (
			<p key={`b-${bi}`} className="namu-p">
				{renderLine(block, footnotes, `b-${bi}`, offset)}
			</p>
		)
	})
}

export function WikiText({ text, footnoteOffset = 0 }: { text: string; footnoteOffset?: number }) {
	const footnotes: WikiFootnote[] = []
	return <>{renderBlocks(text, footnotes, footnoteOffset)}</>
}

export function WikiInline({ text }: { text: string }) {
	const unused: WikiFootnote[] = []
	return <>{renderInline(text, unused)}</>
}
