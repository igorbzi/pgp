const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");

const pgp = require("pg-promise")({});
const usuario = "postgres";
const senha = "postgres";
const db = pgp(`postgres://${usuario}:${senha}@localhost:5432/pgp`);

app.use(cors());

app.use(express.json());

app.listen(3001, (error) => {
  if (error) throw error;
  console.log("Servidor Rodando na porta 3001 ");
});

app.get("/", (req, res) => {
  res.send("Bem-vindo no nosso App");
});

app.use(
	session({
		secret: 'time_limit_exceeded',
		resave: false,
		saveUninitialized: false,
		cookie: { secure: true },
	}),
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password",
		},
		async (username, password, done) => {
			try {
				// busca o usuário no banco de dados
				const user = await db.oneOrNone(
					"SELECT * FROM users WHERE CPFF = $1;",
					[username],
				);

				// se não encontrou, retorna erro
				if (!user) {
					return done(null, false, { message: "Usuário incorreto." });
				}

				// verifica se o hash da senha bate com a senha informada
				const passwordMatch = await bcrypt.compare(
					password,
					user.senha
				);

				// se senha está ok, retorna o objeto usuário
				if (passwordMatch) {
					console.log("Usuário autenticado!");
					return done(null, user);
				} else {
					// senão, retorna um erro
					return done(null, false, { message: "Senha incorreta." });
				}
			} catch (error) {
				return done(error);
			}
		},
	),
);

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: "time_limit_exceeded",
		},
		async (payload, done) => {
			try {
				const user = await db.oneOrNone(
					"SELECT * FROM users WHERE CPF = $1;",
					[payload.username],
				);

				if (user) {
					done(null, user);
				} else {
					done(null, false);
				}
			} catch (error) {
				done(error, false);
			}
		},
	),
);

passport.serializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, {
			CPFF: user.cpff,
			nome: user.nome,
		});
	});
});

passport.deserializeUser(function (user, cb) {
	process.nextTick(function () {
		return cb(null, user);
	});
});

const requireJWTAuth = passport.authenticate("jwt", { session: false });

app.post(
	"/login",
	passport.authenticate("local", { session: false }),
	(req, res) => {

		// Cria o token JWT
		const token = jwt.sign({ username: req.body.username }, "time_limit_exceeded", {
			expiresIn: "1h",
		});

		res.json({ message: "Login successful", token: token });
	},
);

app.post("/logout", function (req, res, next) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
});

