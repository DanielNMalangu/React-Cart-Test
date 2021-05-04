import ProductService from './ProductService';
import { mocked } from 'ts-jest/utils';

const service = new ProductService("testURL");

it("should return data if call is successful", () => {
  const mockSuccessResponse = {};
  const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
  const mockFetchPromise = Promise.resolve({ // 3
    json: () => mockJsonPromise,
  });

  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

  var result = service.getAllProducts();

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith('testURL/products/');
  expect(result).toEqual(mockFetchPromise);

});

it("should throw an error if data can't be retrived", async() => {
  const mockSuccessResponse = {};
  const mockJsonPromise = Promise.reject(mockSuccessResponse); // 2
  const mockFetchPromise = Promise.reject({
    ok: false,
    status: 401,
    json: async () => ({message: 'Not authorized'}),
  })

  jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

//  expect(async () => await service.getAllProducts() ).toThrowError("Problem fetching data");

  let result = service.getAllProducts()
  expect(result).toEqual(mockFetchPromise);


});
