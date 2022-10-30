import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mysql://root:123456@localhost:3306/pjadminjs', {
    dialect: 'mysql'
})

export default sequelize;