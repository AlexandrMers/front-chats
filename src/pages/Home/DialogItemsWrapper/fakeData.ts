import { ChatInterface, UserInterface } from "types/types";

export const currentUser: UserInterface = {
  id: "1",
  name: "Александр Авдеев",
  avatar: ""
};

export const fakeData: ChatInterface[] = [
  {
    chatId: Math.random().toString(),
    messages: [
      {
        id: 1,
        isRead: true,
        date: "Sun Sep 13 2020 17:54:45",
        text:
          "Привет, как дела? Привет, как дела?  Привет, как дела? Привет, как дела? Привет, как дела? Привет, как дела? Привет, как дела? мм",
        attachments: [],
        author: {
          avatar: "",
          id: "1",
          name: "Александр Авдеев"
        }
      },
      {
        id: 2,
        isRead: true,
        date: "Tue Sep 15 2020 06:00:45",
        text:
          "Привет, как дела? Привет, как дела?  Привет, как дела? Привет, как дела? Привет, как дела? Привет, как дела? Привет, как дела? мм",
        attachments: [
          {
            name: "девушка.jpg",
            url:
              "https://live.staticflickr.com/65535/50339368162_ddc568be3e_c.jpg"
          },
          {
            name: "море.jpg",
            url:
              "https://live.staticflickr.com/65535/50339930638_41a205fcab_c.jpg"
          },
          {
            name: "город.jpg",
            url:
              "https://live.staticflickr.com/65535/50337310643_de579e4bb1_c.jpg"
          }
        ],
        author: {
          name: "Мария",
          avatar:
            "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
          id: "3"
        }
      },

      {
        id: 3,
        isRead: true,
        date: "Mon Sep 14 2020 16:50:48",
        text: "другое сообщение",
        attachments: [
          {
            name: "девушка.jpg",
            url:
              "https://live.staticflickr.com/65535/50339368162_ddc568be3e_c.jpg"
          }
        ],
        author: {
          name: "Мария",
          avatar:
            "https://static8.depositphotos.com/1207999/1027/i/450/depositphotos_10275227-stock-photo-office-avatar-woman.jpg",
          id: "3"
        }
      },
      {
        id: 4,
        isRead: false,
        date: "Mon Sep 14 2020 16:50:48",
        text: "другое сообщение",
        attachments: [],
        author: {
          name: "Татьяна",
          avatar:
            "https://static8.depositphotos.com/1207999/1027/i/450/depositphotos_10275227-stock-photo-office-avatar-woman.jpg",
          id: "15"
        }
      },
      {
        isRead: true,
        id: 5,
        date: "Tue Sep 15 2020 06:00:45",
        text: "",
        attachments: [
          {
            name: "девушка.jpg",
            url:
              "https://live.staticflickr.com/65535/50339368162_ddc568be3e_c.jpg"
          }
        ],
        author: {
          avatar:
            "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
          name: "Изольда",
          id: "1134"
        }
      },
      {
        id: 7,
        isRead: true,
        attachments: [],
        text: "Приветствую",
        date: null,
        author: {
          name: "Джейсон",
          avatar:
            "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
          id: "fd32345fd"
        }
      },
      {
        id: 8,
        isRead: false,
        date: "Tue Sep 15 2020 06:00:45",
        text: "",
        attachments: [
          {
            name: "девушка.jpg",
            url:
              "https://live.staticflickr.com/65535/50339368162_ddc568be3e_c.jpg"
          }
        ],
        author: {
          name: "Мерсер",
          avatar:
            "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
          id: "13"
        }
      },
      {
        id: 9,
        isRead: true,
        date: "Tue Sep 15 2020 06:00:45",
        text: "",
        attachments: [],
        audio: "https://sound-pack.net/download/Sound_00619.wav",
        author: {
          name: "Декстер Морган",
          avatar:
            "https://sun9-69.userapi.com/impf/c824201/v824201969/17341f/IfCwbiGRL7c.jpg?size=200x0&quality=90&crop=0,0,500,588&sign=9b4d43be2be378401d5bec41a9c5d5b3&ava=1",
          id: "12223"
        }
      }
    ],
    unreadCount: 4,
    user: {
      isOnline: true,
      name: "Алина Транковская",
      avatar:
        "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/6a/6ad99bb051e1200790a756ac6537e1889d44a253.jpg",
      id: "9"
    }
  },
  {
    chatId: Math.random().toString(),
    messages: [
      {
        id: 2,
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
      }
    ],
    unreadCount: 15,
    user: {
      name: "Светлана Троцкая",
      avatar: "",
      id: "2"
    }
  },
  {
    chatId: Math.random().toString(),
    messages: [
      {
        id: 3,
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
      }
    ],
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
    messages: [
      {
        id: 4,
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
      }
    ],
    unreadCount: 3,
    user: {
      name: "Александр Авдеев",
      avatar: "",
      id: "1"
    }
  },
  {
    chatId: Math.random().toString(),
    messages: [
      {
        id: 6,
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
      }
    ],
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
    messages: [
      {
        id: 8,
        isRead: true,
        text: "Эх, что бы было, если бы не ты)",
        date: "Tue Sep 22 2020 04:50:49 GMT+0300",
        attachments: [],
        author: {
          name: "Зигмунд Фрейд",
          avatar: "https://b1.m24.ru/c/647971.483xp.jpg",
          id: "5"
        }
      }
    ],
    unreadCount: 0,
    user: {
      name: "Зигмунд Фрейд",
      avatar: "https://b1.m24.ru/c/647971.483xp.jpg",
      id: "5"
    }
  },

  {
    chatId: Math.random().toString(),
    messages: [
      {
        id: 10,
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
      }
    ],
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
    messages: [
      {
        id: 11,
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
      }
    ],
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
    messages: [
      {
        id: 12,
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
      }
    ],
    unreadCount: 0,
    user: {
      name: "Кристина Анисимова",
      avatar:
        "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/00/0085de6a4adcadfe28a8a503f26c5568e781d09b.jpg",
      id: "8"
    }
  }
];
