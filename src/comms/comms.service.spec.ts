import { CommsService } from './comms.service';
import {
  exampleUser,
  exampleUserWithThreeCats,
  exampleUserWithTwoCats,
} from './comms.service.fixture';

describe('CommsService', () => {
  const commsService = new CommsService();

  describe('getUser', () => {
    it('should return the user object for the associated user id', () => {
      expect(
        commsService.getUser('618f4ed6-1c5b-4993-a149-f64700bf31dd'),
      ).toEqual({
        id: '618f4ed6-1c5b-4993-a149-f64700bf31dd',
        firstName: 'Cordell',
        lastName: 'Koepp-Torphy',
        email: 'Cordell.Koepp-Torphy23@hotmail.com',
        cats: [
          {
            name: 'Betsy',
            subscriptionActive: true,
            breed: 'Savannah',
            pouchSize: 'E',
          },
        ],
      });
    });

    it('should return undefined for non existing user', () => {
      expect(commsService.getUser('non-existing-user-id')).toBe(undefined);
    });
  });

  describe('getUserCatNames', () => {
    it('should return a string of cat names (1) formatted in a grammatically correct manner', () => {
      expect(commsService.getUserCatNames(exampleUser)).toEqual('Frederick');
    });

    it('should return a string of cat names (2) formatted in a grammatically correct manner', () => {
      expect(commsService.getUserCatNames(exampleUserWithTwoCats)).toEqual(
        'Felix and Frederick',
      );
    });

    it('should return a string of cat names (3) formatted in a grammatically correct manner', () => {
      expect(commsService.getUserCatNames(exampleUserWithThreeCats)).toEqual(
        'Betsy, Felix and Frederick',
      );
    });
  });

  describe('getNextOrderTotalPrice', () => {
    it('should return the total price of the next order for the user (one cat)', () => {
      expect(commsService.getNextOrderTotalPrice(exampleUser)).toEqual(6275);
    });

    it('should return the total price of the next order for the user (two cats)', () => {
      expect(
        commsService.getNextOrderTotalPrice(exampleUserWithTwoCats),
      ).toEqual(13400);
    });

    it('should return the total price of the next order for the user (three cats)', () => {
      expect(
        commsService.getNextOrderTotalPrice(exampleUserWithThreeCats),
      ).toEqual(20300);
    });
  });

  describe('formatPrice', () => {
    it('should return the total price formatted in GBP (1)', () => {
      expect(commsService.formatPrice(100)).toEqual('£1.00');
    });

    it('should return the total price formatted in GBP (2)', () => {
      expect(commsService.formatPrice(1050)).toEqual('£10.50');
    });

    it('should return the total price formatted in GBP (3)', () => {
      expect(commsService.formatPrice(9999)).toEqual('£99.99');
    });
  });
});
