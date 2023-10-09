// /* eslint-disable react/jsx-props-no-spreading */
// import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
// import { Dialog, Transition } from '@headlessui/react';
// import { InputLabel, MenuItem, Select, TextField } from '@mui/material';
// import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';
// import { Fragment, useState } from 'react';
// import Button from '../Button';

// function ScheduleMeeting({
//   isOpen,
//   setIsOpen,
//   selectedDay,
//   people,
//   handleSubmit,
// }) {
//   const [summary, setSummary] = useState('');
//   const [startValue, setStartValue] = useState(dayjs(selectedDay));
//   const [endValue, setEndValue] = useState(dayjs(selectedDay));
//   const [selectedPeople, setSelectedPeople] = useState([people[0]]);

//   const handleChange = (event) => {
//     const { value } = event.target;
//     setSelectedPeople(value);
//   };

//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog
//         as='div'
//         className='relative z-10'
//         onClose={() => setIsOpen(false)}
//       >
//         <Transition.Child
//           as={Fragment}
//           enter='ease-out duration-300'
//           enterFrom='opacity-0'
//           enterTo='opacity-100'
//           leave='ease-in duration-200'
//           leaveFrom='opacity-100'
//           leaveTo='opacity-0'
//         >
//           <div className='fixed inset-0 bg-black bg-opacity-25' />
//         </Transition.Child>

//         <div className='fixed inset-0 overflow-y-auto'>
//           <div className='flex min-h-full items-center justify-center p-4 text-center'>
//             <Transition.Child
//               as={Fragment}
//               enter='ease-out duration-300'
//               enterFrom='opacity-0 scale-95'
//               enterTo='opacity-100 scale-100'
//               leave='ease-in duration-200'
//               leaveFrom='opacity-100 scale-100'
//               leaveTo='opacity-0 scale-95'
//             >
//               <Dialog.Panel className='w-[600px] h-[450px] max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
//                 <Dialog.Title
//                   as='h3'
//                   className='text-lg font-medium leading-6 text-gray-900'
//                 >
//                   Schedule a Meeting
//                 </Dialog.Title>
//                 <div className='mt-2'>
//                   <div className='fixed top-18 w-[450px]'>
//                     <InputLabel id='demo-simple-select-label' className='mb-2'>
//                       Meeting Summary
//                     </InputLabel>
//                     <TextField
//                       fullWidth
//                       value={summary}
//                       onChange={(e) => setSummary(e.target.value)}
//                     />
//                     <InputLabel id='demo-simple-select-label' className='mb-2'>
//                       Select Attendees
//                     </InputLabel>
//                     <Select
//                       labelId='demo-simple-select-label'
//                       id='demo-simple-select'
//                       multiple
//                       fullWidth
//                       value={selectedPeople}
//                       onChange={handleChange}
//                       renderValue={(selected) =>
//                         selected
//                           .map(
//                             (person) =>
//                               `${person.name.first} ${person.name.last}`
//                           )
//                           .join(', ')
//                       }
//                     >
//                       {people.map((person, personIdx) => (
//                         <MenuItem key={personIdx} value={person}>
//                           {`${person.name.first} ${person.name.last}`}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                     <div className='flex mt-8 mb-8 gap-2'>
//                       <LocalizationProvider dateAdapter={AdapterDayjs}>
//                         <DateTimePicker
//                           label='Start Date & Time'
//                           value={startValue}
//                           onChange={(newValue) => setStartValue(newValue)}
//                           renderInput={(params) => <TextField {...params} />}
//                         />
//                       </LocalizationProvider>
//                       <LocalizationProvider dateAdapter={AdapterDayjs}>
//                         <DateTimePicker
//                           label='End Date & Time'
//                           value={endValue}
//                           onChange={(newValue) => setEndValue(newValue)}
//                           renderInput={(params) => <TextField {...params} />}
//                         />
//                       </LocalizationProvider>
//                     </div>
//                     <Button
//                       title='Schedule Meeting'
//                       onClick={() =>
//                         handleSubmit(
//                           summary,
//                           selectedPeople,
//                           startValue,
//                           endValue
//                         )
//                       }
//                       icon={faCalendarCheck}
//                     />
//                   </div>
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// }

// export default ScheduleMeeting;

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

function ScheduleMeeting() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size='icon' variant='ghost'>
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Name
              </Label>
              <Input
                id='name'
                defaultValue='Pedro Duarte'
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-right'>
                Username
              </Label>
              <Input
                id='username'
                defaultValue='@peduarte'
                className='col-span-3'
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ScheduleMeeting;
