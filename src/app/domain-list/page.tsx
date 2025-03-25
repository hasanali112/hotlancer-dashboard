"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const DomainList = () => {
  const [domainNameList, setDomainNameList] = useState("");
  const onSubmit = () => {
    console.log(domainNameList);
  };
  return (
    <div className="w-full  max-w-[1540px] mx-auto  px-[20px] min-h-screen my-10">
      <h1>Create Domain List</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="domainName">Domain Name</label>
          <input
            type="text"
            id="domainName"
            name="domainName"
            placeholder="Enter domain name"
            onBlur={(e) => setDomainNameList(e.target.value)}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default DomainList;
