import { DisputeFragment } from 'graphql/fragments/__generated__/disputeInfo.generated';
import { OrderInfoFragment } from 'graphql/fragments/__generated__/orderInfo.generated';
import { CompanyInfoFragment } from 'graphql/fragments/__generated__/companyInfo.generated';
import { EVariant } from '../../types';

export type TActionsButtons = {
  order: OrderInfoFragment;
  isDetailed: boolean;
  refetchOrders?: () => void;
  isUserBuyer?: boolean;
  companyId?: string;
  variant: `${EVariant}`;
};

export type TDeleteOrderButton = {
  orderId: string;
  sellerName: string;
  isDetailed: boolean;
};

export type TConfirmOrderPaymentButton = {
  orderId: string;
  isDetailed: boolean;
};

export type TCancelDisputeButton = {
  dispute: DisputeFragment;
  orderId: string;
  refetchOrders: () => void;
};

export type TFinishOrderDeliveryButton = {
  orderId: string;
};

export type TPlaceOrderButton = {
  orderId: string;
  buyer?: CompanyInfoFragment | null;
};

export type TReceiveReturnedShipmentButton = {
  dispute: DisputeFragment;
  refetchOrders: () => void;
};

export type TShowReviewDetails = {
  order: OrderInfoFragment;
};

export type TCancelReservedOrderButton = {
  orderId: string;
};
