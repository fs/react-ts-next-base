import { expect, Page } from '@playwright/test';
import { chooseFile } from './fileChooser';
import { closeNotification } from './notification';

import { TCompany } from '../fixtures/company';
import { TLocation } from '../fixtures/location';

type TCreateCompany = {
  page: Page;
  company: TCompany;
  timestamp: number;
};

type TCreateCompanyBuyer = TCreateCompany & {
  isFromCart: boolean;
  route: string;
};

type TCreateCompanyLocation = {
  page: Page;
  location: TLocation;
  timestamp: number;
};

export const createCompany = async ({ page, company, timestamp }: TCreateCompany) => {
  const {
    legalFormId,
    inn,
    officialName,
    unofficialName,
    directorFullName,
    legalAddress,
    postcode,
    ogrn,
    kpp,
    oktmo,
    bankName,
    checkingAccount,
    correspondentAccount,
    bic,
    email,
    phoneNumber,
  } = company;
  await expect(page.locator('[data-cy=create-company-form]')).toBeVisible();

  await page
    .locator('[id=select-legalFormId]', {
      hasText: 'Выбрать организационно-правовую форму',
    })
    .click();
  await page
    .locator("[id^='react-select']")
    .locator("[id*='option']", { hasText: new RegExp(`^${legalFormId}$`) })
    .click();

  await page.locator('[data-cy=inn]').fill(inn);
  await page.locator('[data-cy=officialName]').fill(officialName + timestamp);
  await page.locator('[data-cy=unofficialName]').fill(unofficialName + timestamp);
  await page.locator('[data-cy=directorFullName]').fill(directorFullName);
  await page.locator('[data-cy=legalAddress]').fill(legalAddress + timestamp);
  await page.locator('[data-cy=postcode]').fill(postcode);
  await page.locator('[data-cy=kpp]').fill(kpp);
  await page.locator('[data-cy=ogrn]').fill(ogrn);
  await page.locator('[data-cy=oktmo]').fill(oktmo);
  await page.locator('[data-cy=bankName]').fill(bankName);
  await page.locator('[data-cy=checkingAccount]').fill(checkingAccount);
  await page.locator('[data-cy=correspondentAccount]').fill(correspondentAccount);
  await page.locator('[data-cy=bic]').fill(bic);
  await page.locator('[data-cy=email]').fill(email);
  await page.locator('[data-cy=phoneNumber]').fill(phoneNumber);
};

const loadLogoAndCheckAgreements = async (page: Page) => {
  // Add logo
  await page.locator('[data-cy=logo-company-modal-button]').click();
  await chooseFile({
    page,
    selector: '[data-cy=load-avatar-input]',
    filePath: './e2e/fixtures/images/logo.png',
  });
  await page.locator('[data-cy=crop-image-button]').click();

  await page.locator('[data-cy=agreement]').check();
  await page.locator('[data-cy=contract]').check();
  await page.locator('[data-cy=create-company-submit-button]').click();
};

export const createCompanySeller = async ({ page, company, timestamp }: TCreateCompany) => {
  await createCompany({ page, company, timestamp });
  await page
    .locator('[id=select-taxationSystem]', {
      hasText: 'Выбрать систему налогообложения',
    })
    .click();

  await page
    .locator("[id^='react-select']")
    .locator("[id*='option']", { hasText: new RegExp(`^${company.taxationSystem}$`) })
    .click();
  await page.locator('[data-cy=add-files-modal--companyConfirmationRecords]').click();
  await chooseFile({
    page,
    selector: '[data-cy=load-photo-input--add-files-modal--companyConfirmationRecords]',
    filePath: './e2e/fixtures/images/logo.png',
  });
  await page
    .locator('[data-cy=add-photo-submit-button--add-files-modal--companyConfirmationRecords]')
    .click();

  await page.locator('[data-cy=add-files-modal--companyConfirmationRecords]').click();
  await chooseFile({
    page,
    selector: '[data-cy=load-photo-input--add-files-modal--companyConfirmationRecords]',
    filePath: './e2e/fixtures/videos/video.mov',
  });
  await page
    .locator('[data-cy=add-photo-submit-button--add-files-modal--companyConfirmationRecords]')
    .click();

  await expect(
    page.locator('[data-cy=list-photos-companyConfirmationRecords]').locator('img[data-cy^=photo]'),
  ).toHaveCount(1);

  await expect(
    page.locator('[data-cy=list-photos-companyConfirmationRecords]').locator('[data-cy^=video]'),
  ).toHaveCount(1);

  await loadLogoAndCheckAgreements(page);

  await closeNotification({ page, text: 'Компания успешно создана' });
  await expect(page).toHaveURL(new RegExp(`/addresses`));
};

export const createCompanyBuyer = async ({
  page,
  company,
  timestamp,
  route,
  isFromCart,
}: TCreateCompanyBuyer) => {
  await createCompany({ page, company, timestamp });
  await loadLogoAndCheckAgreements(page);

  if (isFromCart) await page.locator('[data-testid="confirm-modal-button"]').click();
  await closeNotification({ page, text: 'Компания успешно создана' });
  await expect(page).toHaveURL(new RegExp(route));
};

export const createCompanyLocation = async ({
  page,
  location,
  timestamp,
}: TCreateCompanyLocation) => {
  const { address, city, phoneNumber, postalCode, comment, licenseNumber } = location;
  await page.locator('[data-cy=company-location-phoneNumber]').fill(phoneNumber);
  await page.locator('[data-cy=company-location-comment]').fill(comment + timestamp);
  await page.locator('[data-cy=add-license-button]').click();
  await page.locator('[data-cy="companyLicenses.0.number"]').fill(licenseNumber + timestamp);

  await page.locator('[data-cy=photo-license-modal-button]').click();
  await chooseFile({
    page,
    selector: '[data-cy=load-photo-input--photo-license-modal-button]',
    filePath: './e2e/fixtures/images/logo.png',
  });

  await page.locator('[data-cy=add-photo-submit-button--photo-license-modal-button]').click();

  await expect(page.locator('[data-testid=add-photo-loader]')).toHaveCount(0);

  await page.locator('div[id=cityId]').click();

  await page.locator('input[type="text"]').first().fill(city);

  await page
    .locator("[id^='react-select']")
    .locator("[id*='option']", { hasText: new RegExp(`^${city}$`) })
    .click();

  await page.locator('[data-cy=company-location-address]').fill(address);

  await page.locator('[data-cy=company-location-postcode]').fill(postalCode);

  await page.locator('[data-cy=company-location-submit-button]').click();

  await closeNotification({ page, text: 'Адрес успешно создан' });
};

export const destroyCompanyLocation = async ({ page }: { page: Page }) => {
  await page.locator('[data-cy=destroy-location-button]').click();

  await expect(
    page.locator('[data-cy=simple-modal-title]', { hasText: 'Удаление адреса' }),
  ).toBeVisible();

  await page.locator('[data-cy=confirm-modal-button]').click();

  await closeNotification({ page, text: 'Адрес успешно удален' });
};
