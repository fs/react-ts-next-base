/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useState } from 'react';
import { Formik, Form as FormikForm } from 'formik';

import useNotifier from 'hooks/useNotifier';
import Button from 'components/shared/atoms/Button';
import Checkbox from 'components/shared/atoms/Checkbox';
import { useUpdateUserMenuItems } from 'lib/apollo/hooks/actions/currentUser';
import MenuLinks from './MenuLinks';

import { Row, AdditionalMenuLinks, MenuTitle, AdditionalMenuTitle } from './styled';

const MenuSettings = ({ links, additionalLinks, setIsSidebarSettingsActive }) => {
  const { setError } = useNotifier();
  const [updateUserMenuItems] = useUpdateUserMenuItems();

  const [additionalLinksState, setAdditionalLinksState] = useState(additionalLinks);

  const saveNewMenuItems = async () => {
    const newMenuItems = Object.values(additionalLinksState).reduce((acc, customLink) => {
      const newAcc = [...acc];
      if (customLink.isSelected) {
        newAcc.push({ itemType: customLink.id });
      }
      return newAcc;
    }, []);

    try {
      await updateUserMenuItems(newMenuItems);
      setIsSidebarSettingsActive(false);
    } catch (error) {
      setError(error);
    }
  };

  const addNewLink = linkId => {
    setAdditionalLinksState(prevState => {
      const newState = { ...prevState };
      newState[linkId] = { ...newState[linkId], isSelected: !newState[linkId].isSelected };
      return newState;
    });
  };

  const selectedLinks = [];
  const notSelectedLinks = [];

  for (const linkKey in additionalLinksState) {
    const link = additionalLinksState[linkKey];

    const linkItem = (
      <Checkbox
        key={link.id}
        id={link.id}
        checked={!link.isSelected}
        name={`NavbarCheckbox${link.id}`}
        label={link.text}
        onChange={() => addNewLink(link.id)}
        position="right"
        variant="plus"
      />
    );

    if (link.isSelected) {
      selectedLinks.push(linkItem);
    } else {
      notSelectedLinks.push(linkItem);
    }
  }

  return (
    <Formik initialValues={{}} onSubmit={saveNewMenuItems}>
      {({ isSubmitting }) => (
        <FormikForm>
          <Row isSidebarSettingsActive>
            <MenuTitle>Текущее меню</MenuTitle>

            <MenuLinks items={links} isSidebarSettingsActive />

            <AdditionalMenuLinks items={selectedLinks.length} isSidebarSettingsActive>
              {selectedLinks}
            </AdditionalMenuLinks>

            {notSelectedLinks.length > 0 && (
              <AdditionalMenuTitle>Дополнительно</AdditionalMenuTitle>
            )}

            <AdditionalMenuLinks items={notSelectedLinks.length} isSidebarSettingsActive>
              {notSelectedLinks}
            </AdditionalMenuLinks>

            <Button
              isLoading={isSubmitting}
              label="Применить"
              type="submit"
              testId="save-menu-settings-button"
              $mt={32}
            />
          </Row>
        </FormikForm>
      )}
    </Formik>
  );
};

export default MenuSettings;
