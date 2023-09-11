import { FC } from "react";
import { PayrollDataTable } from "./components/payroll-data-table";
import { columns } from "./components/columns";
import { payrollData } from "@/constants/sample/payroll-data";

interface PayrollPageProps {}

const PayrollPage: FC<PayrollPageProps> = ({}) => {
  return <div>
    <PayrollDataTable columns={columns} data={payrollData} />
  </div>;
};

export default PayrollPage;
