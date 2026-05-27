import { useState } from "react";
import Room from "../room/Room"
import RoomCalendarSidebar from "../calendar/RoomCalendarSidebar";
import { RoomMemoryPanel } from "../memory/RoomMemoryPanel";
import { MemoryWriteModal } from "../memory/MemoryWriteModal";
// import { getTodayString } from "../utils/date";
import { LogOut, Plus } from "lucide-react"
import { Archive } from "lucide-react"
import type { Memory } from "../../types/memory";
import type { WeatherKey } from "../../types/weather";
import { getTodayString } from "../../utils/date";
import { Link } from "react-router-dom";

function RoomPage() {
    const [weather, setWeather] = useState<WeatherKey>('sunny');

    const [isWriteOpen, setIsWriteOpen] = useState(false);

    // const today = getTodayString();

    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    // const [viewYear, setViewYear] = useState(new Date().getFullYear());
    // const [viewMonth, setViewMonth] = useState(new Date().getMonth() + 1);


    const weatherList: WeatherKey[] = ['sunny', 'rain', 'cloud', 'sunset']

    const toggleWeather = () => {
        setWeather((prev) => {
            const index = weatherList.indexOf(prev)
            return weatherList[(index + 1) % weatherList.length]
        })
    }

    const [memories, setMemories] = useState<Memory[]>([]);


    const selectedMemory = memories.find(
        (m) => m.memoryDate === selectedDate
    ) || null;

    // 날짜 선택
    const handleSelectDate = (date: string) => {
        setSelectedDate(date);
    };

    return (
        <div className="min-h-screen bg-[#e8e6e0] flex flex-col select-none">

            {/* TOP NAV */}
            <nav className="sticky top-0 z-50 w-full bg-[#faf7f0] shadow-xs border-b border-[#5a4632]/20">
                <div className="max-w-[1400px] h-16 mx-auto px-16 py-2 flex items-center justify-between">

                    <Link to="/" className="font-bold text-lg text-[#5a4632]">
                        마음의 날씨
                    </Link>
                    {/* <span className="font-bold text-lg text-[#5a4632]">마음의 날씨</span> */}

                    <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Link to="/login"
                        className="p-2 rounded-md hover:bg-[#5a4632]/10 hover:text-[#5a4632] transition-colors"
                        >
                        로그인
                        </Link>
                        <button className="p-2 rounded-md hover:bg-[#5a4632]/10 hover:text-[#5a4632] transition-colors">내 방</button>
                        <button className="p-2 rounded-md hover:bg-[#5a4632]/10 hover:text-[#5a4632] transition-colors">우편함</button>
                        <button className="p-2 rounded-md hover:bg-[#5a4632]/10 hover:text-[#5a4632] transition-colors">마이페이지</button>
                        <button className="p-2 rounded-md border border-[#5a4632]/20 hover:bg-[#5a4632]/10 text-[#5a4632]/80">
                            <Plus size={14} />
                        </button>
                        <button className="p-2 rounded-md border border-[#5a4632]/20 hover:bg-[#5a4632]/10 text-[#5a4632]/80">
                            <Archive size={14} />
                        </button>
                        <button className="p-2 rounded-md border border-[#5a4632]/20 hover:bg-[#5a4632]/10 text-[#5a4632]/80">
                            <LogOut size={14} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* <button
                onClick={toggleWeather}
                className="w-[120px] px-3 py-2 bg-[#5a4632] text-white rounded-md hover:bg-[#5a4632]/90"
            >
                날씨: {weather}
            </button>

            <button onClick={() => setIsWriteOpen(true)}>
                기록하기
            </button> */}

            {/* BODY AREA */}
            <div className="flex-1 overflow-auto px-16 py-8">

                <div className="flex justify-center gap-4 min-w-fit">

                    {/* LEFT CARD */}
                    <div className="w-[320px] flex flex-col gap-4">

                        <div className="h-[360px] bg-[#faf8f2] rounded-2xl border border-[#5a4632]/20 overflow-hidden">
                            <RoomCalendarSidebar
                                selectedDate={selectedDate}
                                onSelectDate={handleSelectDate}
                                // memories={memories}
                            />
                        </div>

                        <div className="h-[254px] bg-[#faf8f2] rounded-2xl border border-[#5a4632]/20 overflow-hidden">
                            <RoomMemoryPanel
                                selectedDate={selectedDate}
                                selectedMemory={selectedMemory}
                                onWrite={() => setIsWriteOpen(true)}
                            // weatherText="맑음"
                            />
                        </div>
                    </div>

                    {/* ROOM CARD */}
                    <div className="w-[900px] h-[630px] bg-[#faf8f2] rounded-2xl border border-[#5a4632]/20 overflow-hidden">
                        <Room weatherKey={weather} />
                    </div>

                </div>
            </div>


            {isWriteOpen && (
                <MemoryWriteModal
                    // mode="private"
                    initialDate={selectedDate || getTodayString()}
                    onClose={() => setIsWriteOpen(false)}
                    onSave={(value) => {
                        setMemories((prev) => [
                            ...prev,
                            {
                                id: crypto.randomUUID(),
                                createdAt: new Date().toISOString(),
                                memoryDate: value.memoryDate,
                                title: value.title ?? "",
                                content: value.content,
                                weatherKey: value.weatherKey,
                            },
                        ]);

                        setIsWriteOpen(false);
                    }}
                />
            )}
        </div>
    )
}

export default RoomPage
