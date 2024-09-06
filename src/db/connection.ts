import { config } from 'dotenv';
import { Sequelize } from 'sequelize';

config();
// const sequelize = new Sequelize(
//   process.env.DB_DATABASE!,process.env.DB_USER!,process.env.DB_PASSWORD!, {
//   host:process.env.DB_HOST!,
//   dialect: 'mysql'
// })

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'mysql',
  logging: false,
});

async function testConection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConection();

export default sequelize;