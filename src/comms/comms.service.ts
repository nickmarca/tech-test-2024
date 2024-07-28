import { Injectable } from '@nestjs/common';
import * as users from '../../data.json';
import { POUCH_SIZE_PRICES } from './constants';

type User = (typeof users)[number];
type PouchSize = keyof typeof POUCH_SIZE_PRICES;

@Injectable()
export class CommsService {
  getUser(userId: string) {
    return users.find((user) => user.id === userId);
  }

  getUserCatNames(user: User) {
    return this.join(
      user.cats
        .filter(({ subscriptionActive }) => subscriptionActive)
        .map((cat) => cat.name)
        .sort(),
    );
  }

  getNextOrderTotalPrice(user: User) {
    return user.cats
      .filter(({ subscriptionActive }) => subscriptionActive)
      .reduce(
        (acc, cat) => acc + POUCH_SIZE_PRICES[cat.pouchSize as PouchSize],
        0,
      );
  }

  formatPrice(price: number) {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(price / 100);
  }

  private join(catNames: string[]) {
    if (catNames.length === 0) {
      return '';
    }
    if (catNames.length === 1) {
      return catNames[0];
    }
    if (catNames.length === 2) {
      return catNames.join(' and ');
    }

    const lastElement = catNames.pop();
    return `${catNames.join(', ')} and ${lastElement}`;
  }
}
