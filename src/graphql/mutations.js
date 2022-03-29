/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTrasaction = /* GraphQL */ `
  mutation CreateTrasaction(
    $input: CreateTrasactionInput!
    $condition: ModelTrasactionConditionInput
  ) {
    createTrasaction(input: $input, condition: $condition) {
      id
      prodname
      price
      qty
      totalprice
      sellername
      sellercontacts
      status
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateTrasaction = /* GraphQL */ `
  mutation UpdateTrasaction(
    $input: UpdateTrasactionInput!
    $condition: ModelTrasactionConditionInput
  ) {
    updateTrasaction(input: $input, condition: $condition) {
      id
      prodname
      price
      qty
      totalprice
      sellername
      sellercontacts
      status
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteTrasaction = /* GraphQL */ `
  mutation DeleteTrasaction(
    $input: DeleteTrasactionInput!
    $condition: ModelTrasactionConditionInput
  ) {
    deleteTrasaction(input: $input, condition: $condition) {
      id
      prodname
      price
      qty
      totalprice
      sellername
      sellercontacts
      status
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
