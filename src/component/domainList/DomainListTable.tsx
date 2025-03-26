"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetDomainQuery } from "@/redux/features/domain/domain.api";
import { IDomain } from "@/types/Interface";

const DomainListTable = () => {
  const { data: demainList } = useGetDomainQuery({});
  console.log(demainList);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SL NO.</TableHead>
            <TableHead>Domain List</TableHead>
            <TableHead>Customers Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {demainList?.data?.items?.map((item: IDomain, index: number) => (
            <TableRow key={item._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">
                {item.domainNameList}
              </TableCell>
              <TableCell>{item.customerName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DomainListTable;
