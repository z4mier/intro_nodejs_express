import { Sequelize, DataTypes, Model, ModelAttributes, ModelOptions } from 'sequelize';

interface UserAttributes {
    id?: number;
    email: string;
    passwordHash: string;
    title: string;
    firstName: string;
    lastName: string;
    role: string;
}

const attributes: ModelAttributes<Model<UserAttributes>, UserAttributes> = {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false }
};

const options: ModelOptions<Model<UserAttributes>> = {
    defaultScope: {
        attributes: { exclude: ['passwordHash'] }
    },
    scopes: {
        withHash: { attributes: { include: ['passwordHash'] } }
    }
};

export default function initUserModel(sequelize: Sequelize) {
    return sequelize.define<Model<UserAttributes>>('User', attributes, options);
}
