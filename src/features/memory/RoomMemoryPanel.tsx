import { CalendarDays, PenLine } from "lucide-react";
import type { Memory } from "../../types/memory";
import { formatDotDate } from "../../utils/date";

type Props = {
    selectedDate: string;
    selectedMemory: Memory | null;
    // today: string;
    // weatherIcon: string;
    // weatherText: string;
    onWrite: () => void;
};

export function RoomMemoryPanel({
    selectedDate,
    selectedMemory,
    // today,
    // weatherIcon,
    // weatherText,
    onWrite,
}: Props) {
    return (
        <section className="mw-surface rounded-xl p-5 h-full select-none">

            {/* DATE */}
            <div className="mb-3 flex items-center gap-2 text-sm text-[#5a4632]/80">
                <CalendarDays size={16} />
                {selectedDate ? formatDotDate(selectedDate) : "날짜를 선택하세요"}
            </div>

            {/* CONTENT */}
            {selectedMemory ? (
                <div>
                    <h2 className="text-lg font-normal text-[#5a4632]">
                        {selectedMemory.title || "제목 없는 기억"}
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-[#5a4632]/60">
                        {selectedMemory.content}
                    </p>

                    {/* <p className="mt-4 text-[0.72rem] text-white/34">
                        {weatherIcon} {weatherText}
                    </p> */}
                </div>
            ) : (
                <div className="flex h-full flex-col">
                    <div>
                        <h2 className="text-lg font-normal text-[#5a4632]">
                            아직 이 날의 이야기는 비어 있어요.
                        </h2>

                        <p className="mt-3 text-sm leading-7 text-[#5a4632]/60">
                            비어 있는 날짜에는 메모 하나를 남길 수 있어요.
                        </p>
                    </div>

                    {selectedDate !== "" && (
                        <button
                            type="button"
                            onClick={onWrite}
                            className="mw-button border border-[#5a4632]/30 bg-[#d8bd9a]/20 mt-5 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm text-[#5a4632]/80"
                        >
                            <PenLine size={15} />
                            이 날의 이야기 남기기
                        </button>
                    )}
                </div>
            )}
        </section>
    );
}
