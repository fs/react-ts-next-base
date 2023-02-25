import React from 'react';

import { ProblemsWrapper, ProblemsImageWrapper, ProblemsImage } from './styled';

const Problems = () => {
  const problems = [
    'Найти нужный товар, производителя, поставщика',
    'Долгий процесс закупки и продаж',
    'Некомпетентный в закупках персонал',
    'Непрозрачность и коррумпированность процесса закупок',
    'Наличие большого количества посредников',
    'Непунктуальная и затратная логистика',
    'Высокие риски потерь товара и денег',
  ];

  return (
    <ProblemsWrapper>
      <ul>
        {problems.map((problem, i) => (
          <li type="disc" key={i}>
            {problem}
          </li>
        ))}
      </ul>
      <ProblemsImageWrapper>
        <ProblemsImage src={`${process.env.ASSET_HOST}/images/problems-medicine.png`} />
      </ProblemsImageWrapper>
    </ProblemsWrapper>
  );
};

export default Problems;
