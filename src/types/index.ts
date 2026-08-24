export interface Person {
	role: string
	name: string
	lastName: string
	firstName: string
	fatherName: string
	motherName: string
	relation: string
	childhoodPhoto?: string
	birthInfo?: string
	description?: string
	/** ABOUT US 프로필 */
	mbti?: string
	childhoodDream?: string
	favoriteThings?: string[]
}

export type WikiSlug = 'groom' | 'bride'

export interface WikiInfoboxRow {
	label: string
	value: string
	header?: boolean
}

export interface WikiSection {
	id: string
	title: string
	body: string
}

export interface PersonWiki {
	slug: WikiSlug
	title: string
	englishName?: string
	lastModified: string
	categories: string[]
	photo: string
	photoCaption?: string
	infoboxTitle: string
	infobox: WikiInfoboxRow[]
	sections: WikiSection[]
	templateNote?: string
}

export interface WeddingVenue {
	name: string
	hall: string
	address: string
	tel: string
}

export interface BankAccount {
	role: string
	bank: string
	accountNumber: string
	holder: string
	kakaoPayUrl?: string
}

export interface AccountGroup {
	side: 'groom' | 'bride'
	label: string
	accounts: BankAccount[]
}

export interface TransportInfo {
	type: 'metro' | 'bus' | 'car' | 'parking'
	title: string
	details: string[]
}

export interface GalleryImage {
	src: string
	alt: string
}

export interface NavigationLink {
	name: string
	url: string
}

export type Locale = 'ko' | 'en'

export interface Labels {
	// 공통
	locale: Locale
	copyButton: string
	copyDone: string
	close: string

	// 인트로
	saveTheDate: string

	// 인사말
	greetingTitle: string

	// 예식안내
	weddingInfoTitle: string
	copyAddress: string

	// 소개
	aboutUsTitle: string
	aboutUsSubtitle: string
	profileMbti: string
	profileChildhoodDream: string
	profileFavoriteThings: string
	profileDetailLink: string

	// 캘린더
	countdownLabels: { days: string; hours: string; min: string; sec: string }
	googleCalendar: string
	appleCalendar: string

	// 갤러리
	galleryTitle: string

	// FAQ
	faqTitle: string
	faqSubtitle: string
	faqItems: { question: string; answer: string }[]

	// 오시는 길
	transportTitle: string

	// 축의금
	accountTitle: string
	accountSubtitle: string
	accountCopy: string
	accountSend: string

	// 방명록
	guestbookTitle: string
	guestbookSubtitle: string
	guestbookNameLabel: string
	guestbookNamePlaceholder: string
	guestbookMessageLabel: string
	guestbookMessagePlaceholder: string
	guestbookSubmit: string
	guestbookSubmitting: string
	guestbookEmpty: string
	guestbookLoading: string
	guestbookLoadError: string
	guestbookError: string
	guestbookThankYou: string
	guestbookShowAll: string
	guestbookShowLess: string

	// 참석여부
	rsvpTitle: string
	rsvpSubtitle: string
	rsvpThankYou: string
	rsvpConfirmed: string
	rsvpNameLabel: string
	rsvpNamePlaceholder: string
	rsvpPhoneLabel: string
	rsvpPhonePlaceholder: string
	rsvpAttendanceLabel: string
	rsvpAttend: string
	rsvpDecline: string
	rsvpSubmitting: string
	rsvpSubmit: string
	rsvpError: string

	// 공유
	shareTitle: string
	shareKakao: string
	shareUrl: string
	shareNative: string
	shareCopied: string
	shareMarrying: string
	shareInvite: string

	// ScrollIndicator
	nav: {
		greeting: string
		weddingInfo: string
		aboutUs: string
		calendar: string
		gallery: string
		faq: string
		transport: string
		account: string
		guestbook: string
		rsvp: string
		share: string
	}

	/** 고정 언어 전환 (맨 위로 버튼 위) */
	languageSwitchToEn: string
	languageSwitchToKo: string
	languageSwitchToEnAria: string
	languageSwitchToKoAria: string
}

export interface WeddingConfig {
	groom: Person
	bride: Person
	wiki?: {
		groom: PersonWiki
		bride: PersonWiki
	}

	datetime: string
	venue: WeddingVenue
	/** 연애 시작일 (datetime과 동일 ISO 형식), 해당일 = 1일로 계산 */
	relationshipStartDate?: string
	navigationLinks: NavigationLink[]

	greeting: string
	flowerDeclineMessage: string

	gallery: GalleryImage[]
	transport: TransportInfo[]
	accountGroups: AccountGroup[]

	kakaoJsKey: string

	googleScriptUrl: string

	/** 방명록 저장/조회용 Google Apps Script 웹앱 URL (미설정 시 방명록 섹션 숨김) */
	guestbookScriptUrl?: string

	labels: Labels

	/** 섹션 표시 여부 */
	showAccount?: boolean
	showFlowerDecline?: boolean
	showGuestbook?: boolean

	/** 영문용 Google Maps embed URL (설정 시 카카오맵 대신 표시) */
	googleMapsEmbedUrl?: string

	ogImage: string
	shareImage: string
	siteUrl: string
	coupleNameShort: string
}
