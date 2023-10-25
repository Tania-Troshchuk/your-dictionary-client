
export const ResultsCircle = ({ percent }: { percent: number }) => {
  return (
    <div className="relative self-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" className="">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#beb2ff" strokeWidth="10" />

        <circle cx="50" cy="50" r="40" fill="none" stroke="#7f55fd" strokeWidth="10"
          strokeDasharray="251.2" strokeDashoffset={(100 - percent) / 100 * 251.2} transform="rotate(-90) translate(-100 0)" />
      </svg>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-[40%] -translate-y-[40%] font-kalam text-melrose-700 text-xl">{`${percent}%`}</div>
    </div>
  )
}
