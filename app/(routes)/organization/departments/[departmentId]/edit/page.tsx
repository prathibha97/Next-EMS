import { FC } from 'react'

interface DepartmentEditPageProps {
  params:{
    departmentId: string
  }
}

const DepartmentEditPage: FC<DepartmentEditPageProps> = ({params}) => {
  return <div>DepartmentEditPage</div>
}

export default DepartmentEditPage