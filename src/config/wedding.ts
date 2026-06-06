import type { WeddingConfig } from '@/types'
import { labelsKo } from './labels.ko'

export const weddingConfig: WeddingConfig = {
	labels: labelsKo,
	// ── 신랑 신부 정보 ──────────────────────────────
	groom: {
		role: '신랑',
		name: '박종혁',
		lastName: '박',
		firstName: '종혁',
		fatherName: '박상배',
		motherName: '장미영',
		relation: '의 아들',
		childhoodPhoto: '/images/groom-baby.webp',
		birthInfo: '1996년 2월 서울 출생',
		description: '감성파 과학소년 🧪',
		mbti: 'ISFJ \n용감한 수호자',
		childhoodDream: '우주 과학자',
		favoriteThings: ['풋살', '프라모델 만들기', '게임'],
	},
	bride: {
		role: '신부',
		name: '이지형',
		lastName: '이',
		firstName: '지형',
		fatherName: '이근재',
		motherName: '이미승',
		relation: '의 딸',
		childhoodPhoto: '/images/bride-baby.webp',
		birthInfo: '1995년 8월 부산 출생',
		description: '호기심 많은 모험가 🎈',
		mbti: 'ESFJ \n사교적인 외교관',
		childhoodDream: 'CEO, 디자이너',
		favoriteThings: ['지구여행', '요리', '독서'],
	},

	// ── 예식 정보 ──────────────────────────────────
	datetime: '2026-10-31T11:00:00',
	relationshipStartDate: '2023-02-22T00:00:00',
	venue: {
		name: '성균관컨벤션웨딩홀',
		hall: '3층 스토리홀',
		address: '서울시 종로구 성균관로 31',
		tel: '02-744-0677',
	},
	navigationLinks: [
		{
			name: '카카오맵',
			url: 'https://map.kakao.com/link/to/성균관컨벤션웨딩홀,37.5854,126.9967',
		},
		{
			name: '네이버지도',
			url: 'https://map.naver.com/v5/search/성균관컨벤션웨딩홀',
		},
	],

	// ── 인사말 ──────────────────────────────────────
	greeting: `연애 무료체험 기간이 끝났습니다.

많은 고민 끝에
평생 이용권을 결제하기로 했습니다.

앞으로도 웃을 일은 무제한,
중도 해지는 불가입니다.

저희의 새로운 시작을 축복해 주세요.`,

	// ── 화환 사양 ──────────────────────────────────
	flowerDeclineMessage: '축하 화환은 정중히 사양합니다.\n축하의 마음만 감사히 받겠습니다.',

	// ── 갤러리 ──────────────────────────────────────
	gallery: [
		{ src: '/images/gallery/gallery_01.jpg', alt: '웨딩 사진 1' },
		{ src: '/images/gallery/gallery_02.jpg', alt: '웨딩 사진 2' },
		{ src: '/images/gallery/gallery_03.jpg', alt: '웨딩 사진 3' },
		{ src: '/images/gallery/gallery_04.jpg', alt: '웨딩 사진 4' },
		{ src: '/images/gallery/gallery_05.jpg', alt: '웨딩 사진 5' },
		{ src: '/images/gallery/gallery_06.jpg', alt: '웨딩 사진 6' },
		{ src: '/images/gallery/gallery_07.jpg', alt: '웨딩 사진 7' },
		{ src: '/images/gallery/gallery_08.jpg', alt: '웨딩 사진 8' },
		{ src: '/images/gallery/gallery_09.jpg', alt: '웨딩 사진 9' },
		{ src: '/images/gallery/gallery_10.jpg', alt: '웨딩 사진 10' },
		{ src: '/images/gallery/gallery_11.jpg', alt: '웨딩 사진 11' },
		{ src: '/images/gallery/gallery_12.jpg', alt: '웨딩 사진 12' },
	],

	// ── 교통 안내 ──────────────────────────────────
	transport: [
		{
			type: 'metro',
			title: '지하철',
			details: ['4호선 혜화역 4번출구 T스토어 앞 셔틀버스 수시운행', '도보 이용시 10분거리'],
		},
		{
			type: 'bus',
			title: '버스',
			details: [
				'명륜3가, 성대입구 하차',
				'간선버스: 100, 102, 104, 107, 140, 143, 149, 150, 151, 160, 162, 171, 172, 272, 301, 710',
				'지선버스: 8101, 8111 / 광역버스: 1101, 7101',
			],
		},
		{
			type: 'car',
			title: '네비게이션',
			details: ['"성균관컨벤션웨딩홀" 검색'],
		},
		{
			type: 'parking',
			title: '주차 안내',
			details: [
				'본관 주차장, 제1주차장 또는 성균관대 주차장',
				'(하객주차 2시간 무료)',
				'주차요원의 안내를 받으세요',
			],
		},
	],

	// ── 계좌 정보 ──────────────────────────────────
	accountGroups: [
		{
			side: 'groom',
			label: '신랑측',
			accounts: [
				{
					role: '신랑',
					bank: '신한은행',
					accountNumber: '110-436-921227',
					holder: '박종혁',
					kakaoPayUrl: 'https://link.kakaopay.com/__/8ZccKtD',
				},
				{
					role: '신랑 아버지',
					bank: '신한은행',
					accountNumber: '336-044-48812',
					holder: '박상배',
				},
				{
					role: '신랑 어머니',
					bank: '신한은행',
					accountNumber: '110-025-291791',
					holder: '장미영',
				},
			],
		},
		{
			side: 'bride',
			label: '신부측',
			accounts: [
				{
					role: '신부',
					bank: '카카오뱅크',
					accountNumber: '3333-07-3750221',
					holder: '이지형',
					kakaoPayUrl: 'https://link.kakaopay.com/__/tui-OtJ',
				},
				{
					role: '신부 아버지',
					bank: '국민은행',
					accountNumber: '006-21-0815-491',
					holder: '이근재',
				},
				{
					role: '신부 어머니',
					bank: '하나은행',
					accountNumber: '469-910035-89507',
					holder: '이미승',
				},
			],
		},
	],

	// ── 카카오 API ──────────────────────────────────
	kakaoJsKey: process.env.NEXT_PUBLIC_KAKAO_JS_KEY ?? '',

	// ── RSVP (Google Forms) ──────────────────
	googleScriptUrl:
		'https://docs.google.com/forms/d/e/1FAIpQLSdBkOa9oxfooMzLHIOll-bRI5mIzFYHYiDob8WYTIQhg7ICLg/formResponse',

	// ── 방명록 (Google Apps Script 웹앱) ──────────────────
	// scripts/guestbook-apps-script.gs 를 배포한 뒤 발급되는 /exec URL 을 넣어주세요.
	// 비워두면 방명록 섹션이 자동으로 숨겨집니다.
	guestbookScriptUrl:
		'https://script.google.com/macros/s/AKfycbwMAcSowkH0U-M6_k9z8rPIfeAWR5_pSBW35hcNi_kahhIPtz3VIQUYrtNoF1Ezpjxu/exec',

	// ── 공유 설정 ──────────────────────────────────
	ogImage: '/images/main-og.jpg',
	shareImage: '/images/share-kakao.jpg',
	siteUrl: 'https://miajlee.github.io/invite',
	coupleNameShort: '지형 ♥ 종혁',
}
