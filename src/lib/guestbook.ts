export interface GuestbookEntry {
	name: string
	message: string
	createdAt: string
}

export interface GuestbookInput {
	name: string
	message: string
}

/**
 * 방명록 목록 조회.
 * Apps Script 웹앱(/exec)은 GET 요청 시 script.googleusercontent.com 으로 302 리다이렉트되며,
 * 해당 응답에 `Access-Control-Allow-Origin: *` 가 포함되어 정적 사이트에서도 fetch 가 동작한다.
 */
export async function fetchGuestbook(scriptUrl: string): Promise<GuestbookEntry[]> {
	const res = await fetch(scriptUrl, { method: 'GET', cache: 'no-store' })
	if (!res.ok) throw new Error('Failed to load guestbook')

	const data = (await res.json()) as { entries?: unknown }
	if (!Array.isArray(data.entries)) return []

	return (data.entries as Record<string, unknown>[])
		.map((e) => ({
			name: String(e.name ?? ''),
			message: String(e.message ?? ''),
			createdAt: String(e.createdAt ?? ''),
		}))
		.filter((e) => e.name && e.message)
}

/**
 * 방명록 작성.
 * Content-Type 을 text/plain 으로 보내 CORS preflight 를 피한다("simple request").
 */
export async function submitGuestbookEntry(
	scriptUrl: string,
	input: GuestbookInput,
): Promise<{ success: boolean; error?: string }> {
	try {
		await fetch(scriptUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'text/plain;charset=utf-8' },
			body: JSON.stringify({
				name: input.name.trim().slice(0, 50),
				message: input.message.trim().slice(0, 500),
			}),
		})
		return { success: true }
	} catch {
		return {
			success: false,
			error: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
		}
	}
}
