import React from 'react'
import AudioRecorder from '../components/AudioRecorder';
import LoggedInNavbar from '../components/LoggedInNavbar';

const Dashboard = () => {
  return (
    <div>
        <LoggedInNavbar />
        <AudioRecorder />
    </div>
  )
}

export default Dashboard;