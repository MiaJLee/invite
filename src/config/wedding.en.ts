import type { WeddingConfig } from '@/types'
import { weddingConfig as koConfig } from './wedding'
import { labelsEn } from './labels.en'

export const weddingConfigEn: WeddingConfig = {
	...koConfig,
	labels: labelsEn,

	groom: {
		...koConfig.groom,
		role: 'Groom',
		name: 'Valentine Park',
		lastName: 'Park',
		firstName: 'Valentine',
		relation: "'s Son",
		birthInfo: 'Born Feb 1996, Seoul',
		description: 'Sentimental science boy 🧪',
		mbti: 'ISFJ \nTurbulent defender',
		childhoodDream: 'Space scientist',
		favoriteThings: ['Futsal', 'Building plastic models', 'Games'],
	},
	bride: {
		...koConfig.bride,
		role: 'Bride',
		name: 'Mia Lee',
		lastName: 'Lee',
		firstName: 'Mia',
		relation: "'s Daughter",
		birthInfo: 'Born Aug 1995, Busan',
		description: 'Curious little adventurer 🎈',
		mbti: 'ESFJ \nFriendly Consul',
		childhoodDream: 'CEO, Designer',
		favoriteThings: ['Travel', 'Cooking', 'Reading'],
	},

	venue: {
		...koConfig.venue,
		name: 'Sungkyunkwan Convention',
		hall: '3F Story Hall',
		address: '31 Sungkyunkwan-ro, Jongno-gu, Seoul',
	},
	navigationLinks: [
		{
			name: 'Google Maps',
			url: 'https://maps.google.com/maps?q=37.5854,126.9967',
		},
	],

	greeting: `After a successful trial period,

we've decided to commit
to the lifetime plan.

Unlimited laughter,
shared adventures,
and no cancellation policy.

We would be honored to celebrate
the beginning of forever with you.`,

	flowerDeclineMessage:
		'Your warm wishes are the greatest gift.\nIn lieu of flowers, please share your heartfelt congratulations.',

	transport: [
		{
			type: 'metro',
			title: 'Metro',
			details: [
				'Line 4, Hyehwa Station Exit ④',
				'Shuttle bus runs frequently at Exit ④ (T Store)',
				'Village Bus 7 (Exit ① · Sungkyunkwan Univ. main gate stop)',
				'10 min walk from station',
			],
		},
		{
			type: 'bus',
			title: 'Bus',
			details: [
				'Stop: Myeongnyun 3-ga, Seongdae Entrance',
				'Main lines: 100, 102, 104, 107, 140, 143, 149, 150, 151, 160, 162, 171, 172, 272, 301, 710',
				'Branch: 8101, 8111 / Express: 1101, 7101',
			],
		},
		{
			type: 'car',
			title: 'GPS',
			details: ['Search "Sungkyunkwan Convention Wedding Hall"'],
		},
		{
			type: 'parking',
			title: 'Parking',
			details: [
				'Main building lot, Parking Lot #1, or Sungkyunkwan Univ. lot',
				'(2 hours free for wedding guests)',
				'Follow parking attendant instructions',
			],
		},
	],

	accountGroups: [
		{
			side: 'groom',
			label: "Groom's Family",
			accounts: koConfig.accountGroups[0].accounts.map((a) => ({ ...a })),
		},
		{
			side: 'bride',
			label: "Bride's Family",
			accounts: koConfig.accountGroups[1].accounts.map((a) => ({ ...a })),
		},
	],

	showAccount: false,
	showFlowerDecline: false,

	googleMapsEmbedUrl:
		'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3161.713983917644!2d126.99414827627166!3d37.585352172033815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2d50ccd8cd9%3A0x6778ace4cae360c0!2z7ISx6reg6rSA7Luo67Kk7IWY7Juo65Ol7ZmA!5e0!3m2!1sen!2skr!4v1773936802729!5m2!1sen!2skr',

	coupleNameShort: 'Mia ♥ Valentine',
}
