import { useState } from "react";
import { X } from "lucide-react";
import FurnitureBooks from "../../assets/furniture-modular/furniture-books.png";
import FurnitureDresser from "../../assets/furniture-modular/furniture-dresser.png";
import FurnitureFrame from "../../assets/furniture-modular/furniture-frame.png";
import FurniturePlant from "../../assets/furniture-modular/furniture-plant.png";

const OBJECT_OPTIONS = [
    { key: "plant", label: "화분", image: FurniturePlant },
    { key: "books", label: "책", image: FurnitureBooks },
    { key: "frame", label: "액자", image: FurnitureFrame },
    { key: "dresser", label: "서랍장", image: FurnitureDresser },
];

export function MemoryObjectSelectModal({
    onBack,
    onClose,
    onSave,
}: {
    onBack: () => void;
    onClose: () => void;
    onSave: (objectKey: string) => void;
}) {
    const [selectedObjectKey, setSelectedObjectKey] = useState(OBJECT_OPTIONS[0].key);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 backdrop-blur-sm select-none">
            <div className="bg-[#fffbf6c2] w-full max-w-[760px] max-h-[92vh] overflow-y-auto rounded-xl p-6">
                <div className="mb-5 flex items-start justify-between">
                    <h2 className="text-xl text-[#5a4632]">
                        오브젝트 선택
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="grid h-9 w-9 place-items-center rounded-md border border-[#5a4632]/10 hover:bg-black/5 text-[#5a4632]"
                    >
                        <X size={17} />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {OBJECT_OPTIONS.map((object) => {
                        const selected = selectedObjectKey === object.key;

                        return (
                            <button
                                key={object.key}
                                type="button"
                                onClick={() => setSelectedObjectKey(object.key)}
                                className="flex h-[150px] flex-col items-center justify-center gap-3 rounded-md border p-3 text-sm text-[#5a4632] transition hover:bg-white/85"
                                style={{
                                    borderColor: selected ? "rgba(200,150,106,0.68)" : "rgba(73, 63, 61, 0.13)",
                                    background: selected ? "rgba(200,150,106,0.14)" : "rgba(73, 63, 61, 0.07)",
                                }}
                            >
                                <img
                                    src={object.image}
                                    alt=""
                                    className="h-24 w-full object-contain"
                                />
                                <span>{object.label}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onBack}
                        className="border border-[#9b6b54]/60 bg-[#9b6b54]/10 hover:bg-[#9b6b54]/20 rounded-md px-5 py-2 text-sm text-[#9b6b54]/80"
                    >
                        이전
                    </button>
                    <button
                        type="button"
                        onClick={() => onSave(selectedObjectKey)}
                        className="mw-button-solid rounded-md px-5 py-2 text-sm"
                    >
                        방에 남기기
                    </button>
                </div>
            </div>
        </div>
    );
}
