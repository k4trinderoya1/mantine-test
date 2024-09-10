import { useLocation } from 'react-router-dom';
import { Rating, Group, Stack } from '@mantine/core';
import styles from './Rating.module.css';

export function RatingPage() {
  const location = useLocation();

  
  const isRatingPage = location.pathname === '/rating';

  return (
    <div className={isRatingPage ? styles['rating-page'] : ''}>
      <Stack>
        <Group>
          <div>Fractions: 2</div>
          <Rating fractions={2} defaultValue={1.5} />
        </Group>
        <Group>
          <div>Fractions: 3</div>
          <Rating fractions={3} defaultValue={2.33333333} />
        </Group>
        <Group>
          <div>Fractions: 4</div>
          <Rating fractions={4} defaultValue={3.75} />
        </Group>
      </Stack>
    </div>
  );
}
