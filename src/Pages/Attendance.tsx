import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


export default function Attendance() {
  return (
    <div className="h-full">
      {/* <h1>THIS IS ATTENDANCE</h1> */}
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">STUDENT NAME</TableHead>
            <TableHead>GRADE</TableHead>
            <TableHead>SECTION</TableHead>
            <TableHead className="">STATUS</TableHead>
            <TableHead className="">PREVIOUS 7 DAYS STATUS</TableHead>
            <TableHead className="text-right">ABSENT DAYS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}