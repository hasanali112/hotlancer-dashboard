"use client";

import { useGetAllLayoutQuery } from "@/redux/features/layout/layout.api";

const LayoutList = () => {
  const { data: layout } = useGetAllLayoutQuery({});

  console.log(layout);
  return (
    <div>
      <h1>Layout List</h1>
    </div>
  );
};

export default LayoutList;
