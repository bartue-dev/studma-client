import { format } from "date-fns"
import { Check, X, ClockAlert, Handshake, Ellipsis  } from "lucide-react";

type AttendanceDateType = {
  attendanceDate: {
    attendanceDateId: string,
    date: string,
    status: string
  }[]
}



export default function LastSevenDays({ attendanceDate }: AttendanceDateType) {

  const getLast7Days = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(); // Get current date
      d.setDate(d.getDate() - i); // Subtract 'i' days
      const date = (format(d, "yyyy-MM-dd"));

      const status = attendanceDate.find(data => data.date === date)?.status || null;

      dates.push({
        date,
        status
      })
    }
    return dates.reverse(); // Reverse to get chronological order (oldest to newest)
  } 

  console.log(getLast7Days())

  return (
    <div>
      <div className="flex items-center gap-2 w-fit">
        {getLast7Days().map((data, i) => (
          <div key={i} className="text-sm justify-items-center p-2 ">
            <h1 className="mb-2">{data.date.split("-")[2]}</h1>
            <span>
              { data.status === "PRESENT" ? <Check className="text-green-500" size={15}/> :
                data.status === "ABSENT" ? <X className="text-red-500" size={15}/> :
                data.status === "LATE" ? <ClockAlert className="text-yellow-500" size={15}/> :
                data.status === "EXCUSE" ? <Handshake className="text-blue-500" size={15}/> :
                <Ellipsis className="text-gray-600" size={15} />}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}