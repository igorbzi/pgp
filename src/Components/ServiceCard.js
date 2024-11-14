import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

export default function ServiceCard(props) {
  return (
    <Card sx={{ minWidth: 300, maxWidth: 345 }}>
      <CardActionArea>
        <Typography sx={{margin : "1rem" , fontSize:"1.5rem" , fontWeight:"bold"}} gutterBottom variant="h5" component="div">
          {props.titulo}
        </Typography>
        <CardMedia  sx={{objectFit : "contain"}}
          component="img"
          width="100px"
          height="100px"

          image={props.image}
          alt="imagem serviço"
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {props.description}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontWeight: " bold",
              fontSize: " 1.5rem",
            }}
          >
            R$ {props.price}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontWeight: " bold",
              fontSize: " 1.5rem",
            }}
          >
            tipo : {props.tipo}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          sx={{ margin: "auto", width: "auto" }}
        >
          Contratar Serviço
        </Button>
      </CardActions>
    </Card>
  );
}
