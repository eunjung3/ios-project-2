const dawnMist = [
    { id: 1, top: "36%", left: "-12%", width: "58%", delay: "0s" },
    { id: 2, top: "50%", left: "18%", width: "68%", delay: "-4s" },
    { id: 3, top: "64%", left: "-18%", width: "76%", delay: "-8s" },
];

function DawnWeather() {
    return (
        <div className="relative h-full w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#5d6698] via-[#8fa0c8] to-[#f0b8a8]" />
            <div className="absolute inset-0 bg-[#b89bd7]/12" />
            <div className="absolute left-[27%] top-[215px] h-[230px] w-[560px] -translate-x-1/2 rounded-full bg-[#ffd7bd]/22 blur-3xl" />
            <div className="absolute left-[28%] top-[295px] h-[110px] w-[170px] -translate-x-1/2 rounded-full bg-[#ffd1ad]/32 blur-2xl" />

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

            <div className="absolute inset-0 bg-gradient-to-t from-[#5e6685]/18 via-transparent to-[#d9d1ff]/18" />
            <div className="absolute inset-0 bg-[#e6bfd9]/8 backdrop-blur-[1px]" />

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
