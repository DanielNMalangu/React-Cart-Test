import ProductService from './ProductService';
import { mocked } from 'ts-jest/utils';


const workingService = new ProductService("https://fakestoreapi.com");
const brokenService = new ProductService("testURL");

it("should return data if call is successful", () => {
  const mockSuccessResponse = {};
  const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
  const mockFetchPromise = Promise.resolve({ // 3
    json: () => mockJsonPromise,
  });

  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

  var result = brokenService.getAllProducts();

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith('testURL/products/');
  expect(result).toEqual(mockFetchPromise);

});

/*
it("should throw an error if data can't be retrived", async() => {
  const mockSuccessResponse = {};
  const mockJsonPromise = Promise.reject(mockSuccessResponse); // 2
  const mockFetchPromise = Promise.reject({ // 3
    json: () => mockJsonPromise,
  });

  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

  expect(() => brokenService.getAllProducts() ).toThrowError(" Problem fetching data");


});
*/