import prisma from "@/lib/prisma"

const useUsers = () => {

  const fetchAllUsers = async () => {
    const users = await prisma.user.findMany()
    return users
  }

  return{
    fetchAllUsers
  }
}

export default useUsers