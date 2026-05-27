function SunsetWeather() {
    return (
        <div className="relative h-full w-full overflow-hidden">
            {/* 하늘 */}
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500 via-pink-400 to-orange-300" />

            {/* 태양 빛 */}
            <div className="absolute left-1/2 top-[120px] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-yellow-300/20 blur-3xl" />

            <div className="absolute left-1/2 top-[120px] h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-orange-200/40 blur-2xl" />

            <div className="absolute bottom-0 left-0 h-[300px] w-full bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute inset-0 bg-orange-300/20 backdrop-blur-[1px]" />
            <div className="absolute inset-0 bg-orange-500/5" />
            <div className="absolute inset-0 bg-white/10 animate-cloud" />

        </div>
    )
}

export default SunsetWeather