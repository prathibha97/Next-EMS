import { DataTable } from "@/components/data-table";
import prisma from "@/lib/prisma";
import { FC } from "react";
import { columns } from "./components/columns";
import { Separator } from "@/components/ui/separator";

interface UsersPageProps {}

const UsersPage: FC<UsersPageProps> = async ({}) => {
  const data = await prisma.user.findMany();

  return (
    <div className="ml-4 md:ml-10 max-w-[700px] mx-auto space-y-6">
      <div>
        <h3 className="text-lg font-medium">Users</h3>
        <p className="text-sm text-muted-foreground">
          Manage your users here. You can add, edit, and delete users.
        </p>
      </div>
      <Separator />
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
