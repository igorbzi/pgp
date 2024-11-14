import React from "react";
import axios from "axios";
import ConstructionIcon from '@mui/icons-material/Construction';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SideBar from "./SideBar";
import { validarEFormatarCPF } from '../utils/mascara';

import {
	Alert,
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid2,
    Link,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";

const defaultTheme = createTheme();

export default function Login(props) {
	const [username, setUsername] = React.useState("");
	const [passwd, setPasswd] = React.useState("");
	const [openMessage, setOpenMessage] = React.useState(false);
	const [messageText, setMessageText] = React.useState("");
	const [messageSeverity, setMessageSeverity] = React.useState("success");

	async function enviaLogin(event) {
		event.preventDefault();
		try {
			const response = await axios.post("/login", {
				username: username,
				password: passwd,
			});
			console.log(response);
			if (response.status >= 200 && response.status < 300) {
				// Salva o token JWT na sessão
				localStorage.setItem("token", response.data.token);
				// seta o estado do login caso tudo deu certo
				props.onLogin();
			} else {
				// falha
				console.error("Falha na autenticação");
			}
		} catch (error) {
			console.log(error);
			setOpenMessage(true);
			setMessageText("Falha ao logar usuário!");
			setMessageSeverity("error");
		}
	}

	function handleCloseMessage(_, reason) {
		if (reason === "clickaway") {
			return;
		}
		setOpenMessage(false);
	}

	return (
    <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
              <SideBar />
                <Avatar sx={{ m: 1, bgcolor: 'black' }}>
                    <ConstructionIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Entrar
                </Typography>
                <Box component="form" sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="CPF"
                        label="CPF"
                        name="CPF"
                        autoComplete="CPF"
                        autoFocus
                        value={username}
                        onChange={(event) => {
                            setUsername(validarEFormatarCPF(event.target.value));
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="senha"
                        label="Senha"
                        type="password"
                        id="senha"
                        autoComplete="current-password"
                        value={passwd}
                        onChange={(event) => {
                            setPasswd(event.target.value);
                        }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={enviaLogin}
                    >
                        Entrar
                    </Button>

                    <Grid2 container>
                        <Grid2 item xs>
                            <Link href="/Cadastro" variant="body2">
                                Não tem cadastro?
                            </Link>
                        </Grid2>
                        <Grid2 item>
                        </Grid2>
                    </Grid2>
				<Snackbar
					open={openMessage}
					autoHideDuration={6000}
					onClose={handleCloseMessage}
				>
					<Alert
						severity={messageSeverity}
						onClose={handleCloseMessage}
					>
						{messageText}
					</Alert>
				</Snackbar>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            );
}
