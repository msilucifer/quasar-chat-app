

export default {
  customer: {
    name: '',
    email: '',
    phone: ''
  },
  message: '',
  opened: false,
  isSupportOnline: false,
  isTyping: {
    support: false,
    client: false,
  },
  messages: [
    {
      label: 'Offline',
      name: 'SatTrack',
      text: ['Hi, there, we\'re not online now ); but feel free to text us whenever you need. We will text you back as soon as we can!'],
      sent: false,
      avatar: 'statics/me.png',
      stamp: 'Yesterday 15:54',
      bgColor: 'grey',
      state: {
        name: 'done',
        color: 'positive',
        sent: true,
        side: false
      }  
    }
  ]
};
