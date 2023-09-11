import { FC } from 'react'

interface PayrollPageProps {
  params:{
    payrollId: string
  }
}

const PayrollPage: FC<PayrollPageProps> = ({params}) => {
  return <div>PayrollPage</div>
}

export default PayrollPage