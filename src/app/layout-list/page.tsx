/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useDeleteLayoutMutation,
  useGetAllLayoutQuery,
} from "@/redux/features/layout/layout.api";
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
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";

const LayoutList = () => {
  const { data: layoutData, isLoading, isError } = useGetAllLayoutQuery({});
  const [deleteLayout] = useDeleteLayoutMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await deleteLayout(id).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete layout");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-200px)] w-full flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <span className="text-lg font-medium text-muted-foreground">
          Loading layouts...
        </span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[calc(100vh-200px)] w-full flex flex-col items-center justify-center gap-4">
        <div className="text-destructive text-lg font-medium">
          Failed to load layouts
        </div>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Retry
        </Button>
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
    <div className="min-h-screen w-full max-w-[1540px] mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Layouts
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and organize your page layouts
          </p>
        </div>
        <Link href="/" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto bg-white border border-blue-500 rounded text-blue-500 hover:bg-blue-50">
            Create New Layout
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-[80px] font-semibold">ID</TableHead>
              <TableHead className="font-semibold">Layout Name</TableHead>
              <TableHead className="font-semibold">Components</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {layouts.map((layout: any, index: number) => (
              <TableRow
                key={layout._id}
                className="hover:bg-muted/30 transition-colors"
              >
                <TableCell className="font-medium text-center">
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium">
                  {layout.layoutName}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-normal">
                    {countComponents(layout)} Components
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-50 text-green-700 hover:bg-green-100 font-normal">
                    Active
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <LayoutDetails layout={layout} />
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                    onClick={() => handleDelete(layout._id)}
                    disabled={deletingId === layout._id}
                  >
                    {deletingId === layout._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {layouts.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-muted-foreground"
                >
                  <p>No layouts found</p>
                  <Link href="/">
                    <Button variant="outline" size="sm" className="mt-2">
                      Create your first layout
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {layouts.length > 0 && (
            <TableCaption className="px-4 py-2 text-xs bg-muted/50">
              Showing {layouts.length} layout{layouts.length !== 1 ? "s" : ""}
            </TableCaption>
          )}
        </Table>
      </div>
    </div>
  );
};

export default LayoutList;
