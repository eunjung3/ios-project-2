function CloudWeather() {
    return (
        <div className="relative h-full w-full overflow-hidden">
            {/* 흐린 하늘 */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-500 via-gray-300 to-gray-200" />
            {/* 안개 느낌 */}
            <div className="absolute inset-0 bg-gray-400/10 backdrop-blur-[2px] animate-fog" />
            {/* 흐린 빛 */}
            <div className="absolute left-1/2 top-10 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-gray-300/10 blur-3xl" />

            {/* 유리창 흐림 느낌 */}
            <div className="absolute inset-0 bg-gray-900/10" />

        </div>
    )
}

export default CloudWeather
