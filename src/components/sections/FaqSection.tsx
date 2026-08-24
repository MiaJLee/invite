'use client'

import type { WeddingConfig } from '@/types'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'
import Accordion from '@/components/ui/Accordion'

export default function FaqSection({ config }: { config: WeddingConfig }) {
	const { faqTitle, faqSubtitle, faqItems } = config.labels

	return (
		<section id="faq" className="w-full max-w-[430px] mx-auto px-6 py-12">
			<AnimateOnScroll>
				<h2 className="font-serif text-xl text-brown-dark text-center mb-2">{faqTitle}</h2>
				<p className="text-xs text-warm-gray text-center mb-8">{faqSubtitle}</p>
			</AnimateOnScroll>

			<div className="space-y-3">
				{faqItems.map((item, idx) => (
					<AnimateOnScroll key={item.question} delay={idx * 80}>
						<Accordion title={item.question} defaultOpen={idx === 0}>
							{item.answer}
						</Accordion>
					</AnimateOnScroll>
				))}
			</div>
		</section>
	)
}
