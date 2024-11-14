import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

function CardItem(props){

  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 250,
        backgroundColor: grey[400],
        height: 250,
        width: 250,
        display: "flex",
        flexDirection: "column"
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
      <CardActions disableSpacing sx={{ mt: "auto" }}>
        <Button size="small" onClick={props.edit}>Editar</Button>
        <Button size="small" onClick={props.delete} color="error">Excluir</Button>
      </CardActions>
    </Card>
  );
};

export default CardItem;