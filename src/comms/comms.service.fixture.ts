export const exampleCat1 = {
  name: 'Frederick',
  subscriptionActive: true,
  breed: 'Himalayan',
  pouchSize: 'C',
};

export const exampleCat2 = {
  name: 'Felix',
  subscriptionActive: true,
  breed: 'Siamese',
  pouchSize: 'F',
};

export const exampleCat3 = {
  name: 'Betsy',
  subscriptionActive: true,
  breed: 'Savannah',
  pouchSize: 'E',
};

export const exampleUser = {
  id: '618f4ed6-1c5b-4993-a149-f64700bf31dd',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john-doe@hotmail.com',
  cats: [exampleCat1],
};

export const exampleUserWithTwoCats = {
  id: '618f4ed6-1c5b-4993-a149-f64700bf31dd',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john-doe@hotmail.com',
  cats: [exampleCat1, exampleCat2],
};

export const exampleUserWithThreeCats = {
  id: '618f4ed6-1c5b-4993-a149-f64700bf31dd',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john-doe@hotmail.com',
  cats: [exampleCat1, exampleCat2, exampleCat3],
};
