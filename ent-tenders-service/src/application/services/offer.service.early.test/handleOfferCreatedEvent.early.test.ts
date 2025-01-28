// Unit tests for: handleOfferCreatedEvent

import { OfferService } from "../offer.service";

// Mock classes
class MockUser {
  public offers: any[] = [];
}

class MockITenderRepository {
  public findById = jest.fn();
  public updateOffers = jest.fn();
}

class MockUserEvents {
  public static onUserOffersUpdated = jest.fn();
}

describe("OfferService.handleOfferCreatedEvent() handleOfferCreatedEvent method", () => {
  let mockTenderRepo: MockITenderRepository;
  let offerService: OfferService;

  beforeEach(() => {
    mockTenderRepo = new MockITenderRepository() as any;
    offerService = new OfferService(mockTenderRepo as any);
  });

  // Happy Path Tests
  it("should add a new offer to the user and update the repository", async () => {
    // Arrange
    const offerId = "offer123";
    const userId = "user123";
    const mockUser = new MockUser();
    jest.mocked(mockTenderRepo.findById).mockResolvedValue(mockUser as any);
    jest.mocked(MockUserEvents.onUserOffersUpdated).mockResolvedValue(undefined);

    // Act
    await offerService.handleOfferCreatedEvent(offerId, userId);

    // Assert
    expect(mockTenderRepo.updateOffers).toHaveBeenCalledWith(mockUser, [expect.any(Object)]);
    expect(MockUserEvents.onUserOffersUpdated).toHaveBeenCalledWith(mockUser);
  });

  it("should not add an offer if it already exists", async () => {
    // Arrange
    const offerId = "offer123";
    const userId = "user123";
    const mockUser = new MockUser();
    mockUser.offers.push(offerId);
    jest.mocked(mockTenderRepo.findById).mockResolvedValue(mockUser as any);
    jest.mocked(MockUserEvents.onUserOffersUpdated).mockResolvedValue(undefined);

    // Act
    await offerService.handleOfferCreatedEvent(offerId, userId);

    // Assert
    expect(mockTenderRepo.updateOffers).not.toHaveBeenCalled();
    expect(MockUserEvents.onUserOffersUpdated).toHaveBeenCalledWith(mockUser);
  });

  // Edge Case Tests
  it("should handle a user with no offers gracefully", async () => {
    // Arrange
    const offerId = "offer123";
    const userId = "user123";
    const mockUser = new MockUser();
    jest.mocked(mockTenderRepo.findById).mockResolvedValue(mockUser as any);
    jest.mocked(MockUserEvents.onUserOffersUpdated).mockResolvedValue(undefined);

    // Act
    await offerService.handleOfferCreatedEvent(offerId, userId);

    // Assert
    expect(mockTenderRepo.updateOffers).toHaveBeenCalledWith(mockUser, [expect.any(Object)]);
    expect(MockUserEvents.onUserOffersUpdated).toHaveBeenCalledWith(mockUser);
  });

  it("should throw an error if the user is not found", async () => {
    // Arrange
    const offerId = "offer123";
    const userId = "user123";
    jest.mocked(mockTenderRepo.findById).mockResolvedValue(null);

    // Act & Assert
    await expect(offerService.handleOfferCreatedEvent(offerId, userId)).rejects.toThrow("User not found");
  });
});

// End of unit tests for: handleOfferCreatedEvent
