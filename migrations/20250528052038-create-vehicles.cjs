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

      const twoWheelerType = vehicleTypes.find((v) => v.name === "Two Wheelers");
      const fourWheelerType = vehicleTypes.find((v) => v.name === "Four Wheelers");

      if (!twoWheelerType || !fourWheelerType) {
        throw new Error("Vehicle type IDs not found");
      }

      // Insertion
      const now = new Date();
      await queryInterface.bulkInsert(
        "Vehicles",
        [
          // Two Wheelers
          {
            id: uuidv4(),
            vehicle_type_id: twoWheelerType.id,
            model: "Honda Activa",
            createdAt: now,
            updatedAt: now,
          },
          {
            id: uuidv4(),
            vehicle_type_id: twoWheelerType.id,
            model: "Yamaha R15",
            createdAt: now,
            updatedAt: now,
          },
          {
            id: uuidv4(),
            vehicle_type_id: twoWheelerType.id,
            model: "TVS Apache",
            createdAt: now,
            updatedAt: now,
          },
          {
            id: uuidv4(),
            vehicle_type_id: twoWheelerType.id,
            model: "Royal Enfield Classic",
            createdAt: now,
            updatedAt: now,
          },
          {
            id: uuidv4(),
            vehicle_type_id: twoWheelerType.id,
            model: "Bajaj Pulsar",
            createdAt: now,
            updatedAt: now,
          },

          // Four Wheelers
          {
            id: uuidv4(),
            vehicle_type_id: fourWheelerType.id,
            model: "Hyundai Creta",
            createdAt: now,
            updatedAt: now,
          },
          {
            id: uuidv4(),
            vehicle_type_id: fourWheelerType.id,
            model: "Mahindra Thar",
            createdAt: now,
            updatedAt: now,
          },
          {
            id: uuidv4(),
            vehicle_type_id: fourWheelerType.id,
            model: "Toyota Fortuner",
            createdAt: now,
            updatedAt: now,
          },
          {
            id: uuidv4(),
            vehicle_type_id: fourWheelerType.id,
            model: "Tata Nexon",
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
