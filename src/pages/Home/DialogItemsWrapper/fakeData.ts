import { ChatInterface, UserInterface } from "types/types";

export const currentUser: UserInterface = {
  id: "1",
  name: "Александр Авдеев",
  avatar: ""
};

export const fakeData: ChatInterface[] = [
  {
    chatId: Math.random().toString(),
    lastMessage: {
      isRead: false,
      text: "Когда-то давным давно",
      date: "Tue Sep 22 2020 04:40:50 GMT+0300",
      attachments: [],
      audio: "link/;f;sdalsdlsdl",
      author: {
        name: "Александр Авдеев",
        avatar: "",
        id: "1"
      }
    },
    unreadCount: 3,
    user: {
      name: "Александр Авдеев",
      avatar: "",
      id: "1"
    }
  },

  {
    chatId: Math.random().toString(),
    lastMessage: {
      isRead: true,
      text: "Что то там случилось, и однажды",
      date: "Tue Sep 21 2020 04:12:50 GMT+0300",
      attachments: [
        {
          name: "Devuska.png",
          url: "dslfdslfksldfk"
        }
      ],
      author: {
        name: "Светлана Троцкая",
        avatar: "",
        id: "2"
      }
    },
    unreadCount: 15,
    user: {
      name: "Светлана Троцкая",
      avatar: "",
      id: "2"
    }
  },
  {
    chatId: Math.random().toString(),
    lastMessage: {
      isRead: false,
      text: "And I'm fine, thanks a lot for your help",
      date: "Tue Sep 20 2020 04:12:50 GMT+0300",
      attachments: [],
      author: {
        name: "Justin Quanson",
        avatar:
          "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/87/876d959e814f45f3e3e987f6fcc257c57667cfbf.jpg",
        id: "3"
      }
    },
    unreadCount: 15,
    user: {
      name: "Justin Quanson",
      avatar:
        "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/87/876d959e814f45f3e3e987f6fcc257c57667cfbf.jpg",
      id: "3"
    }
  },

  {
    chatId: Math.random().toString(),
    lastMessage: {
      isRead: true,
      text: "Не всегда ты осознаешь, насколько был неправ.",
      date: "Tue Sep 22 2020 04:50:50 GMT+0300",
      attachments: [],
      author: {
        name: "Марк Гринвелл",
        avatar:
          "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/23/23a1a4bc18f3203ffabed95a7bdf40d320e31a49.jpg",
        id: "4"
      }
    },
    unreadCount: 15,
    user: {
      name: "Марк Гринвелл",
      avatar:
        "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/23/23a1a4bc18f3203ffabed95a7bdf40d320e31a49.jpg",
      id: "4"
    }
  },

  {
    chatId: Math.random().toString(),
    lastMessage: {
      isRead: true,
      text: "Эх, что бы было, если бы не ты)",
      date: "Tue Sep 22 2020 04:50:50 GMT+0300",
      attachments: [],
      author: {
        name: "Зигмунд Фрейд",
        avatar: "https://b1.m24.ru/c/647971.483xp.jpg",
        id: "5"
      }
    },
    unreadCount: 0,
    user: {
      name: "Зигмунд Фрейд",
      avatar: "https://b1.m24.ru/c/647971.483xp.jpg",
      id: "5"
    }
  },

  {
    chatId: Math.random().toString(),
    lastMessage: {
      isRead: false,
      text: "Возможно!",
      date: "Tue Sep 19 2020 04:50:50 GMT+0300",
      attachments: [],
      author: {
        name: "Просто кролик",
        avatar:
          "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/03/03d45b707d2cf8b044f7b8b03ccc3c57cc9fd4c9.jpg",
        id: "6"
      }
    },
    unreadCount: 0,
    user: {
      name: "Просто кролик",
      avatar:
        "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/03/03d45b707d2cf8b044f7b8b03ccc3c57cc9fd4c9.jpg",
      id: "6"
    }
  },

  {
    chatId: Math.random().toString(),
    lastMessage: {
      isRead: true,
      text: "Как дела твои?",
      date: "Tue Sep 16 2020 04:50:50 GMT+0300",
      attachments: [],
      author: {
        name: "Аноним 1",
        avatar:
          "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/96/968659711ce905add8c88d45db5182ee242e922e.jpg",
        id: "7"
      }
    },
    unreadCount: 0,
    user: {
      name: "Аноним 1",
      avatar:
        "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/96/968659711ce905add8c88d45db5182ee242e922e.jpg",
      id: "7"
    }
  },

  {
    chatId: Math.random().toString(),
    lastMessage: {
      isRead: false,
      text: "Все хорошо, спасибо",
      date: "Tue Sep 16 2020 01:50:50 GMT+0300",
      attachments: [],
      author: {
        name: "Кристина Анисимова",
        avatar:
          "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/00/0085de6a4adcadfe28a8a503f26c5568e781d09b.jpg",
        id: "8"
      }
    },
    unreadCount: 0,
    user: {
      name: "Кристина Анисимова",
      avatar:
        "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/00/0085de6a4adcadfe28a8a503f26c5568e781d09b.jpg",
      id: "8"
    }
  },

  {
    chatId: Math.random().toString(),
    lastMessage: {
      isRead: true,
      text: "Ага",

      date: "Tue Sep 12 2020 01:50:50 GMT+0300",
      attachments: [],
      author: {
        name: "Алина Транковская",
        avatar:
          "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/6a/6ad99bb051e1200790a756ac6537e1889d44a253.jpg",
        id: "9"
      }
    },
    unreadCount: 4,
    user: {
      name: "Алина Транковская",
      avatar:
        "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/6a/6ad99bb051e1200790a756ac6537e1889d44a253.jpg",
      id: "9"
    }
  }
];
