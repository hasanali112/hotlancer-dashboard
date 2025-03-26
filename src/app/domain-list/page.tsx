/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DomainListTable from "@/component/domainList/DomainListTable";
import { Button } from "@/components/ui/button";
import { useCreateDomainMutation } from "@/redux/features/domain/domain.api";
import { useState } from "react";
import { toast } from "sonner";

const DomainList = () => {
  const [domainNameList, setDomainNameList] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [createDomain, { isLoading }] = useCreateDomainMutation();

  const onSubmit = async (e: any) => {
    e?.preventDefault();
    try {
      const res = await createDomain({ domainNameList, customerName }).unwrap();

      if (res?.success === true) {
        toast.success(res?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full max-w-[1540px] mx-auto px-[20px] min-h-screen my-10">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Create Domain List
      </h1>
      <div className="flex justify-center items-center">
        <form onSubmit={onSubmit}>
          <div className="flex gap-10">
            <div className="flex flex-col space-y-2">
              <label htmlFor="domainName">Domain Name</label>
              <input
                type="text"
                id="domainName"
                name="domainName"
                placeholder="Enter domain name"
                className="border border-gray-300 rounded px-2 py-2 w-[400px]"
                onBlur={(e) => setDomainNameList(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="customerName">Customer Name</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                placeholder="Enter customer name"
                className="border border-gray-300 rounded px-2 py-2 w-[400px]"
                onBlur={(e) => setCustomerName(e.target.value)}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer w-[100px]"
          >
            {isLoading ? (
              <div className="relative animate-spin inline-block w-4 h-4 rounded-full border border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>

      <div className="w-full mt-10">
        <h1 className="text-2xl font-bold my-5 text-center">Domain List</h1>
        <div className="flex justify-center items-center w-full">
          <div className="w-[60%] overflow-x-auto shadow-md p-2">
            {/* Add utility classes for full width and responsive scrolling */}
            <DomainListTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainList;
