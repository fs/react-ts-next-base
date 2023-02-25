import * as Types from '../../types';

import { gql } from '@apollo/client';
import { ProductReviewsInfoFragmentDoc } from '../../fragments/__generated__/productReviewsInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ProductReviewsQueryVariables = Types.Exact<{
  productId: Types.Scalars['ID'];
  after?: Types.InputMaybe<Types.Scalars['String']>;
  before?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  last?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type ProductReviewsQuery = {
  __typename?: 'Query';
  productReviews: {
    __typename?: 'ProductReviewConnection';
    edges?: Array<{
      __typename?: 'ProductReviewEdge';
      cursor: string;
      node?: {
        __typename?: 'ProductReview';
        productBody: string;
        productRating: number;
        id: string;
        createdAt: any;
        product: {
          __typename?: 'Product';
          canAddToPriorityList: boolean;
          canRemoveFromPriorityList: boolean;
          prioritized: boolean;
          condition?: Types.ConditionEnum | null;
          dellinCourierAllowed: boolean;
          dellinDeliveryPointId?: string | null;
          dellinFreightTypeId?: string | null;
          description?: string | null;
          disablePickup: boolean;
          discountMethod: Types.DiscountMethodEnum;
          draft: boolean;
          draftStep?: Types.ProductDraftStepEnum | null;
          id: string;
          manufacturer?: string | null;
          name?: string | null;
          sdekCourierAllowed: boolean;
          sdekDeliveryPointId?: string | null;
          shipmentMethod: Types.ShipmentMethodEnum;
          status: Types.StatusEnum;
          template: boolean;
          deleted: boolean;
          vat: number;
          wholesaleLot?: number | null;
          favorite: boolean;
          favoritesCount: number;
          receivedReviewsCount: number;
          rating?: number | null;
          verificationDeadlineAt?: any | null;
          rejectsCount: number;
          rejectionMessage?: string | null;
          category?: {
            __typename?: 'Category';
            depth: number;
            id: string;
            name: string;
            position: number;
            parent?: {
              __typename?: 'Category';
              depth: number;
              id: string;
              name: string;
              position: number;
              parent?: {
                __typename?: 'Category';
                depth: number;
                id: string;
                name: string;
                position: number;
                parent?: {
                  __typename?: 'Category';
                  depth: number;
                  id: string;
                  name: string;
                  position: number;
                  canDestroy: {
                    __typename?: 'AuthorizationResult';
                    value: boolean;
                    message?: string | null;
                  };
                } | null;
                canDestroy: {
                  __typename?: 'AuthorizationResult';
                  value: boolean;
                  message?: string | null;
                };
              } | null;
              canDestroy: {
                __typename?: 'AuthorizationResult';
                value: boolean;
                message?: string | null;
              };
            } | null;
            canDestroy: {
              __typename?: 'AuthorizationResult';
              value: boolean;
              message?: string | null;
            };
          } | null;
          company: {
            __typename?: 'Company';
            id: string;
            inn: string;
            kpp: string;
            officialName: string;
            unofficialName: string;
            deliveredOrdersCount?: number | null;
            directorFullName: string;
            legalAddress: string;
            postcode: string;
            ogrn: string;
            oktmo: string;
            bankName: string;
            checkingAccount: string;
            correspondentAccount: string;
            bic: string;
            email: string;
            phoneNumber: string;
            direction: Types.CompanyDirectionEnum;
            logoUrl: string;
            main: boolean;
            rejectsCount: number;
            sellableProductsCount: number;
            status: Types.CompanyStatusEnum;
            taxationSystem?: Types.CompanyTaxationSystemEnum | null;
            rating?: number | null;
            receivedReviewsCount: number;
            createdAt: any;
            verificationDeadlineAt?: any | null;
            deletedAt?: any | null;
            deletionReason?: Types.CompanyDeletionReasonEnum | null;
            blacklistedAt?: any | null;
            legalForm: {
              __typename?: 'CompanyLegalForm';
              id: string;
              name: string;
              shortName: string;
            };
            companyConfirmationRecords: Array<{
              __typename?: 'ConfirmationRecord';
              id: string;
              attachmentUrl: string;
              originalFilename?: string | null;
            }>;
            companyMembers: Array<{
              __typename?: 'CompanyMember';
              id: string;
              user: { __typename?: 'User'; id: string };
              role: { __typename?: 'CompanyRole'; id: string; name: string };
            }>;
            myRole?: { __typename?: 'CompanyRole'; id: string; name: string } | null;
            rejectedFields: Array<{
              __typename?: 'CompanyRejectedField';
              comment: string;
              name: Types.CompanyFieldEnum;
            }>;
            lastEmployeeMembers: Array<{
              __typename?: 'CompanyMember';
              id: string;
              user: { __typename?: 'User'; id: string; email: string };
            }>;
          };
          companyLocation?: {
            __typename?: 'CompanyLocation';
            status: Types.CompanyLocationStatusEnum;
            address?: string | null;
            comment?: string | null;
            id: string;
            canBeDestroyed: boolean;
            canBeUpdated: boolean;
            main: boolean;
            phoneNumber?: string | null;
            postcode?: string | null;
            rejectionReason?: string | null;
            verificationDeadlineAt?: any | null;
            city: {
              __typename?: 'City';
              cityType: string;
              fiasId: string;
              id: string;
              kladrId: string;
              name: string;
              region: string;
            };
            companyLicenses: Array<{
              __typename?: 'CompanyLocationLicense';
              id: string;
              number: string;
              companyLicensePhotos?: Array<{
                __typename?: 'CompanyLicensePhoto';
                id: string;
                imageUrl: string;
              }> | null;
            }>;
            company: {
              __typename?: 'Company';
              id: string;
              officialName: string;
              unofficialName: string;
              legalForm: {
                __typename?: 'CompanyLegalForm';
                id: string;
                name: string;
                shortName: string;
              };
            };
          } | null;
          country?: { __typename?: 'Country'; id: string; name: string } | null;
          deliveryCondition?: {
            __typename?: 'DeliveryCondition';
            comment?: string | null;
            hazardClass?: string | null;
            id: string;
            insuranceRequired: boolean;
          } | null;
          periodDiscounts?: Array<{
            __typename?: 'PeriodDiscount';
            amount: number;
            endDate: any;
            id: string;
            startDate: any;
          }> | null;
          productConfirmationRecords: Array<{
            __typename?: 'ConfirmationRecord';
            attachmentUrl: string;
            originalFilename?: string | null;
            id: string;
          }>;
          productFreeDeliveries: Array<{
            __typename?: 'ProductFreeDelivery';
            id: string;
            minCost: number;
            minDays: number;
            maxDays: number;
            city: {
              __typename?: 'City';
              cityType: string;
              fiasId: string;
              id: string;
              kladrId: string;
              name: string;
              region: string;
            };
          }>;
          productPaidDeliveries: Array<{
            __typename?: 'ProductPaidDelivery';
            id: string;
            maxWeight: number;
            minWeight: number;
            price: number;
            minDays: number;
            maxDays: number;
            city: {
              __typename?: 'City';
              cityType: string;
              fiasId: string;
              id: string;
              kladrId: string;
              name: string;
              region: string;
            };
          }>;
          variants: Array<{
            __typename?: 'Variant';
            discount: number;
            discountPrice?: number | null;
            discountWholesalePrice?: number | null;
            expirationDate?: any | null;
            grossWeight?: number | null;
            height?: number | null;
            id: string;
            length?: number | null;
            minShipmentLot?: number | null;
            netWeight?: number | null;
            unitKind: Types.VariantUnitKindEnum;
            unitQuantity?: number | null;
            unitQuantityKind?: Types.VariantUnitQuantityKindEnum | null;
            price?: number | null;
            soldQuantity: number;
            stock?: number | null;
            wholesalePrice?: number | null;
            width?: number | null;
            currentPeriodDiscount?: {
              __typename?: 'PeriodDiscount';
              amount: number;
              endDate: any;
              id: string;
              startDate: any;
            } | null;
            currentWeeklyDiscount?: {
              __typename?: 'WeeklyDiscount';
              amount: number;
              id: string;
              weekday: Types.WeekdayEnum;
            } | null;
            deliveryCondition?: {
              __typename?: 'DeliveryCondition';
              comment?: string | null;
              hazardClass?: string | null;
              id: string;
              insuranceRequired: boolean;
            } | null;
            packingMaterial?: { __typename?: 'PackingMaterial'; id: string; name: string } | null;
            periodDiscounts?: Array<{
              __typename?: 'PeriodDiscount';
              amount: number;
              endDate: any;
              id: string;
              startDate: any;
            }> | null;
            variantCertificates: Array<{
              __typename?: 'VariantCertificate';
              id: string;
              attachmentUrl: string;
              originalFilename?: string | null;
            }>;
            variantInstructions: Array<{
              __typename?: 'VariantInstruction';
              id: string;
              attachmentUrl: string;
              originalFilename?: string | null;
            }>;
            variantPhotos: Array<{ __typename?: 'VariantPhoto'; id: string; imageUrl: string }>;
            variantProperties: Array<
              | {
                  __typename?: 'DictionaryVariantProperty';
                  id: string;
                  dictionaryPropertyOption: {
                    __typename?: 'DictionaryPropertyOption';
                    id: string;
                    name: string;
                  };
                  property:
                    | {
                        __typename?: 'DictionaryProperty';
                        id: string;
                        name: string;
                        displayName: string;
                      }
                    | {
                        __typename?: 'IntegerProperty';
                        unit?: string | null;
                        id: string;
                        name: string;
                        displayName: string;
                      }
                    | {
                        __typename?: 'StringProperty';
                        id: string;
                        name: string;
                        displayName: string;
                      };
                }
              | {
                  __typename?: 'IntegerVariantProperty';
                  integerValue: number;
                  id: string;
                  property:
                    | {
                        __typename?: 'DictionaryProperty';
                        id: string;
                        name: string;
                        displayName: string;
                      }
                    | {
                        __typename?: 'IntegerProperty';
                        unit?: string | null;
                        id: string;
                        name: string;
                        displayName: string;
                      }
                    | {
                        __typename?: 'StringProperty';
                        id: string;
                        name: string;
                        displayName: string;
                      };
                }
              | {
                  __typename?: 'StringVariantProperty';
                  stringValue: string;
                  id: string;
                  property:
                    | {
                        __typename?: 'DictionaryProperty';
                        id: string;
                        name: string;
                        displayName: string;
                      }
                    | {
                        __typename?: 'IntegerProperty';
                        unit?: string | null;
                        id: string;
                        name: string;
                        displayName: string;
                      }
                    | {
                        __typename?: 'StringProperty';
                        id: string;
                        name: string;
                        displayName: string;
                      };
                }
            >;
            weeklyDiscounts?: Array<{
              __typename?: 'WeeklyDiscount';
              amount: number;
              id: string;
              weekday: Types.WeekdayEnum;
            }> | null;
          }>;
          weeklyDiscounts?: Array<{
            __typename?: 'WeeklyDiscount';
            amount: number;
            id: string;
            weekday: Types.WeekdayEnum;
          }> | null;
        };
        variant: {
          __typename?: 'Variant';
          discount: number;
          discountPrice?: number | null;
          discountWholesalePrice?: number | null;
          expirationDate?: any | null;
          grossWeight?: number | null;
          height?: number | null;
          id: string;
          length?: number | null;
          minShipmentLot?: number | null;
          netWeight?: number | null;
          unitKind: Types.VariantUnitKindEnum;
          unitQuantity?: number | null;
          unitQuantityKind?: Types.VariantUnitQuantityKindEnum | null;
          price?: number | null;
          soldQuantity: number;
          stock?: number | null;
          wholesalePrice?: number | null;
          width?: number | null;
          currentPeriodDiscount?: {
            __typename?: 'PeriodDiscount';
            amount: number;
            endDate: any;
            id: string;
            startDate: any;
          } | null;
          currentWeeklyDiscount?: {
            __typename?: 'WeeklyDiscount';
            amount: number;
            id: string;
            weekday: Types.WeekdayEnum;
          } | null;
          deliveryCondition?: {
            __typename?: 'DeliveryCondition';
            comment?: string | null;
            hazardClass?: string | null;
            id: string;
            insuranceRequired: boolean;
          } | null;
          packingMaterial?: { __typename?: 'PackingMaterial'; id: string; name: string } | null;
          periodDiscounts?: Array<{
            __typename?: 'PeriodDiscount';
            amount: number;
            endDate: any;
            id: string;
            startDate: any;
          }> | null;
          variantCertificates: Array<{
            __typename?: 'VariantCertificate';
            id: string;
            attachmentUrl: string;
            originalFilename?: string | null;
          }>;
          variantInstructions: Array<{
            __typename?: 'VariantInstruction';
            id: string;
            attachmentUrl: string;
            originalFilename?: string | null;
          }>;
          variantPhotos: Array<{ __typename?: 'VariantPhoto'; id: string; imageUrl: string }>;
          variantProperties: Array<
            | {
                __typename?: 'DictionaryVariantProperty';
                id: string;
                dictionaryPropertyOption: {
                  __typename?: 'DictionaryPropertyOption';
                  id: string;
                  name: string;
                };
                property:
                  | {
                      __typename?: 'DictionaryProperty';
                      id: string;
                      name: string;
                      displayName: string;
                    }
                  | {
                      __typename?: 'IntegerProperty';
                      unit?: string | null;
                      id: string;
                      name: string;
                      displayName: string;
                    }
                  | {
                      __typename?: 'StringProperty';
                      id: string;
                      name: string;
                      displayName: string;
                    };
              }
            | {
                __typename?: 'IntegerVariantProperty';
                integerValue: number;
                id: string;
                property:
                  | {
                      __typename?: 'DictionaryProperty';
                      id: string;
                      name: string;
                      displayName: string;
                    }
                  | {
                      __typename?: 'IntegerProperty';
                      unit?: string | null;
                      id: string;
                      name: string;
                      displayName: string;
                    }
                  | {
                      __typename?: 'StringProperty';
                      id: string;
                      name: string;
                      displayName: string;
                    };
              }
            | {
                __typename?: 'StringVariantProperty';
                stringValue: string;
                id: string;
                property:
                  | {
                      __typename?: 'DictionaryProperty';
                      id: string;
                      name: string;
                      displayName: string;
                    }
                  | {
                      __typename?: 'IntegerProperty';
                      unit?: string | null;
                      id: string;
                      name: string;
                      displayName: string;
                    }
                  | {
                      __typename?: 'StringProperty';
                      id: string;
                      name: string;
                      displayName: string;
                    };
              }
          >;
          weeklyDiscounts?: Array<{
            __typename?: 'WeeklyDiscount';
            amount: number;
            id: string;
            weekday: Types.WeekdayEnum;
          }> | null;
        };
        seller: {
          __typename?: 'Company';
          id: string;
          inn: string;
          kpp: string;
          officialName: string;
          unofficialName: string;
          deliveredOrdersCount?: number | null;
          directorFullName: string;
          legalAddress: string;
          postcode: string;
          ogrn: string;
          oktmo: string;
          bankName: string;
          checkingAccount: string;
          correspondentAccount: string;
          bic: string;
          email: string;
          phoneNumber: string;
          direction: Types.CompanyDirectionEnum;
          logoUrl: string;
          main: boolean;
          rejectsCount: number;
          sellableProductsCount: number;
          status: Types.CompanyStatusEnum;
          taxationSystem?: Types.CompanyTaxationSystemEnum | null;
          rating?: number | null;
          receivedReviewsCount: number;
          createdAt: any;
          verificationDeadlineAt?: any | null;
          deletedAt?: any | null;
          deletionReason?: Types.CompanyDeletionReasonEnum | null;
          blacklistedAt?: any | null;
          legalForm: {
            __typename?: 'CompanyLegalForm';
            id: string;
            name: string;
            shortName: string;
          };
          companyConfirmationRecords: Array<{
            __typename?: 'ConfirmationRecord';
            id: string;
            attachmentUrl: string;
            originalFilename?: string | null;
          }>;
          companyMembers: Array<{
            __typename?: 'CompanyMember';
            id: string;
            user: { __typename?: 'User'; id: string };
            role: { __typename?: 'CompanyRole'; id: string; name: string };
          }>;
          myRole?: { __typename?: 'CompanyRole'; id: string; name: string } | null;
          rejectedFields: Array<{
            __typename?: 'CompanyRejectedField';
            comment: string;
            name: Types.CompanyFieldEnum;
          }>;
          lastEmployeeMembers: Array<{
            __typename?: 'CompanyMember';
            id: string;
            user: { __typename?: 'User'; id: string; email: string };
          }>;
        };
        buyer: {
          __typename?: 'Company';
          id: string;
          inn: string;
          kpp: string;
          officialName: string;
          unofficialName: string;
          deliveredOrdersCount?: number | null;
          directorFullName: string;
          legalAddress: string;
          postcode: string;
          ogrn: string;
          oktmo: string;
          bankName: string;
          checkingAccount: string;
          correspondentAccount: string;
          bic: string;
          email: string;
          phoneNumber: string;
          direction: Types.CompanyDirectionEnum;
          logoUrl: string;
          main: boolean;
          rejectsCount: number;
          sellableProductsCount: number;
          status: Types.CompanyStatusEnum;
          taxationSystem?: Types.CompanyTaxationSystemEnum | null;
          rating?: number | null;
          receivedReviewsCount: number;
          createdAt: any;
          verificationDeadlineAt?: any | null;
          deletedAt?: any | null;
          deletionReason?: Types.CompanyDeletionReasonEnum | null;
          blacklistedAt?: any | null;
          legalForm: {
            __typename?: 'CompanyLegalForm';
            id: string;
            name: string;
            shortName: string;
          };
          companyConfirmationRecords: Array<{
            __typename?: 'ConfirmationRecord';
            id: string;
            attachmentUrl: string;
            originalFilename?: string | null;
          }>;
          companyMembers: Array<{
            __typename?: 'CompanyMember';
            id: string;
            user: { __typename?: 'User'; id: string };
            role: { __typename?: 'CompanyRole'; id: string; name: string };
          }>;
          myRole?: { __typename?: 'CompanyRole'; id: string; name: string } | null;
          rejectedFields: Array<{
            __typename?: 'CompanyRejectedField';
            comment: string;
            name: Types.CompanyFieldEnum;
          }>;
          lastEmployeeMembers: Array<{
            __typename?: 'CompanyMember';
            id: string;
            user: { __typename?: 'User'; id: string; email: string };
          }>;
        };
      } | null;
    } | null> | null;
    pageInfo: { __typename?: 'PageInfo'; endCursor?: string | null; hasNextPage: boolean };
  };
};

export const ProductReviewsDocument = gql`
  query ProductReviews($productId: ID!, $after: String, $before: String, $first: Int, $last: Int) {
    productReviews(
      productId: $productId
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      edges {
        cursor
        node {
          ...ProductReviewsInfo
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ProductReviewsInfoFragmentDoc}
`;

/**
 * __useProductReviewsQuery__
 *
 * To run a query within a React component, call `useProductReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductReviewsQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useProductReviewsQuery(
  baseOptions: Apollo.QueryHookOptions<ProductReviewsQuery, ProductReviewsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProductReviewsQuery, ProductReviewsQueryVariables>(
    ProductReviewsDocument,
    options,
  );
}
export function useProductReviewsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProductReviewsQuery, ProductReviewsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProductReviewsQuery, ProductReviewsQueryVariables>(
    ProductReviewsDocument,
    options,
  );
}
export type ProductReviewsQueryHookResult = ReturnType<typeof useProductReviewsQuery>;
export type ProductReviewsLazyQueryHookResult = ReturnType<typeof useProductReviewsLazyQuery>;
export type ProductReviewsQueryResult = Apollo.QueryResult<
  ProductReviewsQuery,
  ProductReviewsQueryVariables
>;
