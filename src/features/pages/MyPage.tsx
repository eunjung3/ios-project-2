import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../../components/layout/AppHeader";
import {
  clearAuthenticated,
  getProfileNickname,
  setProfileNickname,
} from "../../utils/authSession";
import "../../styles/MyPage.css";
import "../../styles/App.css";

function MyPage() {
  const navigate = useNavigate();

  // 프로필 API가 붙기 전까지 닉네임은 authSession 유틸의 로컬 저장값을 사용합니다.
  const [nickname, setNickname] = useState(getProfileNickname);
  const [nicknameDraft, setNicknameDraft] = useState(nickname);
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [message, setMessage] = useState("");

  function handleStartEdit() {
    setNicknameDraft(nickname);
    setMessage("");
    setIsEditingNickname(true);
  }

  function handleCancelEdit() {
    setNicknameDraft(nickname);
    setMessage("");
    setIsEditingNickname(false);
  }

  // 저장 버튼과 Enter 키가 같은 검증/저장 흐름을 사용하도록 하나의 함수로 묶었습니다.
  function handleSaveNickname() {
    const nextNickname = nicknameDraft.trim();

    if (nextNickname.length < 2) {
      setMessage("닉네임은 2자 이상 입력해주세요.");
      return;
    }

    setProfileNickname(nextNickname);
    setNickname(nextNickname);
    setNicknameDraft(nextNickname);
    setIsEditingNickname(false);
    setMessage("닉네임이 변경되었습니다.");
  }

  // 헤더 로그아웃 버튼과 동일하게 인증 플래그를 지우고 랜딩 페이지로 이동합니다.
  function handleLogout() {
    clearAuthenticated();
    navigate("/", { replace: true });
  }

  return (
    <div className="mw-app min-h-screen flex flex-col">
      <AppHeader />

      <main className="mypage flex-1">
        <section className="profile-card">
          <p className="label">PROFILE</p>
          <h1>{nickname}님의 마음 기록</h1>

          <div className="info-row">
            <span>이메일</span>
            <strong>admin@maeum.weather</strong>
          </div>

          <div className="info-row">
            <span>닉네임</span>
            {/* 정보수정 중에는 기존 표시 텍스트 자리에 닉네임 입력창을 그대로 보여줍니다. */}
            {isEditingNickname ? (
              <input
                className="nickname-input"
                value={nicknameDraft}
                maxLength={20}
                onChange={(event) => setNicknameDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSaveNickname();
                  }

                  if (event.key === "Escape") {
                    handleCancelEdit();
                  }
                }}
                autoFocus
              />
            ) : (
              <strong>{nickname}</strong>
            )}
          </div>

          <div className="info-row">
            <span>가입일</span>
            <strong>2026.05.01</strong>
          </div>

          {message && <p className="profile-message">{message}</p>}

          <div className="profile-actions">
            {/* 편집 상태에 따라 정보수정 버튼을 저장/취소 버튼으로 전환합니다. */}
            {isEditingNickname ? (
              <>
                <button
                  type="button"
                  className="edit-profile-btn"
                  onClick={handleSaveNickname}
                >
                  저장
                </button>
                <button
                  type="button"
                  className="cancel-profile-btn"
                  onClick={handleCancelEdit}
                >
                  취소
                </button>
              </>
            ) : (
              <button
                type="button"
                className="edit-profile-btn"
                onClick={handleStartEdit}
              >
                정보수정
              </button>
            )}
            {/* AppHeader 로그아웃과 같은 인증 해제/랜딩 이동 흐름을 사용합니다. */}
            <button type="button" className="logout-btn" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MyPage;
