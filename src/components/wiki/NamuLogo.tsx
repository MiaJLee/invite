import { withBasePath } from '@/config/basePath'

export default function NamuLogo() {
	return (
		<img
			src={withBasePath('/images/wiki/namuwiki-logo-white.png')}
			alt="나무위키"
			className="namu-logo-image"
			width={120}
			height={40}
		/>
	)
}
