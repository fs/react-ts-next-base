import { Page } from '@playwright/test';

type TChooseFile = {
  page: Page;
  selector: string;
  filePath: string;
};

export const chooseFile = async ({ page, selector, filePath }: TChooseFile) => {
  const [fileChooser] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.locator(selector).click(),
  ]);
  await fileChooser.setFiles(filePath);
};
