import { Skeleton } from '@/components/ui/skeleton';
import { FC } from 'react';

interface LoadingProps {}

const Loading: FC<LoadingProps> = () => {
  const generateSkeletons = (count: number) => {
    const skeletons = [];
    for (let i = 0; i < count; i++) {
      skeletons.push(<Skeleton key={i} className='h-4 w-[150px]' />);
    }
    return skeletons;
  };

  const generateColumns = (count: number) => {
    const columns = [];
    for (let i = 0; i < count; i++) {
      columns.push(
        <td key={i} className='flex flex-col space-y-4'>
          {generateSkeletons(5)}
        </td>
      );
    }
    return columns;
  };

  return (
    <div>
      <div className='flex mb-5 gap-x-4'>{generateSkeletons(4)}</div>
      <table className='min-w-full'>
        <tbody>
          <tr className='flex space-x-4'>{generateColumns(5)}</tr>
        </tbody>
      </table>
    </div>
  );
};

export default Loading;
