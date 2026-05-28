const dawnMist = [
    { id: 1, top: "36%", left: "-12%", width: "58%", delay: "0s" },
    { id: 2, top: "50%", left: "18%", width: "68%", delay: "-4s" },
    { id: 3, top: "64%", left: "-18%", width: "76%", delay: "-8s" },
];

function DawnWeather() {
    return (
        <div className="relative h-full w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#34496f] via-[#a7b6d8] to-[#f2c1ad]" />
            <div className="absolute left-1/2 top-[190px] h-[240px] w-[620px] -translate-x-1/2 rounded-full bg-[#ffd4b9]/24 blur-3xl" />
            <div className="absolute left-[42%] top-[260px] h-[120px] w-[120px] rounded-full bg-[#f8d5b8]/45 blur-xl" />

            {dawnMist.map((mist) => (
                <div
                    key={mist.id}
                    className="absolute h-[70px] rounded-full bg-white/18 blur-2xl animate-dawn-mist"
                    style={{
                        top: mist.top,
                        left: mist.left,
                        width: mist.width,
                        animationDelay: mist.delay,
                    }}
                />
            ))}

            <div className="absolute inset-0 bg-gradient-to-t from-[#334050]/24 via-transparent to-[#dbe7ff]/12" />
            <div className="absolute inset-0 bg-[#f3c8b6]/10 backdrop-blur-[1px]" />

            <style>{`
                @keyframes dawnMist {
                    0% {
                        opacity: 0.18;
                        transform: translateX(-6%);
                    }

                    50% {
                        opacity: 0.34;
                        transform: translateX(8%);
                    }

                    100% {
                        opacity: 0.18;
                        transform: translateX(-6%);
                    }
                }

                .animate-dawn-mist {
                    animation: dawnMist 14s ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}

export default DawnWeather
