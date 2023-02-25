import React, { useState } from 'react';

import {
  GroupHeader,
  Title,
  HeaderIcons,
  HeaderIcon,
  GroupList,
  Row,
  Col,
  DescriptionItem,
} from './styled';

const colLabels = ['', 'Свойства груза', 'Описание', 'Возможные надписи'];

const HazardClassesGroup = ({ group }) => {
  const { groupLabel, list } = group;
  const [isShownGroup, setIsShownGroup] = useState(false);

  return (
    <>
      <GroupHeader onClick={() => setIsShownGroup(show => !show)}>
        <Title isOpen={isShownGroup}>{groupLabel}</Title>
        <HeaderIcons>
          {list.map(({ id }) => {
            return (
              <HeaderIcon
                alt="hazard-class"
                src={`${process.env.ASSET_HOST}/images/hazard-classes/${id}.png`}
                key={id}
              />
            );
          })}
        </HeaderIcons>
      </GroupHeader>
      {isShownGroup && (
        <GroupList>
          <Row header>
            {colLabels.map((label, index) => (
              <Col key={index}>{label}</Col>
            ))}
          </Row>
          {list.map(({ label, id, description, inscription }) => {
            return (
              <Row key={id}>
                <Col imageCol>
                  <img
                    alt="hazard-class"
                    src={`${process.env.ASSET_HOST}/images/hazard-classes/${id}.png`}
                  />
                </Col>
                <Col labelCol>
                  {id} {label}
                </Col>
                <Col>
                  {description.map((text, i) => (
                    <DescriptionItem key={i}>{text}</DescriptionItem>
                  ))}
                </Col>
                <Col>
                  {inscription.map((text, i) => (
                    <div key={i}>{text}</div>
                  ))}
                </Col>
              </Row>
            );
          })}
        </GroupList>
      )}
    </>
  );
};
export default HazardClassesGroup;
