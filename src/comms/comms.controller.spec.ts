import { CommsController } from './comms.controller';
import { CommsService } from './comms.service';

describe('CommsController', () => {
  let commsController: CommsController;
  let commsService: CommsService;

  beforeEach(() => {
    commsService = new CommsService();
    commsController = new CommsController(commsService);
  });

  describe('getYourNextDelivery', () => {
    it('should return the correct response for a valid user id (1)', () => {
      const response = commsController.getYourNextDelivery(
        '618f4ed6-1c5b-4993-a149-f64700bf31dd',
      );
      expect(response).toEqual({
        title: 'Your next delivery for Betsy',
        message: `Hey Cordell! In two days' time, we'll be charging you for your next order for Betsy's fresh food.`,
        totalPrice: '£69.00',
        freeGift: false,
      });
    });

    it('should return the correct response for a valid user id (2)', () => {
      const response = commsController.getYourNextDelivery(
        '76d6eb8d-5c2e-49f7-b798-d69700dda4c3',
      );

      expect(response).toEqual({
        title: 'Your next delivery for Alexandre and Destiny',
        message:
          "Hey Dolores! In two days' time, we'll be charging you for your next order for Alexandre and Destiny's fresh food.",
        totalPrice: '£126.75',
        freeGift: true,
      });
    });

    it('should return not found for a non existing user id', () => {
      expect(() =>
        commsController.getYourNextDelivery(
          '618f4ed6-1c5b-4993-a149-f64700bf31d0',
        ),
      ).toThrow('User with ID 618f4ed6-1c5b-4993-a149-f64700bf31d0 not found');
    });

    it('should return bad request if validation fails', () => {
      expect(() =>
        commsController.getYourNextDelivery('bad-formatted-user-id'),
      ).toThrow('User ID bad-formatted-user-id is not a valid UUID');
    });
  });
});
