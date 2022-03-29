/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTrasaction = /* GraphQL */ `
  query GetTrasaction($id: ID!) {
    getTrasaction(id: $id) {
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
export const listTrasactions = /* GraphQL */ `
  query ListTrasactions(
    $filter: ModelTrasactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrasactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncTrasactions = /* GraphQL */ `
  query SyncTrasactions(
    $filter: ModelTrasactionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTrasactions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
