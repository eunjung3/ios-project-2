import { useCallback, useRef, type PointerEvent } from "react";
import { Check, X } from "lucide-react";
import RoomImg from "../../assets/room3-clean.png";
import { ROOM_OBJECT_BY_KEY } from "../../constants/roomObjects";
import { WEATHER_BY_KEY } from "../../constants/weather";
import type { RoomObjectKey, RoomObjectPosition } from "../../types/roomObject";
import type { WeatherKey } from "../../types/weather";
import Weather from "../weathers/Weather";

// 체크 버튼으로 확정되어 방 안에 고정된 오브젝트
type PlacedRoomObject = {
  id: string;
  objectKey: RoomObjectKey;
  position: RoomObjectPosition;
  title?: string;
};

// 메모리가 최종 저장되기 전에 위치를 잡고 있는 임시 오브젝트
type PlacementDraft = {
  objectKey: RoomObjectKey;
  position: RoomObjectPosition;
};

type DragOffset = {
  x: number;
  y: number;
};

type Props = {
  weatherKey: WeatherKey;
  placedObjects?: PlacedRoomObject[];
  onObjectSelect?: (objectId: string) => void;
  // 배치 중인 임시 오브젝트와 배치 제어 콜백. 배치 중이 아닐 때는 null
  placementDraft?: PlacementDraft | null;
  onPlacementCancel?: () => void;
  onPlacementChange?: (position: RoomObjectPosition) => void;
  onPlacementConfirm?: () => void;
}

const ROOM_FILTER_BY_WEATHER: Record<WeatherKey, string> = {
  sunny: "saturate(1.08) brightness(1.04) contrast(1.02)",
  rain: "saturate(0.78) brightness(0.88) contrast(1.05)",
  cloud: "saturate(0.72) brightness(0.94) contrast(0.98)",
  sunset: "saturate(1.14) brightness(0.96) sepia(0.18) contrast(1.05)",
  night: "saturate(0.72) brightness(0.7) contrast(1.1) hue-rotate(8deg)",
  dawn: "saturate(0.9) brightness(0.9) sepia(0.08) contrast(1.02)",
  cherry: "saturate(1.04) brightness(1.02) sepia(0.08) contrast(1.01)",
};

