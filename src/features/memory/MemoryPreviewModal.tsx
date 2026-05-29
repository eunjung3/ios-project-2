import { CalendarDays, X } from "lucide-react";
import { MOOD_BY_KEY } from "../../constants/mood";
import { ROOM_OBJECT_BY_KEY } from "../../constants/roomObjects";
import type { Memory } from "../../types/memory";
import { formatDotDate } from "../../utils/date";

type Props = {
    memory: Memory;
    onClose: () => void;
};

export function MemoryPreviewModal({ memory, onClose }: Props) {
    const mood = MOOD_BY_KEY[memory.moodKey];
    const selectedObject = memory.objectKey ? ROOM_OBJECT_BY_KEY[memory.objectKey] : null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 backdrop-blur-sm select-none">
            <div className="w-full max-w-[580px] rounded-xl bg-[#fffbf6f2] p-6 shadow-xl">
                <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-xl text-[#5a4632]">메모 보기</h2>
                        {selectedObject && (
                            <p className="mt-1 text-sm text-[#5a4632]/55">
                                {selectedObject.label}에 남긴 기억이에요.
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="닫기"
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-[#5a4632]/10 text-[#5a4632] hover:bg-black/5"
                    >
                        <X size={17} />
                    </button>
                </div>

                <div className="mb-4 flex items-center justify-between gap-3 text-sm text-[#5a4632]/75">
                    <div className="flex items-center gap-2">
                        <CalendarDays size={16} />
                        <span>{formatDotDate(memory.memoryDate)}</span>
                    </div>

                    <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#5a4632]/15 bg-white/45 px-2.5 py-1 text-xs">
                        <span aria-hidden="true">{mood.icon}</span>
                        <span>{mood.label}</span>
                    </div>
                </div>

                <div className="rounded-md border border-[#5a4632]/15 bg-white/35 p-2">
                    <h3 className="text-md font-normal text-[#5a4632]">
                        {memory.title || "제목 없는 기억"}
                    </h3>

                    <p className="mt-3 max-h-[260px] overflow-y-auto whitespace-pre-wrap text-sm leading-7 text-[#5a4632]/65">
                        {memory.content}
                    </p>
                </div>

                {/* <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md border border-[#9b6b54]/60 bg-[#9b6b54]/10 px-5 py-2 text-sm text-[#9b6b54]/80 hover:bg-[#9b6b54]/20"
                    >
                        닫기
                    </button>
                </div> */}
            </div>
        </div>
    );
}
