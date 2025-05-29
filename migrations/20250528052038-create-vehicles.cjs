"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "Vehicles",
        {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
          vehicle_type_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
              model: "Vehicle_Types",
              key: "id",
            },
            onDelete: "CASCADE",
          },
          model: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
          },
        },
        { transaction }
      );

      const [vehicleTypes] = await queryInterface.sequelize.query(
        `SELECT id, name FROM "Vehicle_Types";`,
        { transaction }
      );

      const getId = (typeName) =>
        vehicleTypes.find((v) => v.name === typeName)?.id;

      const now = new Date();
      await queryInterface.bulkInsert(
        "Vehicles",
        [
          // Hatchback
          {
            id: uuidv4(),
            vehicle_type_id: getId("Hatchback"),
            model: "Maruti Swift",
            createdAt: now,
            updatedAt: now,
          },
          {
            id: uuidv4(),
            vehicle_type_id: getId("Hatchback"),
            model: "Hyundai i20",
            createdAt: now,
            updatedAt: now,
          },

          // Sedan
          {
            id: uuidv4(),
            vehicle_type_id: getId("Sedan"),
            model: "Honda City",
            createdAt: now,
            updatedAt: now,
          },
          {
            id: uuidv4(),
            vehicle_type_id: getId("Sedan"),
            model: "Hyundai Verna",
            createdAt: now,
            updatedAt: now,
          },

          // SUV
          {
            id: uuidv4(),
            vehicle_type_id: getId("SUV"),
            model: "Tata Harrier",
            createdAt: now,
            updatedAt: now,
          },
          {
            id: uuidv4(),
            vehicle_type_id: getId("SUV"),
            model: "Mahindra XUV700",
            createdAt: now,
            updatedAt: now,
          },

          // Cruiser
          {
            id: uuidv4(),
            vehicle_type_id: getId("Cruiser"),
            model: "Royal Enfield Meteor",
            createdAt: now,
            updatedAt: now,
          },
          {
            id: uuidv4(),
            vehicle_type_id: getId("Cruiser"),
            model: "Bajaj Avenger",
            createdAt: now,
            updatedAt: now,
          },

          // Sports
          {
            id: uuidv4(),
            vehicle_type_id: getId("Sports"),
            model: "Yamaha",
            createdAt: now,
            updatedAt: now,
          },
          {
            id: uuidv4(),
            vehicle_type_id: getId("Sports"),
            model: "Other Sports Bike",
            createdAt: now,
            updatedAt: now,
          },
        ],
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable("Vehicles", { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
