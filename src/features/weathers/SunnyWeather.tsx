const sunRays = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    delay: i * 0.4,
}))

function SunnyWeather() {
    return (
        <div className="relative h-full w-full overflow-hidden">

            {/* 하늘 */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#8fd3ff] via-[#bfe7ff] to-[#eef9ff]" />

            {/* 햇빛 glow */}
            <div className="absolute left-[30%] top-[120px] h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-yellow-200/60 blur-3xl" />

            {/* 해 */}
            <div className="absolute left-[27%] top-[130px] h-[90px] w-[90px] -translate-x-1/2 rounded-full bg-yellow-200 shadow-[0_0_60px_rgba(255,220,120,0.9)]" />

            {/* 햇빛 광선 */}
            {sunRays.map((ray) => (
                <div
                    key={ray.id}
                    className="absolute left-1/2 top-[120px] h-[320px] w-[120px] -translate-x-1/2 animate-sun-ray rounded-full bg-yellow-100/10 blur-2xl"
                    style={{
                        animationDelay: `${ray.delay}s`,
                        transform: `translateX(-50%) rotate(${ray.id * 30}deg)`,
                    }}
                />
            ))}

            {/* 밝은 빛 퍼짐 */}
            <div className="absolute left-1/2 top-[180px] h-[260px] w-[500px] -translate-x-1/2 bg-yellow-100/20 blur-3xl" />

            {/* 작은 먼지 느낌 */}
            <div className="absolute left-[20%] top-[30%] h-2 w-2 rounded-full bg-white/40 blur-[1px]" />
            <div className="absolute left-[70%] top-[40%] h-1.5 w-1.5 rounded-full bg-white/30 blur-[1px]" />
            <div className="absolute left-[55%] top-[25%] h-1 w-1 rounded-full bg-white/50 blur-[1px]" />

            {/* CSS */}
            <style>{`
                @keyframes sunRay {
                    0% {
                        opacity: 0.15;
                        transform: translateX(-50%) scaleY(0.9);
                    }

                    50% {
                        opacity: 0.3;
                        transform: translateX(-50%) scaleY(1);
                    }

                    100% {
                        opacity: 0.15;
                        transform: translateX(-50%) scaleY(0.9);
                    }
                }

                .animate-sun-ray {
                    animation: sunRay 4s ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}

export default SunnyWeather