const ROOM_TINT_OPACITY_BY_WEATHER: Record<WeatherKey, number> = {
  sunny: 0.18,
  rain: 0.34,
  cloud: 0.28,
  sunset: 0.36,
  night: 0.42,
  dawn: 0.3,
  cherry: 0.26,
};

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export default function Room({
  weatherKey,
  placedObjects = [],
  onObjectSelect,
  placementDraft = null,
  onPlacementCancel,
  onPlacementChange,
  onPlacementConfirm,
}: Props) {
  const roomRef = useRef<HTMLDivElement>(null);
  const dragOffsetRef = useRef<DragOffset | null>(null);
  const weatherTone = WEATHER_BY_KEY[weatherKey];

  // 포인터 좌표를 방 컨테이너 안의 퍼센트 좌표로 변환. 방 크기가 바뀌어도 오브젝트 위치가 일정하도록 하기 위함
  const getPointerPosition = useCallback((event: PointerEvent<HTMLElement>, offset: DragOffset = { x: 0, y: 0 }) => {
    const rect = roomRef.current?.getBoundingClientRect();

    if (!rect) {
      return null;
    }

    return {
      x: clamp(((event.clientX + offset.x - rect.left) / rect.width) * 100, 7, 93),
      y: clamp(((event.clientY + offset.y - rect.top) / rect.height) * 100, 18, 94),
    };
  }, []);

  // 클릭하거나 드래그한 위치를 부모의 배치 상태로 전달
  const movePlacement = useCallback((event: PointerEvent<HTMLElement>, offset: DragOffset) => {
    const nextPosition = getPointerPosition(event, offset);

    if (nextPosition) {
      onPlacementChange?.(nextPosition);
    }
  }, [getPointerPosition, onPlacementChange]);

  // 오브젝트를 드래그하는 동안 위치 업데이트가 끊기지 않도록 포인터를 캡처
  const handlePlacementPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);

    if (!placementDraft) {
      return;
    }

    const rect = roomRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    dragOffsetRef.current = {
      x: rect.left + (placementDraft.position.x / 100) * rect.width - event.clientX,
      y: rect.top + (placementDraft.position.y / 100) * rect.height - event.clientY,
    };
  };

  const handlePlacementPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.buttons !== 1 || !dragOffsetRef.current) {
      return;
    }

    movePlacement(event, dragOffsetRef.current);
  };

  const handlePlacementPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    dragOffsetRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      ref={roomRef}
      className="relative w-full h-full overflow-hidden transition-colors duration-500"
      style={{
        background: `linear-gradient(180deg, ${weatherTone.wallTop}, ${weatherTone.wall})`,
      }}
    >

      <Weather weather={weatherKey} />

      <img
        src={RoomImg}
        alt="room"
        className="absolute inset-0 w-full h-full object-cover object-left z-10 pointer-events-none transition-[filter] duration-500"
        style={{
          filter: ROOM_FILTER_BY_WEATHER[weatherKey],
        }}
      />

      {/* 위치가 확정되어 저장된 오브젝트들 */}
      {placedObjects.map((placedObject) => {
        const object = ROOM_OBJECT_BY_KEY[placedObject.objectKey];
        const label = placedObject.title?.trim() || object.label;

        return (
          <div
            key={placedObject.id}
            className="group absolute z-[15] pointer-events-auto select-none hover:z-[25]"
            onPointerDown={(event) => {
              event.stopPropagation();
            }}
            onClick={() => onObjectSelect?.(placedObject.id)}
            style={{
              left: `${placedObject.position.x}%`,
              top: `${placedObject.position.y}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="pointer-events-none absolute bottom-[calc(100%+16px)] left-1/2 z-10
              -translate-x-1/2 whitespace-nowrap rounded-md border border-[#5a4632]/20 bg-[#faf8f2]/95
              px-3 py-1.5 text-xs text-[#5a4632] opacity-0 shadow-md transition-opacity delay-0 duration-150
              group-hover:opacity-100 group-hover:delay-500">
              {label}
              <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-[#5a4632]/20 bg-[#faf8f2]/95" />
            </div>

            <img
              src={object.image}
              alt=""
              className="pointer-events-none absolute left-0 top-0 opacity-0 transition-opacity delay-0 duration-150 group-hover:opacity-100 group-hover:delay-500"
              style={{
                width: `${object.roomWidth}px`,
                transformOrigin: "bottom center",
                // filter: "brightness(1.16) saturate(1.08) drop-shadow(0 0 5px rgba(255,248,232,0.95)) drop-shadow(0 0 8px rgba(90,70,50,0.24))",
              }}
            />

            <img
              src={object.image}
              alt=""
              className="cursor-pointer"
              style={{
                width: `${object.roomWidth}px`,
                transformOrigin: "bottom center",
                filter: ROOM_FILTER_BY_WEATHER[weatherKey],
              }}
            />
          </div>
        );
      })}

      {/* 임시 오브젝트. 드래그로 위치를 잡고 체크를 누르면 저장 */}
      {placementDraft && (() => {
        const object = ROOM_OBJECT_BY_KEY[placementDraft.objectKey];

        return (
          <div
            className="absolute z-[30] select-none"
            onPointerDown={handlePlacementPointerDown}
            onPointerMove={handlePlacementPointerMove}
            onPointerUp={handlePlacementPointerEnd}
            onPointerCancel={handlePlacementPointerEnd}
            style={{
              left: `${placementDraft.position.x}%`,
              top: `${placementDraft.position.y}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <img
              src={object.image}
              alt=""
              draggable={false}
              className="cursor-grab drop-shadow-[0_12px_16px_rgba(48,36,26,0.24)] active:cursor-grabbing"
              style={{
                width: `${object.roomWidth}px`,
                filter: ROOM_FILTER_BY_WEATHER[weatherKey],
              }}
            />

            <div
              data-placement-control="true"
              className="absolute left-1/2 top-[-46px] flex -translate-x-1/2 gap-2"
              onPointerDown={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={onPlacementConfirm}
                title="위치 고정"
                className="grid h-9 w-9 place-items-center rounded-full border border-[#5a4632]/20 bg-[#faf8f2] text-[#5a4632] shadow-md transition hover:bg-white"
              >
                <Check size={18} />
              </button>
              <button
                type="button"
                onClick={onPlacementCancel}
                title="취소"
                className="grid h-9 w-9 place-items-center rounded-full border border-[#5a4632]/20 bg-[#faf8f2] text-[#5a4632] shadow-md transition hover:bg-white"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        );
      })()}

      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500"
        style={{
          background: `
            radial-gradient(circle at 58% 20%, ${weatherTone.accent}55, transparent 34%),
            linear-gradient(180deg, ${weatherTone.windowTop}55 0%, transparent 44%, ${weatherTone.floor}44 100%)
          `,
          mixBlendMode: "soft-light",
          opacity: ROOM_TINT_OPACITY_BY_WEATHER[weatherKey],
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500"
        style={{
          background: weatherTone.windowBottom,
          mixBlendMode: weatherKey === "sunny" || weatherKey === "dawn" || weatherKey === "cherry" ? "overlay" : "multiply",
          opacity: weatherKey === "sunny" || weatherKey === "cherry" ? 0.06 : weatherKey === "night" ? 0.18 : 0.12,
        }}
      />

    </div>
  );
}
