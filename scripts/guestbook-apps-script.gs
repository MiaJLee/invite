/**
 * 청첩장 방명록용 Google Apps Script
 * =====================================================
 * 정적 사이트(GitHub Pages)는 서버가 없으므로, 방명록 데이터를
 * Google Sheet 에 저장하고 조회하기 위해 이 스크립트를 웹앱으로 배포합니다.
 *
 * ── 배포 방법 ──────────────────────────────────────────
 * 1. https://sheets.new 로 새 구글 시트를 만든다.
 * 2. 상단 메뉴 [확장 프로그램] → [Apps Script] 클릭.
 * 3. 기본 코드(Code.gs)를 모두 지우고 이 파일 내용을 붙여넣고 저장.
 * 4. 우측 상단 [배포] → [새 배포] → 유형 [웹 앱] 선택.
 *      - 설명: guestbook
 *      - 실행 계정: 나
 *      - 액세스 권한: "모든 사용자"  (← 반드시 이걸로!)
 * 5. [배포] 후 발급되는 "웹 앱 URL"(.../exec 로 끝남)을 복사.
 * 6. src/config/wedding.ts 의 guestbookScriptUrl 에 붙여넣기.
 *
 * ※ 코드를 수정하면 [배포] → [배포 관리] → 기존 배포 [편집] →
 *    버전을 "새 버전"으로 올려야 반영됩니다.
 *
 * ── 작성 글 삭제 ───────────────────────────────────────
 * 부적절한 글은 구글 시트의 해당 행을 직접 삭제하면 됩니다.
 */

var SHEET_NAME = 'Guestbook'
var MAX_NAME = 50
var MAX_MESSAGE = 500

function getSheet() {
	var ss = SpreadsheetApp.getActiveSpreadsheet()
	var sheet = ss.getSheetByName(SHEET_NAME)
	if (!sheet) {
		sheet = ss.insertSheet(SHEET_NAME)
		sheet.appendRow(['createdAt', 'name', 'message'])
	}
	return sheet
}

function jsonOutput(obj) {
	return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
		ContentService.MimeType.JSON,
	)
}

/** 방명록 목록 조회 (newest first) */
function doGet() {
	var sheet = getSheet()
	var values = sheet.getDataRange().getValues()
	var entries = []
	for (var i = 1; i < values.length; i++) {
		var row = values[i]
		var name = String(row[1] || '').trim()
		var message = String(row[2] || '').trim()
		if (!name || !message) continue
		var rawDate = row[0]
		var d = rawDate instanceof Date ? rawDate : new Date(rawDate)
		entries.push({
			createdAt: isNaN(d.getTime()) ? String(rawDate) : d.toISOString(),
			name: name,
			message: message,
		})
	}
	entries.reverse()
	return jsonOutput({ entries: entries })
}

/** 방명록 작성 */
function doPost(e) {
	try {
		var data = JSON.parse(e.postData.contents)
		var name = String(data.name || '')
			.trim()
			.slice(0, MAX_NAME)
		var message = String(data.message || '')
			.trim()
			.slice(0, MAX_MESSAGE)
		if (name && message) {
			getSheet().appendRow([new Date(), name, message])
			return jsonOutput({ success: true })
		}
		return jsonOutput({ success: false, error: 'empty' })
	} catch (err) {
		return jsonOutput({ success: false, error: String(err) })
	}
}
