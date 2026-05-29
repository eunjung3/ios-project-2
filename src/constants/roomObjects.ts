import FurnitureBooks from "../assets/furniture-modular/furniture-books.png";
import FurnitureDresser from "../assets/furniture-modular/furniture-dresser.png";
import FurnitureFrame from "../assets/furniture-modular/furniture-frame.png";
import FurniturePlant from "../assets/furniture-modular/furniture-plant.png";
import type { RoomObjectKey } from "../types/roomObject";

export type RoomObjectOption = {
    key: RoomObjectKey;
    label: string;
    image: string;
    // 오브젝트가 방 안에 배치될 때 사용할 렌더링 너비 (높이는 가로세로 비율에 맞춰 자동 조정)
    roomWidth: number;
};

// 오브젝트 선택 모달과 방 렌더링에서 사용하는 목록
export const ROOM_OBJECT_OPTIONS: RoomObjectOption[] = [
    { key: "plant", label: "화분", image: FurniturePlant, roomWidth: 86 },
    { key: "books", label: "책", image: FurnitureBooks, roomWidth: 88 },
    { key: "frame", label: "액자", image: FurnitureFrame, roomWidth: 86 },
    { key: "dresser", label: "서랍장", image: FurnitureDresser, roomWidth: 188 },
];

// 저장된 오브젝트를 그릴 때 key로 빠르게 찾기 위한 맵
export const ROOM_OBJECT_BY_KEY = ROOM_OBJECT_OPTIONS.reduce<Record<RoomObjectKey, RoomObjectOption>>(
    (acc, object) => {
        acc[object.key] = object;
        return acc;
    },
    {} as Record<RoomObjectKey, RoomObjectOption>,
);
