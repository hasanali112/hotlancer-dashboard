/* eslint-disable @typescript-eslint/no-explicit-any */
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
import LayoutDetails from "@/component/layoutDetail/LayoutDetails";
import { Badge } from "@/components/ui/badge";

const LayoutList = () => {
  const { data: layoutData, isLoading } = useGetAllLayoutQuery({});

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const layouts = layoutData?.result || [];

  // Helper function to count components
  const countComponents = (layout: any) => {
    return Object.keys(layout).filter(
      (key) => key.includes("Component") || key.includes("Section")
    ).length;
  };

  return (
    <div className="min-h-screen w-full max-w-[1540px] mx-auto px-[20px]">
      <h1 className="mt-10 text-2xl font-bold">Layout List</h1>

      <div className="mt-6">
        <Table>
          <TableCaption>A list of all available layouts.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SL NO.</TableHead>
              <TableHead>Layout Name</TableHead>
              <TableHead>Components</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {layouts.map((layout: any, index: any) => (
              <TableRow key={layout._id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{layout.layoutName}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {countComponents(layout)} Components
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    Active
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <LayoutDetails layout={layout} />
                </TableCell>
              </TableRow>
            ))}
            {layouts.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  No layouts found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LayoutList;
