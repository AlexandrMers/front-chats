import { MessageInterface } from "components/Message/types";

export const fakeDataMessages: MessageInterface[] = [
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
        url: "https://live.staticflickr.com/65535/50339368162_ddc568be3e_c.jpg"
      },
      {
        name: "море.jpg",
        url: "https://live.staticflickr.com/65535/50339930638_41a205fcab_c.jpg"
      },
      {
        name: "город.jpg",
        url: "https://live.staticflickr.com/65535/50337310643_de579e4bb1_c.jpg"
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
        url: "https://live.staticflickr.com/65535/50339368162_ddc568be3e_c.jpg"
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
        url: "https://live.staticflickr.com/65535/50339368162_ddc568be3e_c.jpg"
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
        url: "https://live.staticflickr.com/65535/50339368162_ddc568be3e_c.jpg"
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
];
