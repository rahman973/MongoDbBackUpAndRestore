require("dotenv").config();

let env_variables = {
  DB_URL: process.env.DB_URL,
  PORT: process.env.PORT,
  DB_NAME: process.env.DB_NAME,
};

const checkEnvs = async () => {
  try {
    Object.keys(env_variables).forEach((variable) => {
      if (!env_variables[variable]) {
        throw Error(`env variable '${variable}' is missing`);
      }
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = checkEnvs;
