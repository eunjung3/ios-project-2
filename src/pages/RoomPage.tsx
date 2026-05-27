import { useState } from "react";
import Room from "../features/room/Room"
import RoomCalendarSidebar from "../features/calendar/RoomCalendarSidebar";
import { RoomMemoryPanel } from "../features/memory/RoomMemoryPanel";
import { Plus } from "lucide-react"
import { Archive } from "lucide-react"
import type { Memory } from "../types/memory";

function RoomPage() {
    const [weather, setWeather] = useState('sunny');

    const [selectedDate, setSelectedDate] = useState("2026-05-27");
    // const [viewYear, setViewYear] = useState(new Date().getFullYear());
    // const [viewMonth, setViewMonth] = useState(new Date().getMonth() + 1);


    const weatherList = ['sunny', 'rain', 'cloud', 'sunset']

    const toggleWeather = () => {
        setWeather((prev) => {
            const index = weatherList.indexOf(prev)
            return weatherList[(index + 1) % weatherList.length]
        })
    }

    // const handlePrevMonth = () => {
    //     setViewMonth((m) => {
    //         if (m === 1) {
    //             setViewYear((y) => y - 1);
    //             return 12;
    //         }
    //         return m - 1;
    //     });
    // };

    // const handleNextMonth = () => {
    //     setViewMonth((m) => {
    //         if (m === 12) {
    //             setViewYear((y) => y + 1);
    //             return 1;
    //         }
    //         return m + 1;
    //     });
    // };

    // 임시 데이터 (나중에 교체)
    const [memories] = useState<Memory[]>([
        {
            id: "1",
            memoryDate: "2026-05-27",
            title: "오늘의 기록",
            content: "날씨가 맑았다",
        },
    ]);

    const selectedMemory = memories.find(
        (m) => m.memoryDate === selectedDate
    ) || null;

    // 날짜 선택
    const handleSelectDate = (date: string) => {
        setSelectedDate(date);
    };

    return (
        <div className="min-h-screen bg-[#e8e6e0] flex flex-col">

            {/* TOP NAV */}
            <nav className="sticky top-0 z-50 w-full bg-[#faf7f0] shadow-xs border-b border-[#5a4632]/20">
                <div className="max-w-[1400px] mx-auto px-8 py-2 flex items-center justify-between">

                    <span className="font-bold text-lg text-[#5a4632]">마음의 날씨</span>

                    <div className="flex items-center gap-2 text-xs text-gray-600">
                        <button className="p-2 rounded-md hover:bg-[#5a4632]/10 hover:text-[#5a4632] transition-colors">내 방</button>
                        <button className="p-2 rounded-md hover:bg-[#5a4632]/10 hover:text-[#5a4632] transition-colors">우편함</button>
                        <button className="p-2 rounded-md hover:bg-[#5a4632]/10 hover:text-[#5a4632] transition-colors">마이페이지</button>
                        <button className="p-2 rounded-md border border-[#5a4632]/20 text-[#5a4632]/80">
                            <Plus size={14} />
                        </button>
                        <button className="p-2 rounded-md border border-[#5a4632]/20 text-[#5a4632]/80">
                            <Archive size={14} />
                        </button>
                    </div>
                </div>
            </nav>

            <button
                onClick={toggleWeather}
                className="w-[120px] px-3 py-2 bg-[#5a4632] text-white rounded-md hover:bg-[#5a4632]/90"
            >
                날씨: {weather}
            </button>

            {/* BODY AREA */}
            <div className="flex-1 overflow-auto p-8 py-10">

                <div className="flex justify-center gap-6 min-w-fit">

                    {/* LEFT CARD */}
                    <div className="w-[320px] flex flex-col gap-4">

                        <div className="h-[380px] bg-[#faf8f2] rounded-2xl border border-[#5a4632]/20 overflow-hidden">
                            <RoomCalendarSidebar
                                selectedDate={selectedDate}
                                onSelectDate={handleSelectDate}
                                memories={memories}
                            />
                        </div>

                        <div className="h-[300px] bg-[#faf8f2] rounded-2xl border border-[#5a4632]/20 overflow-hidden">
                            <RoomMemoryPanel
                                selectedDate={selectedDate}
                                selectedMemory={selectedMemory}
                            // weatherText="맑음"
                            />
                        </div>
                    </div>

                    {/* ROOM CARD */}
                    <div className="w-[1000px] h-[700px] bg-[#faf8f2] rounded-2xl border border-[#5a4632]/20 overflow-hidden">
                        <Room weather={weather} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default RoomPage
