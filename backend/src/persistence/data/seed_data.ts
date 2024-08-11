export const userData = [
  {
    name: "admin",
    role: "admin",
    email: "admin@gmail.com",
    password: "password",
  },
  {
    name: "member",
    role: "member",
    email: "member@gmail.com",
    password: "password",
    memberDetail: {
      birthDate: "2005-06-07",
      gender: "male",
      address: [
        {
          city: "West Sebastian",
          zip: "38930",
          street: "Street",
          state: "New Hampshire",
        },
      ],
      phoneNumber: "0889000000",
    },
    profile: "default/profile.jpg",
  },
  {
    name: "memmberActive",
    role: "member",
    email: "member_active@gmail.com",
    password: "password",
    memberDetail: {
      birthDate: "2005-06-07",
      gender: "female",
      address: [
        {
          city: "West Sebastian",
          zip: "38930",
          street: "Street",
          state: "New Hampshire",
        },
      ],
      phoneNumber: "0889000000",
    },
    profile: "default/profile.jpg",
  },
  {
    name: "trainer",
    role: "trainer",
    email: "trainer@gmail.com",
    password: "password",
    trainerDetail: {
      identificationNumber: "92849083499",
      gender: "male",
      address: [
        {
          city: "West Sebastian",
          zip: "38930",
          street: "Street",
          state: "New Hampshire",
        },
      ],
      bank: "Isekai Bank",
      bankNumber: 989099320393,
      phoneNumber: "0878983409",
    },
  },
];
