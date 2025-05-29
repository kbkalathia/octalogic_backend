"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "Vehicle_Types",
        {
          id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
          },
          wheels: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          name: {
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

      // Seed values
      const now = new Date();
      await queryInterface.bulkInsert(
        "Vehicle_Types",
        [
          {
            id: uuidv4(),
            wheels: 4,
            name: "Hatchback",
            createdAt: now,
            updatedAt: now,
          },
          {
            id: uuidv4(),
            wheels: 4,
            name: "Sedan",
            createdAt: now,
            updatedAt: now,
          },
          {
            id: uuidv4(),
            wheels: 4,
            name: "SUV",
            createdAt: now,
            updatedAt: now,
          },
          {
            id: uuidv4(),
            wheels: 2,
            name: "Cruiser",
            createdAt: now,
            updatedAt: now,
          },
          {
            id: uuidv4(),
            wheels: 2,
            name: "Sports",
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
      await queryInterface.dropTable("Vehicle_Types", { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
