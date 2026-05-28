const cloudLayers = [
    { id: 1, top: "12%", left: "-10%", width: "42%", height: "18%", delay: "0s", duration: "18s", opacity: 0.28 },
    { id: 2, top: "26%", left: "18%", width: "54%", height: "24%", delay: "-6s", duration: "24s", opacity: 0.22 },
    { id: 3, top: "44%", left: "-18%", width: "70%", height: "28%", delay: "-12s", duration: "30s", opacity: 0.2 },
    { id: 4, top: "58%", left: "36%", width: "58%", height: "22%", delay: "-3s", duration: "26s", opacity: 0.18 },
];

function CloudWeather() {
    return (
        <div className="relative h-full w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#65707c] via-[#9ca5ae] to-[#c5c8c8]" />
            <div className="absolute inset-0 bg-[#4b5563]/20 backdrop-blur-[2px]" />
            <div className="absolute left-1/2 top-8 h-[260px] w-[560px] -translate-x-1/2 rounded-full bg-white/12 blur-3xl" />

            {cloudLayers.map((cloud) => (
                <div
                    key={cloud.id}
                    className="absolute rounded-full bg-white blur-3xl animate-heavy-cloud"
                    style={{
                        top: cloud.top,
                        left: cloud.left,
                        width: cloud.width,
                        height: cloud.height,
                        opacity: cloud.opacity,
                        animationDelay: cloud.delay,
                        animationDuration: cloud.duration,
                    }}
                />
            ))}

            <div className="absolute inset-0 bg-gradient-to-b from-[#27313d]/18 via-transparent to-[#39414a]/20" />
            <div className="absolute inset-0 bg-gray-900/15" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-white/10 blur-2xl animate-cloud-fog" />

            <style>{`
                @keyframes heavyCloud {
                    0% {
                        transform: translateX(-8%) scale(1);
                    }

                    50% {
                        transform: translateX(12%) scale(1.08);
                    }

                    100% {
                        transform: translateX(-8%) scale(1);
                    }
                }

                @keyframes cloudFog {
                    0% {
                        opacity: 0.18;
                        transform: translateX(-4%);
                    }

                    50% {
                        opacity: 0.3;
                        transform: translateX(4%);
                    }

                    100% {
                        opacity: 0.18;
                        transform: translateX(-4%);
                    }
                }

                .animate-heavy-cloud {
                    animation: heavyCloud ease-in-out infinite;
                }

                .animate-cloud-fog {
                    animation: cloudFog 12s ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}

export default CloudWeather
