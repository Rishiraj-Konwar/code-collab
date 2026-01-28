"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CodeSnaps", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      hostId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      roomId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Rooms",
          key: "roomId",
        },
        onDelete: "CASCADE",
      },
      code: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      language: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Messages");
  },
};
