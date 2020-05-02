const journeys = require("../src/journeys");
const interrail = require("interrail");

jest.mock("interrail", () => ({
  journeys: jest.fn()
}));

describe("journeys", () => {
  describe("getJourneyDuration", () => {
    let nextMonday;
    beforeEach(() => {
      nextMonday = new Date("February 22, 2016 06:00:00");
    });
    it("should call api with correct parameters", async () => {
      mockResponse();
      mockDateNow();

      journeys.getJourneyDuration(123, 456);

      expect(interrail.journeys).toHaveBeenCalledWith(123, 456, {
        transfers: 0,
        results: 1,
        departureAfter: nextMonday
      });
    });

    it("should use next monday even if today is monday", async () => {
      mockResponse();
      mockDateNow(new Date("February 15, 2016 09:00:00"));

      journeys.getJourneyDuration(123, 456);

      expect(interrail.journeys).toHaveBeenCalledWith(123, 456, {
        transfers: 0,
        results: 1,
        departureAfter: nextMonday
      });
    });

    it("should return duration", async () => {
      mockResponse();
      const duration = await journeys.getJourneyDuration(123, 456);
      expect(duration).toEqual({ duration: 120 });
    });

    it("should return duration of 0 if response is empty", async () => {
      mockEmptyResponse();
      const duration = await journeys.getJourneyDuration(123, 456);
      expect(duration).toEqual({ duration: 0 });
    });
  });

  describe("captureConnection", () => {
    // TODO: write tests
  });
});

const mockResponse = () => {
  interrail.journeys.mockImplementation(
    jest.fn(() =>
      Promise.resolve([
        {
          legs: [
            {
              departure: "2020-03-22T16:15:00.000+01:00",
              arrival: "2020-03-22T18:15:00.000+01:00"
            }
          ]
        }
      ])
    )
  );
};

const mockDateNow = (now = null) => {
  if (!now) {
    now = new Date("February 15, 2016 09:00:00");
    const zeroToSix = Math.floor(Math.random() * 7);
    now.setDate(now.getDate() + zeroToSix);
  }

  jest.spyOn(global.Date, "now").mockImplementationOnce(() => now.valueOf());
};

const mockEmptyResponse = () => {
  interrail.journeys.mockImplementation(jest.fn(() => Promise.resolve([])));
};
