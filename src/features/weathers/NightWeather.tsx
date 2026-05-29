const stars = [
    { id: 1, left: "16%", top: "14%", size: 2, delay: "0s" },
    { id: 2, left: "28%", top: "25%", size: 1.5, delay: "-1.2s" },
    { id: 3, left: "30%", top: "11%", size: 2.5, delay: "-0.7s" },
    { id: 4, left: "10%", top: "22%", size: 1.5, delay: "-1.8s" },
    { id: 5, left: "20%", top: "15%", size: 2, delay: "-0.4s" },
    { id: 6, left: "14%", top: "34%", size: 1.5, delay: "-2s" },
    { id: 7, left: "33%", top: "40%", size: 1.5, delay: "-1.5s" },
    { id: 8, left: "25%", top: "47%", size: 2, delay: "-0.9s" },
    { id: 9, left: "18%", top: "45%", size: 1.5, delay: "0s" },
    { id: 10, left: "12%", top: "52%", size: 2, delay: "-1.8s" },
];

function NightWeather() {
    return (
        <div className="relative h-full w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#070b19] via-[#111a32] to-[#1a2438]" />
            <div className="absolute inset-0 bg-[#02040d]/30" />

            <div
                className="absolute left-[24%] top-[120px] h-[88px] w-[88px] rounded-full bg-[#dce7ff]"
                style={{
                    WebkitMaskImage: "radial-gradient(circle at 64% 42%, transparent 0 45%, #000 46% 100%)",
                    maskImage: "radial-gradient(circle at 64% 42%, transparent 0 50%, #000 46% 100%)",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskSize: "100% 100%",
                    maskSize: "100% 100%",
                    filter: "drop-shadow(0 0 26px rgba(181,201,255,0.78))",
                }}
            />

            {stars.map((star) => (
                <div
                    key={star.id}
                    className="absolute rounded-full bg-white/80 animate-night-star"
                    style={{
                        left: star.left,
                        top: star.top,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        animationDelay: star.delay,
                    }}
                />
            ))}

            <div className="absolute left-1/2 top-[150px] h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[#8aa4d6]/10 blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-[#0b1024]/20" />

            <style>{`
                @keyframes nightStar {
                    0%, 100% {
                        opacity: 0.35;
                        transform: scale(0.85);
                    }

                    50% {
                        opacity: 1;
                        transform: scale(1.2);
                    }
                }

                .animate-night-star {
                    animation: nightStar 3s ease-in-out infinite;
                }

            `}</style>
        </div>
    )
}

export default NightWeather