/*-----------------users---------------------*/
app.get("/users", async (req, res) => {
  try {
    const user = await db.any(
      "select cpf, username, user_email, user_phone, user_phone2, user_address from users"
    );
    res.json(user).status(200);
    console.log(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

app.post("/users", async (req, res) => {
  try {
    const saltRounds = 10;
    const cpf = req.body.cpf;
    const nome = req.body.nome;
    const passwd = req.body.passwd;
    const hash = bcrypt.hashSync(passwd, saltRounds);
    const email = req.body.email;
    const phone = req.body.phone;
    const phone2 = req.body.phone2;
    const address = req.body.address;
    const type = req.body.type;
    //0 para clientes, 1 para prestador

    const unique_cpf = await db.oneOrNone(
      "SELECT 1 from users where cpf = $1",
      [cpf]
    );

    const unique_email = await db.oneOrNone(
      "SELECT 1 from users where user_email = $1",
      [email]
    );

    const unique_phone = await db.oneOrNone(
      "SELECT 1 from users where user_phone = $1",
      [phone]
    );

    if (unique_cpf) {
      res.status(400).send("CPF já cadastrado!");
      return;
    } else if (unique_email) {
      res.status(400).send("E-mail já cadastrado!");
      return;
    } else if (unique_phone) {
      res.status(400).send("Telefone principal já cadastrado!");
      return;
    }

    db.none(
      "INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7, $8);", //passando parâmetros
      [cpf, nome, hash, email, phone, phone2, address, type]
    )
      .then(() => {
        res.status(200).send("Cadastro realizado com sucesso!");
      })
      .catch((error) => {
        console.log(`cpf: ${cpf} ${email} ${phone} ${address} ${passwd} ${type}`)
        res.status(400).send("Preencha todos os campos!");
        return;
      });
  } catch (error) {
    console.log(error);
    res.status(400).send("Preencha todos os campos obrigatórios!");
  }
});

app.delete("/users", async (req, res) => {
  try {
    const id = req.body.cpf; //pega parametro da req

    const exist = await db.oneOrNone("select 1 from users where cpf = $1", [
      id,
    ]);

    if (!exist) {
      res.status(400).send("Usuário não cadastrado!");
      return;
    }

    db.none(
      "DELETE from users where cpf = $1",
      [id] //deleta pelo cpf
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

/*-----------------Services---------------------*/

app.get("/services", async (req, res) => {
  try {
    const services = await db.any("select * from services");
    res.json(services).status(200);
    console.log(services);

  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/services_id", async (req, res) => {
  const id = req.query['id'];

  try {
    const service = await db.any("select * from services where cod_service=$1", [id]);
    res.json(service).status(200);
    console.log(service);

  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/my_services", async (req, res) => {
  const cpf = req.query['cpf']
  console.log(req.query)

  try {
    const services = await db.any("select sr.cod_service, sr.service_name, sr.service_price, st.type_name, sr.material_disp, sr.service_description from services sr join service_type st on st.cod_type_service = sr.service_type join service_user su on su.cod_service = sr.cod_service join users u on u.cpf = su.cod_user where u.cpf = $1", [cpf]);
    res.json(services).status(200);
    console.log(services);

  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.post("/services", async (req, res) => {

  const cpf = req.query['cpf']

  try {
    const service_name = req.body.service_name;
    const service_description = req.body.service_description;
    const service_price = req.body.service_price;
    const service_type = req.body.service_type;
    const material_disp = req.body.material_disp;

    console.log(service_type);

    db.tx(async t => {
      const srv = await t
        .one(
          "INSERT INTO services (service_name, service_price, service_type, service_description, material_disp) VALUES ($1, $2, $3, $4, $5) RETURNING cod_service;", //passando parâmetros
          [service_name, service_price, service_type, service_description, material_disp]
        )
      await t.none("INSERT INTO service_user(cod_user, cod_service) VALUES ($1, $2);", [cpf, srv.cod_service])
      })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        res.status(400).send("Preencha todos os campos corretamente!");
        console.log(error);
        return;
      });

  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

app.delete("/services", async (req, res) => {
  try {
    const id = req.query['id'];
    const cpf = req.query['cpf']
    console.log(id);

    const exist = await db.oneOrNone(
      "select 1 from services where cod_service = $1",
      [id]
    );

    if (!exist) {
      res.status(400).send("Serviço não cadastrado!");
      return;
    }

    db.tx(async t => {
      const srv = await t
        .none(
          "DELETE from service_user where cod_service = $1 and cod_user = $2;", [id, cpf]
        )
      await t.none("DELETE from services where cod_service = $1;", [id] )
      })
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        res.status(400).send("Preencha todos os campos corretamente!");
        console.log(error);
        return;
      });
  } catch (error) {
    console.log(error);
    res.status(400).send("Erro ao remover serviço!");
  }
});


app.put("/services", async (req, res) => {
  try {
    const id = req.query['id']
    const service_name = req.body.service_name;
    const service_description = req.body.service_description;
    const service_price = req.body.service_price;
    const service_type = req.body.service_type;
    const material_disp = req.body.material_disp;


    const exist = await db.oneOrNone(
      "select 1 from services where cod_service = $1",
      [id]
    );
    if(!exist){
      res.status(400).send("Serviço não encontrado");
      return;
    }

    await db
      .none(
        "UPDATE services SET service_name = $1, service_price = $2, service_type = $3, service_description = $4, material_disp = $5 WHERE cod_service = $6;", 
        [service_name, service_price, service_type, service_description, material_disp,id]
      )
      .then(() => {
        res.sendStatus(200);
      })
      .catch((error) => {
        res.status(400).send('Erro ao atualizar serviço!');
        console.log(error);
        return;
      });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
}
);


app.get('/categories', async (req, res) => {

  try{
    const categories = await db.any(
      'select * from service_type;'
    )
    console.log(categories);
    res.json(categories).status(200)
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
  
})