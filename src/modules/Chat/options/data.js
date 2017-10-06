export default () => {
  return {
    opened: false,
    chatStatus: true,
    isClientTyping: false,
    isSupportTyping: false,
    popup: false,
    isInputHided: true,
    elmsState: {
      chatBtn: {
        icon: {
          name: 'chat',
          color: 'white'
        },
        btn: {
          name: '',
          color: 'grey',
          class: {
            'mobile-btn': true,
            'full-width': false
          }
        }
      },
      submitBtn: {
        icon: 'send',
        color: 'primary',
        name: '',
        status: false
      }
    },
    classes:{
      chatBtn: {
        display: ''          
      },
      chatBtnIcon: {
        'animate-fade': false,
      },
      sendBtn: {
        'full-width': false,
        'mobile-btn': true
      }
    }
  }
};