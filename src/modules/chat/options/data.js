

export default () => {
  return {
    id: undefined,
    chatStatus: true,
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
