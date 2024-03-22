import { useEffect, useState } from 'react';
import axios from 'axios';
import { Employee } from '@prisma/client';

export function useCurrentEmployee() {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentEmployee = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_URL}/employees/me`
        );
        setEmployee(data);
      } catch (error) {
        setError('Error fetching employee data');
      } finally {
        setLoading(false);
      }
    };

    getCurrentEmployee();
  }, []);

  return { employee, loading, error };
}
