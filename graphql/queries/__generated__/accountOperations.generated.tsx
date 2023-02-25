import * as Types from '../../types';

import { gql } from '@apollo/client';
import { OrderInfoFragmentDoc } from '../../fragments/__generated__/orderInfo.generated';
import { TransferInfoFragmentDoc } from '../../fragments/__generated__/transferInfo.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AccountOperationsQueryVariables = Types.Exact<{
  companyId: Types.Scalars['ID'];
  subjects?: Types.InputMaybe<
    Array<Types.AccountOperationSubjectEnum> | Types.AccountOperationSubjectEnum
  >;
  orderIds?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>;
  statuses?: Types.InputMaybe<
    Array<Types.AccountOperationStatusEnum> | Types.AccountOperationStatusEnum
  >;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  last?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  acceptedDate?: Types.InputMaybe<Types.DateRangeFilterInput>;
}>;

export type AccountOperationsQuery = {
  __typename?: 'Query';
  accountOperations: {
    __typename?: 'AccountOperationConnection';
    edges?: Array<{
      __typename?: 'AccountOperationEdge';
      cursor: string;
      node?: {
        __typename?: 'AccountOperation';
        id: string;
        acceptedAt?: any | null;
        amount: number;
        operationType: Types.AccountOperationTypeEnum;
        originId: string;
        originType: Types.AccountOperationOriginTypeEnum;
        status: Types.AccountOperationStatusEnum;
        subject: Types.AccountOperationSubjectEnum;
        origin:
          | {
              __typename?: 'Order';
              checkoutStatus: Types.OrderCheckoutStatusEnum;
              deliveryAddress?: string | null;
              deliveryMaxDate?: any | null;
              deliveryMethod: Types.DeliveryMethodEnum;
              deliveryMinDate?: any | null;
              deliveryPointId?: string | null;
              deliveryPrice: number;
              deliveryService?: Types.DeliveryServiceEnum | null;
              deletionReason?: Types.OrderDeletionReasonEnum | null;
              expiredAt?: any | null;
              id: string;
              itemPrice?: number | null;
              pickupDate?: any | null;
              placedAt?: any | null;
              quantity: number;
              executionStatus?: Types.OrderExecutionStatusEnum | null;
              reservationStatus?: Types.OrderReservationStatusEnum | null;
              discount: number;
              canLeaveReview: {
                __typename?: 'AuthorizationResult';
                message?: string | null;
                value: boolean;
                reasons?: {
                  __typename?: 'FailureReasons';
                  details: string;
                  fullMessages: Array<string>;
                } | null;
              };
              canRequestSupport: {
                __typename?: 'AuthorizationResult';
                message?: string | null;
                value: boolean;
                reasons?: {
                  __typename?: 'FailureReasons';
                  details: string;
                  fullMessages: Array<string>;
                } | null;
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
              companyReview?: {
                __typename?: 'CompanyReview';
                companyBody: string;
                companyRating: number;
                createdAt: any;
                id: string;
              } | null;
              contract?: { __typename?: 'OrderContract'; url: string } | null;
              invoices?: Array<{
                __typename?: 'OrderInvoice';
                invoiceType: Types.OrderInvoiceTypeEnum;
                url: string;
              }> | null;
              product: {
                __typename?: 'Product';
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
                rating?: number | null;
                receivedReviewsCount: number;
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
                weeklyDiscounts?: Array<{
                  __typename?: 'WeeklyDiscount';
                  amount: number;
                  id: string;
                  weekday: Types.WeekdayEnum;
                }> | null;
              };
              productReview?: {
                __typename?: 'ProductReview';
                createdAt: any;
                id: string;
                productBody: string;
                productRating: number;
              } | null;
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
              buyer?: {
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
              } | null;
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
                packingMaterial?: {
                  __typename?: 'PackingMaterial';
                  id: string;
                  name: string;
                } | null;
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
              periodDiscount?: {
                __typename?: 'PeriodDiscount';
                amount: number;
                endDate: any;
                id: string;
                startDate: any;
              } | null;
              weeklyDiscount?: {
                __typename?: 'WeeklyDiscount';
                amount: number;
                id: string;
                weekday: Types.WeekdayEnum;
              } | null;
              dispute?: {
                __typename?: 'Dispute';
                comment?: string | null;
                createdAt: any;
                id: string;
                productDelivered: boolean;
                reason: Types.DisputeReasonEnum;
                returnShipmentDeadlineAt?: any | null;
                status: Types.DisputeStatusEnum;
                medagregatorResponseDeadlineAt?: any | null;
                acceptedProposal?: {
                  __typename?: 'DisputeProposal';
                  comment?: string | null;
                  createdAt: any;
                  deliveryReturnAmount?: number | null;
                  id: string;
                  originator: Types.DisputeProposalOriginatorEnum;
                  productReturnAmount: number;
                  returnPayer?: Types.DisputeProposalReturnPayerEnum | null;
                  returnQuantity?: number | null;
                  returnRequired: boolean;
                  status: Types.DisputeProposalStatusEnum;
                } | null;
                attachments: Array<{
                  __typename?: 'DisputeAttachment';
                  attachmentUrl: string;
                  originalFilename?: string | null;
                  id: string;
                }>;
                canCancel: {
                  __typename?: 'AuthorizationResult';
                  message?: string | null;
                  value: boolean;
                  reasons?: {
                    __typename?: 'FailureReasons';
                    details: string;
                    fullMessages: Array<string>;
                  } | null;
                };
                canCreateProposal: {
                  __typename?: 'AuthorizationResult';
                  message?: string | null;
                  value: boolean;
                  reasons?: {
                    __typename?: 'FailureReasons';
                    details: string;
                    fullMessages: Array<string>;
                  } | null;
                };
                canAcceptProposal: {
                  __typename?: 'AuthorizationResult';
                  message?: string | null;
                  value: boolean;
                  reasons?: {
                    __typename?: 'FailureReasons';
                    details: string;
                    fullMessages: Array<string>;
                  } | null;
                };
                canCreateReturnedShipment: {
                  __typename?: 'AuthorizationResult';
                  message?: string | null;
                  value: boolean;
                  reasons?: {
                    __typename?: 'FailureReasons';
                    details: string;
                    fullMessages: Array<string>;
                  } | null;
                };
                canReceiveReturnedShipment: {
                  __typename?: 'AuthorizationResult';
                  message?: string | null;
                  value: boolean;
                  reasons?: {
                    __typename?: 'FailureReasons';
                    details: string;
                    fullMessages: Array<string>;
                  } | null;
                };
                canRequestSupport: {
                  __typename?: 'AuthorizationResult';
                  message?: string | null;
                  value: boolean;
                  reasons?: {
                    __typename?: 'FailureReasons';
                    details: string;
                    fullMessages: Array<string>;
                  } | null;
                };
                canViewProposals: {
                  __typename?: 'AuthorizationResult';
                  message?: string | null;
                  value: boolean;
                  reasons?: {
                    __typename?: 'FailureReasons';
                    details: string;
                    fullMessages: Array<string>;
                  } | null;
                };
                lastBuyerProposal?: {
                  __typename?: 'DisputeProposal';
                  comment?: string | null;
                  createdAt: any;
                  deliveryReturnAmount?: number | null;
                  id: string;
                  originator: Types.DisputeProposalOriginatorEnum;
                  productReturnAmount: number;
                  returnPayer?: Types.DisputeProposalReturnPayerEnum | null;
                  returnQuantity?: number | null;
                  returnRequired: boolean;
                  status: Types.DisputeProposalStatusEnum;
                } | null;
                lastSellerProposal?: {
                  __typename?: 'DisputeProposal';
                  comment?: string | null;
                  createdAt: any;
                  deliveryReturnAmount?: number | null;
                  id: string;
                  originator: Types.DisputeProposalOriginatorEnum;
                  productReturnAmount: number;
                  returnPayer?: Types.DisputeProposalReturnPayerEnum | null;
                  returnQuantity?: number | null;
                  returnRequired: boolean;
                  status: Types.DisputeProposalStatusEnum;
                } | null;
                returnedShipment?: {
                  __typename?: 'ReturnedShipment';
                  endDate: any;
                  id: string;
                  rejectComment?: string | null;
                  startDate: any;
                  status: Types.ReturnedShipmentStatusEnum;
                  attachments: Array<{
                    __typename?: 'ReturnedShipmentAttachment';
                    attachmentUrl: string;
                    originalFilename?: string | null;
                    id: string;
                  }>;
                  canConfirm: {
                    __typename?: 'AuthorizationResult';
                    message?: string | null;
                    value: boolean;
                    reasons?: {
                      __typename?: 'FailureReasons';
                      fullMessages: Array<string>;
                      details: string;
                    } | null;
                  };
                  canReject: {
                    __typename?: 'AuthorizationResult';
                    message?: string | null;
                    value: boolean;
                    reasons?: {
                      __typename?: 'FailureReasons';
                      details: string;
                      fullMessages: Array<string>;
                    } | null;
                  };
                  canUpdate: {
                    __typename?: 'AuthorizationResult';
                    message?: string | null;
                    value: boolean;
                    reasons?: {
                      __typename?: 'FailureReasons';
                      details: string;
                      fullMessages: Array<string>;
                    } | null;
                  };
                } | null;
              } | null;
            }
          | {
              __typename?: 'Transfer';
              amount: number;
              applicationUrl: string;
              createdAt: any;
              id: string;
              transferType: Types.TransferTypeEnum;
              vat: number;
              vatType: Types.TransferVatTypeEnum;
              accountOperation: {
                __typename?: 'AccountOperation';
                status: Types.AccountOperationStatusEnum;
              };
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
              invoice?: { __typename?: 'TransferInvoice'; url: string } | null;
            };
      } | null;
    } | null> | null;
    pageInfo: { __typename?: 'PageInfo'; endCursor?: string | null; hasNextPage: boolean };
  };
};

export const AccountOperationsDocument = gql`
  query AccountOperations(
    $companyId: ID!
    $subjects: [AccountOperationSubjectEnum!]
    $orderIds: [ID!]
    $statuses: [AccountOperationStatusEnum!]
    $first: Int
    $last: Int
    $after: String
    $acceptedDate: DateRangeFilterInput
  ) {
    accountOperations(
      companyId: $companyId
      acceptedDate: $acceptedDate
      subjects: $subjects
      statuses: $statuses
      orderIds: $orderIds
      first: $first
      last: $last
      after: $after
    ) {
      edges {
        cursor
        node {
          id
          acceptedAt
          amount
          operationType
          originId
          originType
          status
          subject
          origin {
            ... on Order {
              ...OrderInfo
            }
            ... on Transfer {
              ...TransferInfo
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${OrderInfoFragmentDoc}
  ${TransferInfoFragmentDoc}
`;

/**
 * __useAccountOperationsQuery__
 *
 * To run a query within a React component, call `useAccountOperationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountOperationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountOperationsQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      subjects: // value for 'subjects'
 *      orderIds: // value for 'orderIds'
 *      statuses: // value for 'statuses'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      after: // value for 'after'
 *      acceptedDate: // value for 'acceptedDate'
 *   },
 * });
 */
export function useAccountOperationsQuery(
  baseOptions: Apollo.QueryHookOptions<AccountOperationsQuery, AccountOperationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AccountOperationsQuery, AccountOperationsQueryVariables>(
    AccountOperationsDocument,
    options,
  );
}
export function useAccountOperationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AccountOperationsQuery,
    AccountOperationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AccountOperationsQuery, AccountOperationsQueryVariables>(
    AccountOperationsDocument,
    options,
  );
}
export type AccountOperationsQueryHookResult = ReturnType<typeof useAccountOperationsQuery>;
export type AccountOperationsLazyQueryHookResult = ReturnType<typeof useAccountOperationsLazyQuery>;
export type AccountOperationsQueryResult = Apollo.QueryResult<
  AccountOperationsQuery,
  AccountOperationsQueryVariables
>;
