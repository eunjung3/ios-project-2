// 백엔드 인증 연동 전까지 로그인 상태는 브라우저 저장소에 임시로 보관합니다.
const AUTH_STORAGE_KEY = "mw-authenticated";
const PROFILE_NICKNAME_STORAGE_KEY = "mw-profile-nickname";
const DEFAULT_NICKNAME = "Admin";

export function isAuthenticated() {
    return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function setAuthenticated() {
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
}

export function clearAuthenticated() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
}

// 마이페이지 닉네임도 프로필 API가 붙기 전까지 같은 로컬 저장소를 사용합니다.
export function getProfileNickname() {
    return localStorage.getItem(PROFILE_NICKNAME_STORAGE_KEY) || DEFAULT_NICKNAME;
}

export function setProfileNickname(nickname: string) {
    localStorage.setItem(PROFILE_NICKNAME_STORAGE_KEY, nickname);
}
