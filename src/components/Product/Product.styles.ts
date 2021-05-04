import styled from 'styled-components';

export const ProductWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  max-height: 800px;
  border: 1px solid lightblue;
  border-radius: 20px;

  button {
    border-radius: 0 0 20px 20px;
  }

  img {
    height: 300px;
    max-width: 100%;
    object-fit: contain;
    border-radius: 20px 20px 0 0;
  }
  h3 {
    height; 100%
  }

  aside{
    width: 90%;
  }

  .title {
    height: 75px;
    overflow-y: auto;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .title::-webkit-scrollbar {
    display: none;
  }
  .description::-webkit-scrollbar {
    display: none;
  }
  
  
  /* Hide scrollbar for IE, Edge and Firefox */
  .example {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .description{
    height: 150px;
    text-overflow: ellipsis;
    overflow-y: auto;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  div {
    height: 100%;
  }
  .productFooter{
    padding-top: 20px;
    padding-bottom: 10px;
  }
`;
