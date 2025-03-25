/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { useCreateDomainMutation } from "@/redux/features/domain/domain.api";
import { useState } from "react";
import { toast } from "sonner";

const DomainList = () => {
  const [domainNameList, setDomainNameList] = useState("");
  const [createDomain, { isLoading }] = useCreateDomainMutation();

  const onSubmit = async (e: any) => {
    e?.preventDefault();
    try {
      const res = await createDomain({ domainNameList }).unwrap();

      if (res?.success === true) {
        toast.success(res?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full  max-w-[1540px] mx-auto  px-[20px] min-h-screen my-10">
      <h1 className="text-2xl font-bold mb-4">Create Domain List</h1>
      <form onSubmit={onSubmit}>
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
  );
};

export default DomainList;
