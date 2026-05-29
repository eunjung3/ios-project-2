function SunsetWeather() {
    return (
        <div className="relative h-full w-full overflow-hidden">
            {/* 하늘 */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#5c4a86] via-[#d9785f] to-[#f5b35f]" />

            {/* 태양 빛 */}
            <div className="absolute left-[24%] top-[210px] h-[360px] w-[500px] -translate-x-1/2 rounded-full bg-yellow-300/20 blur-3xl" />

            <div className="absolute left-[24%] top-[245px] h-[220px] w-[220px] -translate-x-1/2 rounded-full bg-orange-200/35 blur-2xl" />

            {/* 태양 */}
            <div className="absolute left-[24%] top-[280px] h-[100px] w-[100px] -translate-x-1/2 rounded-full bg-[#ffd18a]/85 shadow-[0_0_70px_rgba(255,164,76,0.72)]" />

            <div className="absolute left-[24%] top-[350px] h-[90px] w-[164px] -translate-x-1/2 overflow-hidden">
                <div className="absolute bottom-0 h-[164px] w-[164px] rounded-full bg-[#ffd18a]/70 blur-lg" />
            </div>

            <div className="absolute bottom-0 left-0 h-[300px] w-full bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute inset-0 bg-orange-300/20 backdrop-blur-[1px]" />
            <div className="absolute inset-0 bg-orange-500/5" />
            <div className="absolute inset-0 bg-white/10 animate-cloud" />

        </div>
    )
}

export default SunsetWeather
