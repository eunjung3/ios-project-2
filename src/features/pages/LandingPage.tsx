// export function LandingPage() {
// //   const { navigate, user } = useAppStore();

//   return (
//     <main className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1280px] items-center gap-10 px-5 py-10 lg:grid-cols-[0.92fr_1.08fr]">
//       <section>
//         <p className="mb-4 text-[0.72rem] tracking-[0.28em] text-[#c8af8e]/45">마음의 날씨</p>
//         <h1 className="max-w-[620px] text-[clamp(2.15rem,5vw,4rem)] font-light leading-[1.45] text-[#e0d2ba]" style={{ fontFamily: "'Noto Serif KR', Georgia, serif" }}>
//           오늘 마음속 날씨는
//           <br />
//           어떤 모습인가요?
//         </h1>
//         <p className="mt-7 max-w-[520px] text-[0.98rem] leading-9 text-white/54">
//           말하지 못한 이야기를 적으면, 그 마음은 창밖의 날씨와 방 안의 사물이 됩니다.
//         </p>
//         <div className="mt-9 flex flex-wrap gap-3">
//           <button
//             type="button"
//             // 로그인 전이면 로그인 화면으로, 로그인 후면 바로 내 방으로 이동합니다.
//             onClick={() => navigate(user ? "/room" : "/login")}
//             className="mw-button-solid inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm"
//           >
//             내 방 시작하기
//             <ArrowRight size={16} />
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate("/plazas")}
//             className="mw-button inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm"
//           >
//             <PanelsTopLeft size={16} />
//             광장 둘러보기
//           </button>
//         </div>
//       </section>

//       <div className="min-w-0">
//         <RoomScene
//           weatherKey="rainy"
//           records={sampleRecords}
//           label="오늘은 어떤 날씨를 만들어 드릴까요?"
//           onObjectClick={() => undefined}
//         />
//       </div>
//     </main>
//   );
// }