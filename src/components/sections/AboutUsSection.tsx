import { Fragment } from 'react'
import Link from 'next/link'
import ImageWithFallback from '@/components/ui/ImageWithFallback'
import type { WeddingConfig, Person, Labels, WikiSlug } from '@/types'
import { withBasePath } from '@/config/basePath'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

/** 설정 문자열의 `\n`을 실제 줄바꿈(`<br />`)으로 렌더 */
function BrText({ text }: { text?: string }) {
	if (text == null || text === '') return null
	const lines = text.split('\n')
	return (
		<>
			{lines.map((line, i) => (
				<Fragment key={i}>
					{i > 0 && <br />}
					{line}
				</Fragment>
			))}
		</>
	)
}

function ProfileCard({
	person,
	labels,
	delay,
	slug,
	showDetail,
}: {
	person: Person
	labels: Labels
	delay: number
	slug: WikiSlug
	showDetail: boolean
}) {
	if (!person.childhoodPhoto) return null

	return (
		<AnimateOnScroll delay={delay}>
			<div className="bg-warm-white rounded-2xl p-6 border border-beige/50">
				<div className="flex flex-row gap-4 items-stretch">
					<div className="relative shrink-0 w-36 h-36 sm:w-40 sm:h-40 rounded-xl overflow-hidden">
						<ImageWithFallback
							src={withBasePath(person.childhoodPhoto)}
							alt={`${person.name} 어린 시절`}
							fill
							className="object-cover scale-110"
							sizes="(max-width: 640px) 144px, 160px"
						/>
					</div>
					<div className="min-w-0 flex-1 flex flex-col items-start gap-2 pt-0.5">
						<p className="text-base">
							<span className="text-sage-500 font-medium">{person.role}</span>
							<span className="text-brown-dark font-serif ml-2">{person.name}</span>
						</p>
						{(person.birthInfo || person.description) && (
							<p className="text-[13px] text-brown leading-relaxed">
								<BrText text={person.birthInfo} />
								{person.birthInfo && person.description && <br />}
								<BrText text={person.description} />
							</p>
						)}
						{showDetail && (
							<Link
								href={`/${slug}`}
								className="mt-auto inline-flex items-center justify-center gap-0.5 rounded-full border border-sage-300 bg-sage-50 pl-3 pr-2.5 py-1.5 text-[13px] font-medium text-sage-700 hover:bg-sage-100 active:bg-sage-200"
							>
								{labels.profileDetailLink}
								<svg
									aria-hidden
									viewBox="0 0 16 16"
									className="h-3.5 w-3.5 shrink-0"
									fill="none"
								>
									<path
										d="M6 3.5 10.5 8 6 12.5"
										stroke="currentColor"
										strokeWidth="1.6"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</Link>
						)}
					</div>
				</div>
			</div>
		</AnimateOnScroll>
	)
}

export default function AboutUsSection({ config }: { config: WeddingConfig }) {
	return (
		<section id="about-us" className="w-full max-w-[430px] mx-auto px-6 py-12">
			<AnimateOnScroll>
				<h2 className="font-serif text-xl text-brown-dark text-center mb-2">{config.labels.aboutUsTitle}</h2>
				<p className="text-s text-warm-gray text-center mb-8">{config.labels.aboutUsSubtitle}</p>
			</AnimateOnScroll>

			<div className="space-y-4">
				<ProfileCard
					person={config.groom}
					labels={config.labels}
					delay={100}
					slug="groom"
					showDetail={!!config.wiki?.groom}
				/>
				<ProfileCard
					person={config.bride}
					labels={config.labels}
					delay={200}
					slug="bride"
					showDetail={!!config.wiki?.bride}
				/>
			</div>
		</section>
	)
}
