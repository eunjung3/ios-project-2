import { useState } from "react";
import Room from "../room/Room"
import RoomCalendarSidebar from "../calendar/RoomCalendarSidebar";
import { RoomMemoryPanel } from "../memory/RoomMemoryPanel";
import { MemoryWriteModal } from "../memory/MemoryWriteModal";
// import { getTodayString } from "../utils/date";
import { AppHeader } from "../../components/layout/AppHeader";
import type { Memory } from "../../types/memory";
import type { WeatherKey } from "../../types/weather";
import { getTodayString } from "../../utils/date";

function RoomPage() {
    const [weather] = useState<WeatherKey>('sunny');

    // const [weather, setWeather] = useState<WeatherKey>("sunny");

    // const weatherList: WeatherKey[] = ["sunny", "rain", "cloud", "sunset", "night", "dawn"];

    // const toggleWeather = () => {
    //     setWeather((prev) => {
    //         const index = weatherList.indexOf(prev);
    //         return weatherList[(index + 1) % weatherList.length];
    //     });
    // };

    const [isWriteOpen, setIsWriteOpen] = useState(false);

    // const today = getTodayString();

    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    // const [viewYear, setViewYear] = useState(new Date().getFullYear());
    // const [viewMonth, setViewMonth] = useState(new Date().getMonth() + 1);

    const [memories, setMemories] = useState<Memory[]>([]);


    const selectedMemory = memories.find(
        (m) => m.memoryDate === selectedDate
    ) || null;

    // 날짜 선택
    const handleSelectDate = (date: string) => {
        setSelectedDate(date);
    };

    return (
        <div className="mw-app min-h-screen flex flex-col select-none">
            <AppHeader />

            {/* <button
                onClick={toggleWeather}
                className="w-[120px] px-3 py-2 bg-[#5a4632] text-white rounded-md hover:bg-[#5a4632]/90"
            >
                날씨: {weather}
            </button> */}

            {/* <button onClick={() => setIsWriteOpen(true)}>
                기록하기
            </button> */}

            {/* BODY AREA */}
            <div className="flex-1 overflow-auto px-16 py-8">

                <div className="mx-auto flex w-[1480px] gap-5">

                    {/* LEFT CARD */}
                    <div className="w-[340px] flex flex-col gap-4">

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
                    <div className="w-[1120px] h-[630px] bg-[#faf8f2] rounded-2xl border border-[#5a4632]/20 overflow-hidden">
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
