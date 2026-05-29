import { useState } from "react";
import Room from "../room/Room"
import RoomCalendarSidebar from "../calendar/RoomCalendarSidebar";
import { RoomMemoryPanel } from "../memory/RoomMemoryPanel";
import { MemoryWriteModal, type WriteModalValue } from "../memory/MemoryWriteModal";
import { MemoryPreviewModal } from "../memory/MemoryPreviewModal";
// import { getTodayString } from "../utils/date";
import { AppHeader } from "../../components/layout/AppHeader";
import type { Memory } from "../../types/memory";
import type { RoomObjectPosition } from "../../types/roomObject";
import type { WeatherKey } from "../../types/weather";
import { getTodayString } from "../../utils/date";

type PendingPlacement = {
    value: WriteModalValue;
    position: RoomObjectPosition;
};

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
    // 사용자가 오브젝트 위치를 고르는 동안 작성한 메모리를 임시로 보관
    const [pendingPlacement, setPendingPlacement] = useState<PendingPlacement | null>(null);
    const [previewMemory, setPreviewMemory] = useState<Memory | null>(null);


    const selectedMemory = memories.find(
        (m) => m.memoryDate === selectedDate
    ) || null;
    // 체크로 저장된 메모리가 있을 때만 해당 날짜의 날씨를 방에 반영합니다.
    const roomWeather = selectedMemory?.weatherKey ?? weather;
    // Room 컴포넌트가 바로 그릴 수 있는 형태로 저장된 오브젝트만 추려냅니다.
    const placedRoomObjects = memories
        .filter((memory) => memory.objectKey && memory.objectPosition)
        .map((memory) => ({
            id: memory.id,
            objectKey: memory.objectKey!,
            position: memory.objectPosition!,
            title: memory.title,
        }));

    // 날짜 선택
    const handleSelectDate = (date: string) => {
        setSelectedDate(date);
    };

    // 체크 버튼을 누르면 메모리와 오브젝트의 최종 위치를 함께 저장합니다.
    const handleConfirmPlacement = () => {
        if (!pendingPlacement) {
            return;
        }

        const { value, position } = pendingPlacement;

        const memoryId = crypto.randomUUID();

        setMemories((prev) => [
            ...prev,
            {
                id: memoryId,
                createdAt: new Date().toISOString(),
                memoryDate: value.memoryDate,
                title: value.title ?? "",
                content: value.content,
                moodKey: value.moodKey,
                weatherKey: value.weatherKey,
                objectKey: value.objectKey,
                objectPosition: position,
            },
        ]);

        setPendingPlacement(null);
        setSelectedDate(value.memoryDate);
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

                <div className="mx-auto flex w-[1460px] gap-5">

                    {/* LEFT CARD */}
                    <div className="w-[320px] shrink-0 flex flex-col gap-4">

                        <div className="h-[360px] bg-[#faf8f2] rounded-2xl border border-[#5a4632]/20 overflow-hidden">
                            <RoomCalendarSidebar
                                selectedDate={selectedDate}
                                onSelectDate={handleSelectDate}
                                memories={memories}
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
                    <div className="w-[1120px] h-[630px] shrink-0 bg-[#faf8f2] rounded-2xl border border-[#5a4632]/20 overflow-hidden">
                        <Room
                            weatherKey={roomWeather}
                            placedObjects={placedRoomObjects}
                            onObjectSelect={(objectId) => {
                                const memory = memories.find((item) => item.id === objectId);
                                if (memory) {
                                    setPreviewMemory(memory);
                                }
                            }}
                            placementDraft={pendingPlacement ? {
                                objectKey: pendingPlacement.value.objectKey,
                                position: pendingPlacement.position,
                            } : null}
                            onPlacementCancel={() => setPendingPlacement(null)}
                            onPlacementChange={(position) => {
                                setPendingPlacement((prev) => prev ? { ...prev, position } : prev);
                            }}
                            onPlacementConfirm={handleConfirmPlacement}
                        />
                    </div>

                </div>
            </div>


            {isWriteOpen && (
                <MemoryWriteModal
                    // mode="private"
                    initialDate={selectedDate || getTodayString()}
                    onClose={() => setIsWriteOpen(false)}
                    onSave={(value) => {
                        // 바로 저장하지 않고 방 안에서 위치를 정하는 단계로 넘어갑니다.
                        setPendingPlacement({
                            value,
                            position: { x: 24, y: 84 },
                        });
                        setIsWriteOpen(false);
                    }}
                />
            )}

            {previewMemory && (
                <MemoryPreviewModal
                    memory={previewMemory}
                    onClose={() => setPreviewMemory(null)}
                />
            )}
        </div>
    )
}

export default RoomPage
