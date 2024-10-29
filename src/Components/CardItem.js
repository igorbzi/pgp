import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

function CardItem(props){

  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 250,
        backgroundColor: grey[400]
      }}
    >
      <CardContent

      >
        <Typography variant="h5" component="div" sx={{
          color: '#fffff',
        }}>
          {props.title}
        </Typography>
        <Typography>
          {props.type}
        </Typography>
        <Typography variant="body2" sx={{
          color: grey[800]
        }}>
          {props.description}
        </Typography>
        <Typography variant="body">
          Preço: R$ {props.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" >Editar</Button>
        <Button size="small" color="error">Excluir</Button>
      </CardActions>
    </Card>
  );
};

export default CardItem;