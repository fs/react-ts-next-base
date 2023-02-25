import { KeyArgsFunction } from '@apollo/client/cache/inmemory/policies';
import { keys, omit } from 'lodash';
import { FieldMergeFunction } from '@apollo/client';

import { PageInfo } from './types';
import clientSideState from '../clientSideState/clientSideState';

const notMergedQueries = ['companyLocations', 'deliveryPoints'];

const mergedQueries = [
  'myProducts',
  'products',
  'favoriteProducts',
  'productReviews',
  'accountOperations',
  'customerOrders',
  'customerAccountOperations',
  'transfers',
  'companies',
  'myCompanies',
  'customerCompanies',
  'users',
  'customerProducts',
  'orders',
  'companiesReviews',
  'productsReviews',
  'sellerProductReviews',
  'sellerCompanyReviews',
  'buyerProductReviews',
  'buyerCompanyReviews',
  'customerCompanyLocations',
  'properties',
  'disputeProposals',
];

const keyArgsFunction: KeyArgsFunction = args =>
  keys(omit(args, ['first', 'last', 'after', 'before']));

const mergeFunction: FieldMergeFunction = (
  existing = { edges: [] },
  incoming: { pageInfo: PageInfo; edges: [] },
  options: { args: { after?: string } | null },
) => {
  return {
    ...incoming,
    edges: options.args?.after ? [...existing.edges, ...incoming.edges] : incoming.edges,
    pageInfo: incoming.pageInfo,
  };
};

const mergeFieldOptions = {
  keyArgs: keyArgsFunction,
  merge: mergeFunction,
};

export const apolloPolicies = {
  typePolicies: {
    Product: {
      fields: {
        productFreeDeliveries: {
          merge: false,
        },
        productPaidDeliveries: {
          merge: false,
        },
        periodDiscounts: {
          merge: false,
        },
        weeklyDiscounts: {
          merge: false,
        },
        variants: {
          merge: false,
        },
      },
    },
    Variant: {
      fields: {
        variantProperties: {
          merge: false,
        },
        variantPhotos: {
          merge: false,
        },
        variantCertificates: {
          merge: false,
        },
        variantInstructions: {
          merge: false,
        },
      },
    },
    User: {
      fields: {
        companyMembers: {
          merge: false,
        },
      },
    },
    Order: {
      fields: {
        invoices: {
          merge: false,
        },
      },
    },
    ReturnedShipment: {
      fields: {
        attachments: {
          merge: false,
        },
      },
    },
    Company: {
      fields: {
        companyMembers: {
          merge: false,
        },
        lastEmployeeMembers: {
          merge: false,
        },
        companyConfirmationRecords: {
          merge: false,
        },
        rejectedFields: {
          merge: false,
        },
      },
    },
    CurrentUser: {
      fields: {
        menuItems: {
          merge: false,
        },
      },
    },
    Query: {
      fields: {
        ...notMergedQueries.reduce(
          (acc: { [key: string]: { merge: boolean } }, curr) => ({
            ...acc,
            [curr]: { merge: false },
          }),
          {},
        ),
        ...mergedQueries.reduce(
          (acc: { [key: string]: typeof mergeFieldOptions }, curr) => ({
            ...acc,
            [curr]: mergeFieldOptions,
          }),
          {},
        ),
        ...clientSideState,
      },
    },
    CompanyLocation: {
      fields: {
        companyLicenses: {
          merge: false,
        },
      },
    },
  },
};
