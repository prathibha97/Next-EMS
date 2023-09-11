import { FC } from 'react'

interface PayrollEditPageProps {
  params:{
    payrollId: string
  }
}

const PayrollEditPage: FC<PayrollEditPageProps> = ({params}) => {
  return <div>PayrollEditPage</div>
}

export default PayrollEditPage