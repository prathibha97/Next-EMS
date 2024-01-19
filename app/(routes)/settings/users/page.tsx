import { DataTable } from "@/components/data-table";
import prisma from "@/lib/prisma";
import { FC } from "react";
import { columns } from "./components/columns";
import { Separator } from "@/components/ui/separator";

export const revalidate = 0;


const UsersPage = async ({}) => {
  const data = await prisma.user.findMany();

  return (
    <div className="bg-slate-50 md:w-[850px] xl:w-[950px] p-5 rounded-lg dark:bg-gray-800/40">
      <div className="container space-y-6 mb-5">
        <div>
          <h3 className="text-lg font-medium">Users</h3>
          <p className="text-sm text-muted-foreground">
            Manage your users here. You can add, edit, and delete users.
          </p>
        </div>
        <Separator />
      </div>
      <DataTable
        columns={columns}
        data={data}
        placeholder="Email"
        searchFilter="email"
      />
    </div>
  );
};

export default UsersPage;
