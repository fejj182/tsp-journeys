const journeys = require('../src/journeys')
const interrail = require('interrail')

jest.mock('interrail', () => ({
    journeys: jest.fn()
}))

describe('journeys', () => {
    describe('getJourneyDuration', () => {
        it('should call api with correct parameters', async () => {
            mockResponse()
            journeys.getJourneyDuration(123, 456);
            expect(interrail.journeys).toHaveBeenCalledWith(123, 456, { transfers: 0, results: 1 });
        });

        it('should return duration', async () => {
            mockResponse()
            const duration = await journeys.getJourneyDuration(123, 456);
            expect(duration).toEqual({ duration: 120 })
        });

        it('should return duration of 0 if response is empty', async () => {
            mockEmptyResponse()
            const duration = await journeys.getJourneyDuration(123, 456);
            expect(duration).toEqual({ duration: 0 })
        });
    });
});

const mockResponse = () => {
    interrail.journeys.mockImplementation(jest.fn(() => Promise.resolve([
        {
            legs: [{
                departure: "2020-03-22T16:15:00.000+01:00",
                arrival: "2020-03-22T18:15:00.000+01:00", 
            }]
        }
    ])))
}

const mockEmptyResponse = () => {
    interrail.journeys.mockImplementation(jest.fn(() => Promise.resolve([])))
}