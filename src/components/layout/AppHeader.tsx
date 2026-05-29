import { Archive, LogOut, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { clearAuthenticated } from "../../utils/authSession";

export function AppHeader() {
    const navigate = useNavigate();

    function handleLogout() {
        clearAuthenticated();
        navigate("/", { replace: true });
    }

    return (
        <header className="sticky top-0 z-50 w-full mw-header shadow-xs border-b">
            <div className="px-16">
                <div className="mx-auto flex h-16 w-[1460px] items-center justify-between py-2">
                    <Link to="/" className="font-semibold text-2xl text-[#5a4632]" style={{ fontFamily: "'Noto Serif KR', Georgia, serif" }}>
                        마음의 날씨
                    </Link>

                    <nav className="flex items-center gap-2 text-xs text-gray-600">
                        {/* <Link
                        to="/login"
                        state={{ fromLanding: true }}
                        className="p-2 rounded-md hover:bg-[#5a4632]/10 hover:text-[#5a4632] transition-colors"
                    >
                        로그인
                    </Link> */}
                        {/* <button type="button" className="p-2 rounded-md hover:bg-[#5a4632]/10 hover:text-[#5a4632] transition-colors">
                        내 방
                    </button> */}
                        {/* <button type="button" className="p-2 rounded-md hover:bg-[#5a4632]/10 hover:text-[#5a4632] transition-colors">
                        우편함
                    </button> */}
                        {/* <button
                        type="button"
                        className="p-2 rounded-md border border-[#5a4632]/20 hover:bg-[#5a4632]/10 text-[#5a4632]/80"
                        aria-label="추가"
                    >
                        <Plus size={14} />
                    </button> */}
                        <Link
                            to="/mypage"
                            className="p-2 rounded-md border border-[#5a4632]/20 hover:bg-[#5a4632]/10 text-[#5a4632]/80"
                            title="마이페이지"
                            aria-label="마이페이지"
                        >
                            <UserRound size={14} />
                        </Link>
                        <button
                            type="button"
                            className="p-2 rounded-md border border-[#5a4632]/20 hover:bg-[#5a4632]/10 text-[#5a4632]/80"
                            title="보관함"
                            aria-label="보관함"
                        >
                            <Archive size={14} />
                        </button>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="p-2 rounded-md border border-[#5a4632]/20 hover:bg-[#5a4632]/10 text-[#5a4632]/80"
                            title="로그아웃"
                            aria-label="로그아웃"
                        >
                            <LogOut size={14} />
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
}
