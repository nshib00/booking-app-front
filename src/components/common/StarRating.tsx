import { Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

type Props = {
  value: number;
};

const StarRating = ({ value }: Props) => {
  const stars = [];

  for (let i = 1; i <= 5; i++)
    {
        if (value >= i) {
            stars.push(<StarIcon key={i} color="primary" fontSize="small" />);
        }
        else {
            stars.push(<StarBorderIcon key={i} color="primary" fontSize="small" />);
        }
    }

  return <Box display="flex">{stars}</Box>;
};

export default StarRating;