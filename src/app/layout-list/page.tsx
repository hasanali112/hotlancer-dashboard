"use client";

import { useGetAllLayoutQuery } from "@/redux/features/layout/layout.api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const LayoutList = () => {
  const { data: layout } = useGetAllLayoutQuery({});

  console.log(layout);
  return (
    <div className="min-h-screen w-full max-w-[1540px] mx-auto px-[20px]">
      <h1 className="mt-10 text-2xl font-bold">Layout List</h1>

      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SL NO.</TableHead>
              <TableHead>Layout Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">View Layout</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LayoutList;
