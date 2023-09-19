import LinkButton from "@/components/buttons/link-button";
import usePayroll from "@/hooks/usePayroll";
import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddLoan from "./components/add-loan";
import { columns } from "./components/columns";
import { PaySheetDataTable } from "./components/paysheet-table";
import SalaryAdvance from "./components/salary-advance";

interface PayrollPageProps {
  params: {
    employeeId: string;
  };
}

const PayrollPage: FC<PayrollPageProps> = async ({ params }) => {
  const { employeeId } = params;

  const { getPayrollByEmployee } = usePayroll();
  const payrolls = await getPayrollByEmployee(employeeId);

  return (
    <div>
      <Tabs defaultValue="payroll">
        <TabsList>
          <TabsTrigger value="payroll">Payroll</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="payroll" className="mt-5">
          <h1 className="text-2xl font-semibold mb-5">
            Payroll of {payrolls[0]?.employee.name || "employee is not set yet"}
          </h1>
          <div className="flex gap-4 rounded-md">
            <LinkButton
              link={`/accounts/payroll/${employeeId}/new`}
              label="Add Salary"
              className="bg-[#2ebdaa] text-white p-2 m-1 h-8 "
            />
            {/* border-solid border-2 border-gray-400 */}
            <div>
              <SalaryAdvance />
            </div>

            <AddLoan />
          </div>
          <PaySheetDataTable data={payrolls} columns={columns} />
          <LinkButton link={`/accounts/payroll`} label="Go Back" />
        </TabsContent>
        <TabsContent value="analytics" className="mt-5">
          Add charts here.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollPage;
