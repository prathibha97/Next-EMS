// import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Menu, Transition } from '@headlessui/react';
// import { Button } from '@mui/material';
// import { format, parseISO } from 'date-fns';

// import { Fragment, useState } from 'react';
// import CustomAvatar from '../CustomAvatar';
// import EditMeeting from '../EditMeeting';

// function Meeting({
//   meeting,
//   handleMeetingCancel,
//   currentUser,
//   people,
//   handleMeetingEdit,
// }) {
//   const startDateTime = parseISO(meeting.start.dateTime);
//   const endDateTime = parseISO(meeting.end.dateTime);

//   const [isOpen, setIsOpen] = useState(false);

//   function classNames(...classes) {
//     return classes.filter(Boolean).join(' ');
//   }

//   const isCreator = meeting?.organizer?.email === currentUser?.email;

//   const handleJoinMeeting = () => {
//     window.open(meeting.hangoutLink, '_blank');
//   };
//   const handleGoogleCalendar = () => {
//     window.open(meeting.htmlLink, '_blank');
//   };

//   return (
//     <li className='flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100'>
//       <CustomAvatar
//         name={`${currentUser?.name?.first} ${currentUser?.name?.last}`}
//       />
//       <div className='flex-auto'>
//         <p className='text-lg text-black'>{meeting.summary}</p>
//         <p>Organized by: {meeting?.organizer?.email}</p>
//         <p className='mt-0.5'>
//           Duration:{' '}
//           <time dateTime={meeting.startDatetime}>
//             {format(startDateTime, 'h:mm a')}
//           </time>{' '}
//           -{' '}
//           <time dateTime={meeting.endDatetime}>
//             {format(endDateTime, 'h:mm a')}
//           </time>
//         </p>
//         <Button onClick={handleJoinMeeting}>Join Meeting</Button>
//         <Button onClick={handleGoogleCalendar}>View in Google Calendar</Button>
//       </div>
//       {meeting?.attendee?.length > 0 && (
//         <div className='flex mt-2'>
//           {meeting?.attendees?.map((attendee, index) => (
//             <CustomAvatar
//               key={index}
//               name={`${attendee.email}`}
//               size={28}
//               style={{ fontSize: 12 }}
//             />
//           ))}
//         </div>
//       )}
//       {isCreator && (
//         <Menu
//           as='div'
//           className='relative opacity-0 focus-within:opacity-100 group-hover:opacity-100'
//         >
//           <div>
//             <Menu.Button className='-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600'>
//               <span className='sr-only'>Open options</span>
//               <FontAwesomeIcon
//                 icon={faEllipsisVertical}
//                 className='w-6 h-6'
//                 aria-hidden='true'
//               />
//             </Menu.Button>
//           </div>

//           <Transition
//             as={Fragment}
//             enter='transition ease-out duration-100'
//             enterFrom='transform opacity-0 scale-95'
//             enterTo='transform opacity-100 scale-100'
//             leave='transition ease-in duration-75'
//             leaveFrom='transform opacity-100 scale-100'
//             leaveTo='transform opacity-0 scale-95'
//           >
//             <Menu.Items className='absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none'>
//               <div className='py-1'>
//                 <Menu.Item>
//                   {({ active }) => (
//                     <button
//                       type='button'
//                       className={classNames(
//                         active ? 'bg-gray-100  text-gray-900' : 'text-gray-700',
//                         'block px-4 py-2 text-sm w-full'
//                       )}
//                       onClick={() => setIsOpen(true)}
//                     >
//                       Edit
//                     </button>
//                   )}
//                 </Menu.Item>
//                 <Menu.Item>
//                   {({ active }) => (
//                     <button
//                       type='button'
//                       className={classNames(
//                         active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
//                         'block px-4 py-2 text-sm w-full'
//                       )}
//                       onClick={() => handleMeetingCancel(meeting?.id)}
//                     >
//                       Cancel
//                     </button>
//                   )}
//                 </Menu.Item>
//               </div>
//             </Menu.Items>
//           </Transition>
//         </Menu>
//       )}
//       {isOpen && (
//         <EditMeeting
//           isOpen={isOpen}
//           people={people}
//           setIsOpen={setIsOpen}
//           handleMeetingEdit={handleMeetingEdit}
//           meeting={meeting}
//         />
//       )}
//     </li>
//   );
// }

// export default Meeting;

const Meeting = () => {
  return ( <div>Meeting</div> );
}
 
export default Meeting;