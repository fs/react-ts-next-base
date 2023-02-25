import { VariantUnitKindEnum, VariantUnitQuantityKindEnum } from 'graphql/types';
import plural from 'plural-ru';

export const humanizeUnitQuantityKind = (
  unitQuantityKind: VariantUnitQuantityKindEnum,
  unitQuantity: number,
) =>
  unitQuantityKind && unitQuantityKind === VariantUnitQuantityKindEnum.Pair
    ? (plural(unitQuantity, 'пара', 'пары', 'пар') as 'пара' | 'пары' | 'пар')
    : 'шт.';

export const humanizeUnitKind = (unitKind: VariantUnitKindEnum | undefined) =>
  unitKind === VariantUnitKindEnum.Pack ? 'уп.' : 'шт.';
