// import { Avatar, Icon, Stack, Typography } from '@mui/material'
// import React from 'react'
// import {Face as FaceIcon,AlternateEmail as UsernameIcon,CalendarMonth as CalendarIcon} from '@mui/icons-material'
// import moment from 'moment'

// function Profile() {
//   return (
//     <Stack spacing={'2rem'} direction={'column'} alignItems={'center'}>
//         <Avatar sx={{
//             width:"200",
//             height:"200",
//             objectFit:'contain',
//             marginBottom:'1rem',
//             border:'5px solid white'
//         }}/>
//         <ProfileCard heading={'bio'} text={'ssajsj'} /> 
//         <ProfileCard heading={'Usernaeme'} text={'ssajsj'} Icon={<UsernameIcon/>}/> 
//         <ProfileCard heading={'bio'} text={'ssajsj'} Icon={<FaceIcon/>}/> 
//         <ProfileCard heading={'Joined'} text={moment('2024-06-21T18:30:00.000Z').fromNow()} Icon={<CalendarIcon/>}/> 
//     </Stack>
//   )
// }

// const ProfileCard=({text,Icon,heading})=>{
//     return (
//     <Stack direction={'row'} alignItems={'center'} spacing={'1rem'} color={'white'} textAlign={'center'}>

// {Icon && Icon}
// <Stack>
//     <Typography variant='body1'>{text}</Typography>
//     <Typography color={'gray'} variant='caption'>{heading}</Typography>
// </Stack>

//     </Stack>
    
//     )
// }

// export default Profile

import React from 'react';
import { Avatar } from '@mui/material';
import { Face as FaceIcon, AlternateEmail as UsernameIcon, CalendarMonth as CalendarIcon } from '@mui/icons-material';
import moment from 'moment';
import { transformImage } from '../../lib/features';

function Profile({user}) {
  return (
    <div className="flex flex-col items-center space-y-8">
      <Avatar
      src={transformImage(user?.avatar?.url)}
        sx={{
          width: 200,
          height: 200,
          objectFit: 'contain',
          marginBottom: '1rem',
          border: '5px solid white',
        }}
        className="w-48 h-48 object-contain mb-4 border-4 border-white"
      />
      <ProfileCard heading={'Bio'} text={user?.bio} />
      <ProfileCard heading={'Username'} text={user?.username} Icon={<UsernameIcon className="text-white" />} />
      <ProfileCard heading={'Name'} text={user?.name} Icon={<FaceIcon className="text-white" />} />
      <ProfileCard heading={'Joined'} text={moment(user?.createdAt).fromNow()} Icon={<CalendarIcon className="text-white" />} />
    </div>
  );
}

const ProfileCard = ({ text, Icon, heading }) => {
  return (
    <div className="flex items-center space-x-4 text-center text-white">
      {Icon && <div>{Icon}</div>}
      <div>
        <p className="text-lg">{text}</p>
        <p className="text-sm text-gray-400">{heading}</p>
      </div>
    </div>
  );
};

export default Profile;

