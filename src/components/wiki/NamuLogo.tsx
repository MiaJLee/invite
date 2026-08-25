/** 나무위키 로고 패러디 (공식 자산 미사용, 유사 스타일 자체 제작) */
export function NamuLogoMark() {
	return (
		<svg className="namu-logo-mark" viewBox="0 0 28 28" aria-hidden="true">
			<g stroke="#fff" strokeWidth="2.15" strokeLinecap="round">
				<line x1="14" y1="7.2" x2="7.4" y2="13.8" />
				<line x1="14" y1="7.2" x2="20.6" y2="13.8" />
				<line x1="7.4" y1="13.8" x2="7.4" y2="21.2" />
			</g>
			<circle cx="14" cy="5.6" r="2.45" fill="#fff" />
			<circle cx="7.4" cy="13.8" r="2.45" fill="#fff" />
			<circle cx="20.6" cy="13.8" r="2.45" fill="#fff" />
			<circle cx="7.4" cy="22.8" r="2.45" fill="#fff" />
		</svg>
	)
}

function NamuWordmark() {
	return (
		<span className="namu-logo-wordmark" aria-hidden="true">
			<span>나</span>
			<span>무</span>
			<span className="namu-logo-node">
				<span className="namu-logo-dot" style={{ left: '18%' }} />
				<span className="namu-logo-dot" style={{ left: '82%' }} />
				위
			</span>
			<span className="namu-logo-node">
				<span className="namu-logo-dot" style={{ left: '22%' }} />
				<span className="namu-logo-dot" style={{ left: '78%' }} />
				키
			</span>
		</span>
	)
}

export default function NamuLogo() {
	return (
		<>
			<NamuLogoMark />
			<NamuWordmark />
		</>
	)
}
