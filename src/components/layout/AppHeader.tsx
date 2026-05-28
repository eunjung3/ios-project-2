import { Archive, LogOut, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export function AppHeader() {
    return (
        <header className="sticky top-0 z-50 w-full mw-header shadow-xs border-b">
            <div className="max-w-[1400px] h-16 mx-auto px-16 py-2 flex items-center justify-between">
                <Link to="/" className="font-bold text-lg text-[#5a4632]">
                    마음의 날씨
                </Link>

                <nav className="flex items-center gap-2 text-xs text-gray-600">
                    <Link
                        to="/login"
                        className="p-2 rounded-md hover:bg-[#5a4632]/10 hover:text-[#5a4632] transition-colors"
                    >
                        로그인
                    </Link>
                    <button type="button" className="p-2 rounded-md hover:bg-[#5a4632]/10 hover:text-[#5a4632] transition-colors">
                        내 방
                    </button>
                    <button type="button" className="p-2 rounded-md hover:bg-[#5a4632]/10 hover:text-[#5a4632] transition-colors">
                        우편함
                    </button>
                    <button type="button" className="p-2 rounded-md hover:bg-[#5a4632]/10 hover:text-[#5a4632] transition-colors">
                        마이페이지
                    </button>
                    <button
                        type="button"
                        className="p-2 rounded-md border border-[#5a4632]/20 hover:bg-[#5a4632]/10 text-[#5a4632]/80"
                        aria-label="추가"
                    >
                        <Plus size={14} />
                    </button>
                    <button
                        type="button"
                        className="p-2 rounded-md border border-[#5a4632]/20 hover:bg-[#5a4632]/10 text-[#5a4632]/80"
                        aria-label="보관함"
                    >
                        <Archive size={14} />
                    </button>
                    <button
                        type="button"
                        className="p-2 rounded-md border border-[#5a4632]/20 hover:bg-[#5a4632]/10 text-[#5a4632]/80"
                        aria-label="로그아웃"
                    >
                        <LogOut size={14} />
                    </button>
                </nav>
            </div>
        </header>
    );
}
